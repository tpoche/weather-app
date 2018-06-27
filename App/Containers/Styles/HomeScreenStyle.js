import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  groupContainer: ApplicationStyles.groupContainer,
  title: {
    ...Fonts.style.normal,
    paddingVertical: Metrics.baseMargin,
    color: Colors.coal,
    marginVertical: Metrics.smallMargin,
    textAlign: 'center'
  },
  sectionTitle: {
    ...Fonts.style.headline,
    color: Colors.coal,
    alignItems: 'center',
    textAlign: 'center'
  }
})
