import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  currentWeatherRequest: ['zipcode'],
  currentWeatherSuccess: ['high', 'low', 'current'],
  currentWeatherFailure: null
})

export const OpenWeatherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  high: null,
  low: null,
  current: null,
  fetching: null,
  error: null,
  zipcode: null,
})

/* ------------- Selectors ------------- */

export const OpenWeatherSelectors = {
  selectHigh: state => state.openWeather.high,
  selectLow: state => state.openWeather.low,
  selectCurrent: state => state.openWeather.current,
  selectZipcode: state => state.openWeather.zipcode
}

/* ------------- Reducers ------------- */

// request current weather for a given zip code
export const requestCurrentWeather = (state, { zipcode }) =>
  state.merge({ fetching: true, zipcode, high: null, low: null, current: null })

// successful weather lookup
export const successCurrentWeather = (state, action) => {
  const { high, low, current } = action
  return state.merge({ fetching: false, error: null, high, low, current })
}

// failed to get the current weather
export const failureCurrentWeather = (state) =>
  state.merge({ fetching: false, error: true, high: null, low: null, current: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CURRENT_WEATHER_REQUEST]: requestCurrentWeather,
  [Types.CURRENT_WEATHER_SUCCESS]: successCurrentWeather,
  [Types.CURRENT_WEATHER_FAILURE]: failureCurrentWeather
})
