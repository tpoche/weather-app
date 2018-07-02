import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  groupContainer: ApplicationStyles.groupContainer,
  title: {
    ...Fonts.style.normal,
    // paddingVertical: Metrics.baseMargin,
    color: Colors.coal,
    marginVertical: Metrics.smallMargin,
    textAlign: 'center',
    textAlignVertical: 'center',
    // height: 40
  },
  sectionTitle: {
    ...Fonts.style.headline,
    color: Colors.coal,
    alignItems: 'center',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 44
  },
  textField: {
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: Colors.charcoal, 
    borderRadius: 5, 
    width: 70,
    height: 40,
    textAlign: 'center',
    //paddingHorizontal: 10,
    marginHorizontal: 10,
  }
})
