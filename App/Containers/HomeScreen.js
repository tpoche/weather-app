import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Button } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OpenWeatherActions from '../Redux/OpenWeatherRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  componentDidMount () {
    // retrieve current weather conditions
    this.props.currentWeather('70506')
  }

  render () {
    const { high, low, current } = this.props;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.groupContainer} behavior='position'>
          <Text style={styles.title}>The current weather for Lafayette, LA</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>{`High: ${high}`}</Text>
            <Text>{`Low: ${low}`}</Text>
          </View>
          <Icon name='weather-sunny' size={250} color='black' />          
          <Text style={styles.sectionTitle}>{`${current} ºF`}</Text>
          <View style={{paddingTop: 50}}>
            <Button title="Forecast" onPress={this.onPressForecast} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  onPressForecast () {
    console.log('User tapped the Forecast button!');
  }
}

const mapStateToProps = (state) => {
  console.log(`mapStateToProps with state=${JSON.stringify(state)}`)
  return {
    high: state.openWeather.high,
    low: state.openWeather.low,
    current: state.openWeather.current
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
