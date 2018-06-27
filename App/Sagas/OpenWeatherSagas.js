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
    const weatherArray = path(['data', 'weather'], response)
    const condition = weatherArray[0].main
    console.log(`Parsed current=${currentTemp}, high=${highTemp}, low=${lowTemp}, condition=${condition}`)
    // do data conversion here if needed
    yield put(OpenWeatherActions.currentWeatherSuccess(highTemp, lowTemp, currentTemp, condition))
  } else {
    yield put(OpenWeatherActions.currentWeatherFailure())
  }
}

export function * getForecast (api, action) {
  const { zipcode } = action
  const response = yield call(api.getForecast, zipcode)
  console.log(`Received forecast response: ${JSON.stringify(response)}`)
  if (response.ok) {
    // const cnt = path(['data', 'cnt'], response)
    const list = path(['data', 'list'], response)
    yield put(OpenWeatherActions.forecastSuccess(list))
  } else {
    yield put(OpenWeatherActions.forecastFailure())
  }
}