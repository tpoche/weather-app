import { StackNavigator } from 'react-navigation'
import ForecastScreen from '../Containers/ForecastScreen'
import HomeScreen from '../Containers/HomeScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ForecastScreen: { 
    screen: ForecastScreen,
    navigationOptions: () => ({
      title: '5 Day Forecast',
      headerBackTitle: 'Back'
    }),
   },
  HomeScreen: { 
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Weather App'
    }),
  },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerBackTitleStyle: styles.headerTitle,
    headerTintColor: 'white'
  }
})

export default PrimaryNav
