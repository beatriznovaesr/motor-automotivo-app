import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    button: {
    backgroundColor: '#6c9bd9',
    borderRadius: 28,
    paddingVertical: 6,
    paddingHorizontal: 74,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    shadowColor: '#053e57',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
    elevation: 5,
    marginTop: 80
  },

  buttonText: {
    color: '#000000',
    fontFamily: 'RobotoSerif_700Bold',
    fontSize: 17,
    textShadowColor: '#6c9bd9',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },

    //caso seja textButton
    textButton: {
    backgroundColor: 'transparent', 
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    

  },

    view: {
    height:40,
    marginTop: -70,
    marginBottom: 20
  },

  textButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-serif',
    fontStyle: 'normal',
    fontSize: 19,
    textShadowColor: '#6c9bd9',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textDecorationLine: 'underline',
  },

  //caso seja logoffButton

  logoffButtonText: {
    color: '#FFC251',
    fontFamily: 'Roboto-serif',
    fontSize: 19,
    textShadowColor: '#6c9bd9',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textDecorationLine: 'underline', 
  },

  textButtonView: {
    height:40,
    marginBottom: 20,
    marginTop: -15
  }

});