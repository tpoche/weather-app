import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import OpenWeatherActions from '../Redux/OpenWeatherRedux'
import convertFromKelvin from '../Transforms/ConvertFromKelvin'

export function * getCurrentWeather (api, action) {
  const { zipcode } = action
  // make the call to the api
  const response = yield call(api.getCurrentWeather, zipcode)
  console.log(`Received weather response: ${JSON.stringify(response)}`)
  if (response.ok) {
    const currentTemp = convertFromKelvin(path(['data', 'main', 'temp'], response))
    const highTemp = convertFromKelvin(path(['data', 'main', 'temp_max'], response))
    const lowTemp = convertFromKelvin(path(['data', 'main', 'temp_min'], response))
    console.log(`Parsed current=${currentTemp}, high=${highTemp}, low=${lowTemp}`)
    // do data conversion here if needed
    yield put(OpenWeatherActions.currentWeatherSuccess(currentTemp, highTemp, lowTemp))
  } else {
    yield put(OpenWeatherActions.currentWeatherFailure())
  }
}
