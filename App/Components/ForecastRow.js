import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { path } from 'ramda'
import moment from 'moment'
import WeatherIcon from '../Components/WeatherIcon'
import convertFromKelvin from '../Transforms/ConvertFromKelvin'

import styles from './Styles/ForecastRowStyle'
import { Colors } from '../Themes';

export default class ForecastRow extends Component {
  // Prop type warnings
  static propTypes = {
    detail: PropTypes.object,
  }

  render () {
    const item = this.props.detail;
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
    const description = item.weather[0].main;
    const highTemp = convertFromKelvin(path(['main', 'temp_max'], item));
    const lowTemp = convertFromKelvin(path(['main', 'temp_min'], item));

    return (
      <View style={[styles.container, {flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16}]}> 
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '60%'}}>
          <Text style={styles.cellTitle}>{dateTimeString}</Text>
          <Text style={styles.cellSubtitle}>{description}</Text>
        </View>
        <WeatherIcon style={{width: '20%'}} condition={description} size={50} />
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.cellTitle}>{`${highTemp} º`}</Text>
          <Text style={styles.cellSubtitle}>{`${lowTemp} º`}</Text>
        </View>
      </View>
    );
  }
}
