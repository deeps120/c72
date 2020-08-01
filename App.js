
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBotttomTabNavigator} from 'react-navigation-tabs';
import BookTransactionScreen from './screens/bookTransactionScreen';
import SearchScreen from './screens/searchScreen';

export default class App extends React.Component{
  render(){
  return (
  <AppContainer/>
  );
  }
}
const TabNavigator = createBotttomTabNavigator({
  Transaction:{
    screen:BookTransactionScreen
  
  },
  Search:{
    screen:SearchScreen
  },
},
  {defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const routeName = navigation.state.routeName;
      if(routeName==='Transaction'){
        return(<Image 
        source={require('./assets/book.png')
    }
    style={{width:40,height:40}}
        />)
      }
      else if(routeName==='Search'){
        return(<Image
        source={require('./assets/searchingbook.png')}
        style={{width:40,height:40}}
        />)
      }
    }
  })
})

const AppContainer = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
