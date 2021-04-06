import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import {firebaseConfig} from './config';
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';
import { render } from 'react-dom';
import Home from './Screens/Home';
import Predictor from './Screens/Predictor';
import Schedule from './Screens/Schedule';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Player from './Screens/Player';
import { createStackNavigator } from '@react-navigation/stack';
import { AdMobBanner,PublisherBanner,AdMobRewarded,AdMobInterstitial,setTestDeviceIDAsync} from 'expo-ads-admob';

const Tab = createMaterialBottomTabNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

function MyTabs() {
	return (
    <Tab.Navigator 
    swipeEnabled
     initialRoute="Home"
     activeColor="#02ad94"
     inactiveColor="#dedede"
     style={{ backgroundColor: '#000'}}
     barStyle={{ backgroundColor: '#0f0f0f', padding: 4}}
     >
     <Tab.Screen name="Home" component={Home} 
       options={{
           tabBarLabel: '',
           tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="home" color={color} size={28} />
           ),
         }}
     />
     <Tab.Screen name="Predictor" component={Predictor}
       options={{
           tabBarLabel: '',
           tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="camera-metering-spot" color={color} size={28} />
           ),
         }}
     />
     <Tab.Screen name="Schedule" component={Schedule}
       options={{
           tabBarLabel: '',
           tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="account" color={color} size={28} />
           ),
         }}
     />
   </Tab.Navigator>
	);
}
const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount(){
    const myitems=firebase.database().ref("items");
    myitems.on("value",datasnap=>{
      console.log(datasnap.val())
    })
  }
  render(){
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
       <Stack.Screen name="Tabs" component={MyTabs} />
				<Stack.Screen name="Player" component={Player} />
			</Stack.Navigator>
    </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
