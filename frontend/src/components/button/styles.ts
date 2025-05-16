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

    view: {
    height:40,
    marginTop: -70,
    marginBottom: 20
  }
});