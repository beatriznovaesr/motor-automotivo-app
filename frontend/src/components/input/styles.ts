import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  boxInput: {
    width: '80%',
    height:40,
    borderWidth: 1,
    borderRadius:40,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },

  input: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
    backgroundColor: "#FFFFFF"
  },

  titleInput:{
    marginLeft: '-70%',
    fontFamily: 'RobotoSerif_400Regular',
    color: '#FFFFFF'
  },

  fragment: {    
    width: '30%', 
    alignItems: 'flex-start'
  },

  icon:{
    marginLeft: -20
  },
  
  mainScreenTitleInput: {
    fontFamily: 'Roboto-serif',
    textShadowColor: '#000000',
    textShadowOffset: {width: 2, height: 2},
    fontSize: 40,
    color: '#FFFFFF'
  },

  mainScreenFragment: {
    width: '80%',
    alignItems: 'center'
  }

}) 