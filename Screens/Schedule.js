import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-anchor-carousel';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Player from './Player';
import { AdMobBanner,PublisherBanner,AdMobRewarded,AdMobInterstitial,setTestDeviceIDAsync} from 'expo-ads-admob';
import {Card} from 'react-native-paper';
import {Container} from 'native-base';




const Schedule =() =>
{

    let arr=[];
    const [gallery, setgallery] = useState(arr);
      useEffect(() => {
        // Update the document title using the browser API
        const myitems=firebase.database().ref("timetables");
        myitems.on("value",datasnap=>{
          arr=Object.values(datasnap.val());
          setgallery(arr);
          console.log("sched");
        });
      },[]);
      console.log(gallery);

    const renderItem = ((item) => {
        <Card style={styles.mycard}>
        <View style={styles.cardView}>
             <Image
            style={{width:60,height:60,borderRadius:30}}
            source={{uri:item.image}}
            
            />
            <View style={{marginLeft:10}}>
                <Text style={styles.text}>{item.title}</Text>   
                 <Text style={styles.text}>{item.stad}</Text>      
            </View>
       
        </View>
        
       </Card>
    });

    return(
        <Container>
        <FlatList
              data={gallery}
              renderItem={renderItem}
              keyExtractor={item=>item._id}/>
       </Container>
    );
}

const styles = StyleSheet.create({
    mycard:{
        margin:5,
        height:100,
        width:100,
    },
    cardView:{
         flexDirection:"row",
         height:80,
        width:80,
         padding:6,

    },
    text:{
        fontSize:18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default Schedule;