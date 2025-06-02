import React from "react";
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { PageTitle } from "../src/components/pageTitle";

export default function desenhoIndividual(){
    return(
    <View
      style={{
        flex: 1,
        backgroundColor: '#155fbf',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }} 
    >
      <Link href='/' style={{ marginTop:-400, marginRight:290 }}>
          <Ionicons name="chevron-back-circle-outline" size={30} color="white" />
      </Link> 
      <Link href='/' style={{  marginTop: -80, marginLeft:290 }}>
        <MaterialCommunityIcons name="bell-ring" size={45} color="white" />     
      </Link> 
      
       <View
        style={{
        backgroundColor: '#155fbf',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop:100
      }}
        >
      <PageTitle text='Motor Exemplo'></PageTitle>
      </View>  
    </View>

  
  )
}
