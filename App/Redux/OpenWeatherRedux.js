import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  currentWeatherRequest: ['zipcode'],
  currentWeatherSuccess: ['high', 'low', 'current', 'condition'],
  currentWeatherFailure: null,
  forecastRequest: ['zipcode'],
  forecastSuccess: ['forecastList'],
  forecastFailure: null
})

export const OpenWeatherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  high: null,
  low: null,
  current: null,
  condition: null,
  fetching: null,
  error: null,
  zipcode: null,
  forecastList: null
})

/* ------------- Selectors ------------- */

export const OpenWeatherSelectors = {
  selectHigh: state => state.openWeather.high,
  selectLow: state => state.openWeather.low,
  selectCurrent: state => state.openWeather.current,
  selectCondition: state => state.openWeather.condition,
  selectZipcode: state => state.openWeather.zipcode,
  selectDayCount: state => state.openWeather.dayCount,
  selectForecastList: state => state.openWeather.forecastList
}

/* ------------- Reducers ------------- */

// request current weather for a given zip code
export const requestCurrentWeather = (state, { zipcode }) =>
  state.merge({ fetching: true, zipcode, high: null, low: null, current: null, condition: null })

// successful weather lookup
export const successCurrentWeather = (state, action) => {
  const { high, low, current, condition } = action
  return state.merge({ fetching: false, error: null, high, low, current, condition })
}

// failed to get the current weather
export const failureCurrentWeather = (state) =>
  state.merge({ fetching: false, error: true, high: null, low: null, current: null, condition: null })

export const requestForecast = (state, { zipcode }) =>
  state.merge({ fetching: true, zipcode, forecastList: null })

export const successForecast = (state, action) => {
  const { forecastList } = action
  return state.merge({ fetching: false, error: null, forecastList })
}

export const failureForecast = (state) => 
  state.merge({ fetching: false, error: true, forecastList: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CURRENT_WEATHER_REQUEST]: requestCurrentWeather,
  [Types.CURRENT_WEATHER_SUCCESS]: successCurrentWeather,
  [Types.CURRENT_WEATHER_FAILURE]: failureCurrentWeather,
  [Types.FORECAST_REQUEST]: requestForecast,
  [Types.FORECAST_SUCCESS]: successForecast,
  [Types.FORECAST_FAILURE]: failureForecast
})
