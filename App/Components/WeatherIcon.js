import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import styles from './Styles/WeatherIconStyle'

export default class WeatherIcon extends Component {
  // Prop type warnings
  static propTypes = {
    condition: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.object,
  }
  
  // Defaults for props
  static defaultProps = {
    color: 'black'
  }

  mapCondition = (condition) => {
    console.log(`WeatherIcon: mapping condition=${condition}`);
    switch (condition) {
      case 'Clear':
        return 'weather-sunny';
      case 'Clouds':
        return 'weather-cloudy';
      case 'Rain':
        return 'weather-rainy';
      default:
        return 'weather-sunny';
    }
  };

  render () {
    const { size, color } = this.props;
    console.log(`size=${size}, color=${color}`);
    const name = this.mapCondition(this.props.condition);
    console.log(`name=${name}`);
    return (
      <Icon name={name} size={size} color={color} />
    )
  }
}
