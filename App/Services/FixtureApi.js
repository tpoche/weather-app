export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  getCurrentWeather: (zip) => {
    console.log(`FixtureAPI.getCurrentWeather: zip=${zip}`);
    const weatherData = require('../Fixtures/currentWeather.json')
    console.log(`Creating JSON payload from: ${JSON.stringify(weatherData)}`)
    return {
      ok: true,
      data: weatherData
    }
  }
}
