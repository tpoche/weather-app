import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Button } from 'react-native'
import { connect } from 'react-redux'
import WeatherIcon from '../Components/WeatherIcon'
import OpenWeatherActions from '../Redux/OpenWeatherRedux'

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  componentDidMount () {
    // retrieve current weather conditions
    this.props.currentWeather('70506')
  }

  render () {
    const { high, low, current, condition } = this.props;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.groupContainer} behavior='position'>
          <Text style={styles.title}>The current weather for Lafayette, LA</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>{`High: ${high}º`}</Text>
            <Text>{`Low: ${low}º`}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <WeatherIcon condition={condition} size={250} />
          </View>          
          <Text style={styles.sectionTitle}>{`${current}ºF`}</Text>
          <View style={{paddingTop: 30}}>
            <Button title="Forecast" onPress={this.onPressForecast.bind(this)} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  onPressForecast () {
    console.log('User tapped the Forecast button!');
    this.props.navigation.navigate('ForecastScreen')
  }
}

const mapStateToProps = (state) => {
  // console.log(`mapStateToProps with state=${JSON.stringify(state)}`)
  return {
    high: state.openWeather.high,
    low: state.openWeather.low,
    current: state.openWeather.current,
    condition: state.openWeather.condition
  }  
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentWeather: (zip) => {
      console.log('Dispatching currentWeatherRequest...');
      dispatch(OpenWeatherActions.currentWeatherRequest(zip));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
