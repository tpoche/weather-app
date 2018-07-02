import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import OpenWeatherActions, { OpenWeatherSelectors } from '../Redux/OpenWeatherRedux'
import { is } from 'ramda'

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar
export const selectCurrentCondition = OpenWeatherSelectors.selectCondition

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar
      }
    })
  }
  const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }

  console.log('Checking for current weather conditions in store...')
  const currentCondition = yield select(selectCurrentCondition)
  // retrieve current weather conditions
  if (!is(String, currentCondition)) {
    console.log('Retrieving latest conditions from API')
    yield put(OpenWeatherActions.currentWeatherRequest('70506'))
  } else {
    console.log(`Using cached weather condition=${currentCondition}`)
  }
}
