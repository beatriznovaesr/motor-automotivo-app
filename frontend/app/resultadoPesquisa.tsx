import React from "react";
import { View, ScrollView } from 'react-native'
import { Link, useRouter } from 'expo-router';
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { ReturnButton } from "../src/components/returnButton";
import { PageTitle } from "../src/components/pageTitle";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, Text } from 'react-native-paper';

export default function resultadoPesquisa(){
  const router = useRouter();
  const imagens: string[] = [
    'https://img.freepik.com/vetores-premium/um-conjunto-de-varios-tipos-de-motor-de-carro-poderoso-o-motor-e-desenhado-com-linhas-brancas-em-uma-folha-azul-escura-em-uma-gaiola_101266-13803.jpg?semt=ais_items_boosted&w=740',
    'https://thumbs.dreamstime.com/b/arquiteto-blueprint-do-projeto-motor-isolado-120578700.jpg',
    'https://img.freepik.com/vetores-premium/um-conjunto-de-varios-tipos-de-motor-de-carro-poderoso-o-motor-e-desenhado-com-linhas-brancas-em-uma-folha-azul-escura-em-uma-gaiola_101266-13803.jpg?semt=ais_items_boosted&w=740',
];
  return(
    <View style={{
                    flex: 1,
                    backgroundColor: '#155fbf',
                    //justifyContent: 'center',
                    //alignItems: 'center',
                    width: '100%',
                    gap: 6,
                    paddingBottom: 0
                 
                }}>
      <ScrollView contentContainerStyle={{flex: 1, width:'100%', justifyContent: 'center', alignItems:'center', gap:10}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 40, width: '100%', paddingHorizontal: 16, marginTop:-150, marginBottom: 30}}>
        
        <ReturnButton></ReturnButton>
        <PageTitle text='Motor exemplo'></PageTitle>
        <Link href='/'>
          <MaterialCommunityIcons name="bell-ring" size={45} color="white" />     
        </Link> 
      </View>
      
        {imagens.map((img, index) => (
        <Card key={index} style={{width: '80%', backgroundColor: '#537eb5', borderColor:'transparent' }} onPress={() =>router.push('desenhoIndividualForum')}>
          <Card.Content><Text style={{fontWeight:'bold'}} variant="titleLarge">Motor Nome</Text></Card.Content>
          <Card.Cover source={{ uri: img }} />
        </Card>
        ))}      
      </ScrollView>
      <NavigationMenu/>
    </View>

  );

}