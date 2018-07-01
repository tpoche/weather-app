import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import ForecastRow from '../Components/ForecastRow'
import OpenWeatherActions from '../Redux/OpenWeatherRedux'

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
          <FlatList style={{paddingBottom: 10}}
            data={ (list && list.length > 0) ? list : []}
            renderItem={({item}) => <ForecastRow detail={item} />}
            ItemSeparatorComponent={this.renderSeperator}
            keyExtractor={(item, index) => index.toString()}
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
