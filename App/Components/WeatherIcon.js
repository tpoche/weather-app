import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../Themes/Colors'

export default class WeatherIcon extends Component {
  // Prop type warnings
  static propTypes = {
    condition: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.iconColor = 'black';
  }

  mapCondition = (condition) => {
    switch (condition) {
      case 'Clear':
        this.iconColor = 'orange';
        return 'ios-sunny';
      case 'Clouds':
        this.iconColor = Colors.cloud;
        return 'ios-cloudy';
      case 'Rain':
        this.iconColor = Colors.babyblue;
        return 'ios-rainy';
      default:
        return 'ios-sunny';
    }
  };

  render () {
    const { size, condition } = this.props;
    const name = this.mapCondition(condition);
    return (
      <Icon name={name} size={size} color={this.iconColor} />
    )
  }
}
