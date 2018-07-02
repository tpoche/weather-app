import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import WeatherIcon from '../Components/WeatherIcon'
import OpenWeatherActions from '../Redux/OpenWeatherRedux'

// Styles
import Colors from '../Themes/Colors'
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = { zipText: props.zip }
  }

  componentDidMount () {
    console.log('HomeScreen.componentDidMount')  
  }

  render () {
    const { high, low, current, condition, zip } = this.props;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.groupContainer} behavior='position'>          
          <View style={styles.inputContainer}>
            <Text style={styles.title}>{'Zip Code:'}</Text>
            <TextInput style={styles.textField}
              underlineColorAndroid={Colors.transparent}
              keyboardType='numeric'
              placeholder='Zip Code'
              defaultValue={zip}
              value={this.state.zipText}
              onChangeText={(text) => this.setState({zipText: text})} />
            <View>
              <Button style={{height: 30}} title='Change' onPress={this.onPressChangeZip.bind(this)} />
            </View>
          </View>
          <View style={{paddingTop: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
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
    console.log('User tapped the Forecast button!')
    this.props.navigation.navigate('ForecastScreen')
  }

  onPressChangeZip () {
    console.log('User tapped the Change button!')
    if (this.state.zipText != this.props.zip) {
      console.log(`Retrieving current weather for ${this.state.zipText}`)
      this.props.currentWeather(this.state.zipText)
    }
  }
}

const mapStateToProps = (state) => {
  // console.log(`mapStateToProps with state=${JSON.stringify(state)}`)
  return {
    high: state.openWeather.high,
    low: state.openWeather.low,
    current: state.openWeather.current,
    condition: state.openWeather.condition,
    zip: state.openWeather.zipcode,
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
