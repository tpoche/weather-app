import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button, FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import { path } from 'ramda'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import WeatherIcon from '../Components/WeatherIcon'
import OpenWeatherActions from '../Redux/OpenWeatherRedux'
import convertFromKelvin from '../Transforms/ConvertFromKelvin'

// Styles
import styles from './Styles/ForecastScreenStyle'

class ForecastScreen extends Component {

  componentDidMount () {
    // retrieve weather forecast for next 5 days
    this.props.getForecast('70506');
  }

  onBackPress () {
    this.props.navigation.goBack();
  }

  renderItem = ({ item }) => {
    console.log(`renderItem: item=${JSON.stringify(item)}`)
    const date = moment(new Date(item.dt * 1000));
    const today = moment(Date.now()).startOf('day');
    var dateString = "";
    if (date.diff(today, 'days') === 0) {
      dateString = "Today";     
    } else {
      dateString = date.format('dddd, MMMM D');
    }
    const timeString = date.format('h A');
    const dateTimeString = `${dateString} @ ${timeString}`;
    // const dateString = date.toLocaleDateString();
    // const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    // const dateTimeString = moment(date).format('dddd, MMMM D') //`${dateString} ${timeString}`;
    console.log(`dateTimeString=${dateTimeString}`);
    const description = item.weather[0].main;
    console.log(`description=${description}`);
    const highTemp = convertFromKelvin(path(['main', 'temp_max'], item));
    console.log(`highTemp=${highTemp}`);
    const lowTemp = convertFromKelvin(path(['main', 'temp_min'], item));
    console.log(`lowTemp=${lowTemp}`);

    return (
      <View style={[styles.container, {flexDirection: 'row', paddingLeft: 10, paddingRight: 10}]}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '60%'}}>
          <Text style={styles.cellTitle}>{dateTimeString}</Text>
          <Text style={styles.cellSubtitle}>{description}</Text>
        </View>
        <WeatherIcon style={{width: '20%'}} condition={description} size={50} color='black' />
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '20%'}}>
          <Text style={styles.cellTitle}>{`${highTemp} º`}</Text>
          <Text style={styles.cellSubtitle}>{`${lowTemp} º`}</Text>
        </View>
      </View>
    );
  };

  renderSeperator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: 'darkgray'}} />
    );
  };

  render () {
    const list = this.props.forecastList;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.groupContainer} behavior='position'>
          <FlatList 
            data={ (list && list.length > 0) ? list : []}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeperator}
            keyExtractor={(item, index) => index}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    forecastList: state.openWeather.forecastList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getForecast: (zip) => {
      console.log(`Dispatching getForecast with zip=${zip}`);
      dispatch(OpenWeatherActions.forecastRequest(zip));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForecastScreen)
