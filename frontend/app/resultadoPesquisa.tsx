import React from "react";
import { View, ScrollView } from 'react-native'
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { ReturnButton } from "../src/components/returnButton";
import { PageTitle } from "../src/components/pageTitle";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, Text } from 'react-native-paper';

export default function resultadoPesquisa(){
  const router = useRouter();
  const params = useLocalSearchParams();
  const lista = JSON.parse(Array.isArray(params.motores) ? params.motores[0] : params.motores);

  return(
    <View style={{
                    flex: 1,
                    backgroundColor: '#155fbf',
                    width: '100%',
                    gap: 6,
                    paddingBottom: 0
                 
                }}>
      <ScrollView contentContainerStyle={{flex: 1, width:'100%', justifyContent: 'center', alignItems:'center', gap:10}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 40, width: '100%', paddingHorizontal: 16, marginTop:10}}>
        
        <ReturnButton></ReturnButton>
        <PageTitle text='Motor exemplo'></PageTitle>
        <Link href='/'>
          <MaterialCommunityIcons name="bell-ring" size={45} color="white" />     
        </Link> 
      </View>
        
        {lista.map((motor, index) => (
        <Card key={index} style={{width: '80%', backgroundColor: '#537eb5', borderColor:'transparent' }} onPress={() =>
          router.push({
          pathname: 'desenhoIndividualForum',
          params: { motor: JSON.stringify(motor) }
        })
      }>
          <Card.Content><Text style={{fontWeight:'bold'}} variant="titleLarge">{motor.modelo}</Text></Card.Content>
          <Card.Cover source={{ uri: motor.desenho }} />
        </Card>
        ))}      
      </ScrollView>
      <NavigationMenu/>
    </View>

  );

}