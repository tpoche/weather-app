import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    ...Fonts.style.normal,
    color: Colors.coal,
    marginVertical: Metrics.smallMargin,
    textAlign: 'center'
  },
  cellTitle: {
    ...Fonts.style.description,
    color: Colors.coal,
    // marginVertical: Metrics.smallMargin,
  },
  cellSubtitle: {
    ...Fonts.style.description,
    color: Colors.charcoal,
    // marginVertical: Metrics.smallMargin,
  }
})
