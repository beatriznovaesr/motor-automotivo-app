import React, { useState } from 'react';
import { Text, Switch, StyleSheet, View } from 'react-native';

export const NotificationSwitch = ({ ativada, setAtivada }) => {

    const acionarSwitch = () => setAtivada(estadoAnterior => !estadoAnterior)

    return (
        <View style= {{flexDirection: 'row', gap: 5 }}>
            <Text style= {style.text}>Notificações: </Text>
            <Switch
                trackColor={{false: '#A2A2A2', true: '#7BB3FC'}}
                thumbColor={ativada ? '#FFFFFF': '#FFFFFF'}
                onValueChange={acionarSwitch}
                value={ativada}>
            </Switch>
        </View>
    );
};

    const style = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },

        text: {
            fontFamily: 'Roboto-serif',
            fontSize: 18,
            color: '#FFFFFF',
            textShadowColor: '#6c9bd9',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 10,
        }
    });

