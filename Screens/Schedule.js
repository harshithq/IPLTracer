import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Player from './Player';
import { AdMobBanner, PublisherBanner, AdMobRewarded, AdMobInterstitial, setTestDeviceIDAsync } from 'expo-ads-admob';
import { Card } from 'react-native-paper';
import { Container } from 'native-base';
import constant from 'expo-constants';



const Schedule = () => {

  let arr = [];
  const [gallery, setgallery] = useState(arr);
  useEffect(() => {
    // Update the document title using the browser API
    const myitems = firebase.database().ref("timetables");
    myitems.on("value", datasnap => {
      arr = Object.values(datasnap.val());
      setgallery(arr);
      // console.log("sched");
    });
  }, []);
  // console.log(gallery);

  const renderItem = ((item) => {
    return(
    <Card style={styles.mycard}>
      <View style={styles.cardView}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30, marginRight:10 }}
          source={{ uri: item.image }}

        />
        <View >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.details}>{item.time}</Text>
          <Text style={styles.details}>{item.stad}</Text>
        </View>

      </View>

    </Card>

    );
  });

  return (
    
      <View style={{flex:1,alignContent:'center',marginTop:10}}>
     
        <ImageBackground source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLmlscHdhbGxwYXBlci5jc2t3YWxscGFwZXJfc2NyZWVuXzBfMTYwMDY1ODk1Nl8wNzg/screen-0.jpg?fakeurl=1&type=.jpg' }} style={styles.ImageBg} blurRadius={10}>
        
        <View style={{alignItems:'center',margin:10}}>
        <Text style={styles.listnews}>Time Table IPL 2021</Text>
        <AdMobBanner
               bannerSize="smartBanner"
               adUnitID="ca-app-pub-7523541834254785/1427754205"  // true or false
               onDidFailToReceiveAdWithError={(e) => console.log(e)}
              />
       <FlatList

            data={gallery}
            renderItem={({item})=>{
              return renderItem(item)
            }}
            keyExtractor={item=>item.id}
        />
        </View>
        </ImageBackground>
      </View>
    

    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:constant.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  mycard: {
    alignContent:'center',
    width:350,
    marginVertical:4
  },
  cardView: {
    flex:1,
    flexDirection: "row",
    height: 80,
    width: '100%',
    padding: 6,
    backgroundColor: 'transparent',

  },
  text: {
    marginLeft:5,
    fontSize:20
  },
  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: 'flex-start',  
  },
  listnews:{
    color: 'white', 
    fontWeight: 'bold', 
    paddingLeft: 14,
    fontSize: 30,
    marginVertical: 20,
},
title:{
    marginLeft:5,
    fontSize:19,
    fontWeight: 'bold', 

},
details:{
    marginLeft:5,
    fontSize:14,
    fontWeight: 'bold', 
    opacity:0.7
}

})

export default Schedule;