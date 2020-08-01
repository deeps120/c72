import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,CreateSwitchNavigator} from 'react-navigation';
import {createBotttomTagNavigator} from 'react-navigation-tabs';

export default class SearchScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>search</Text>
            </View>
        )
   }
}
