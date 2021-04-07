import { render } from 'react-dom';
import {StyleSheet,Text,View,ImageBackground,ScrollView,Image,TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import React, {useRef, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Container} from 'native-base';
import * as firebase from 'firebase';
import { AdMobBanner,PublisherBanner,AdMobRewarded,AdMobInterstitial,setTestDeviceIDAsync} from 'expo-ads-admob';
import * as Linking from 'expo-linking';




const Predictor =() =>
{
    
    let arr=[{
        title:"Tips will be provided at 07:20 PM",
        image:'https://image.winudf.com/v2/image1/Y29tLmlscHdhbGxwYXBlci5jc2t3YWxscGFwZXJfc2NyZWVuXzBfMTYwMDY1ODk1Nl8wNzg/screen-0.jpg?fakeurl=1&type=.jpg',
        emw: "",
        titlet1:"",
        titlet2:"",
        tp1:"",
        tp2:"",
    }];
    const [gallery, setgallery] = useState(arr);
      useEffect(() => {
        // Update the document title using the browser API
        const myitems=firebase.database().ref("fantasy");
        myitems.on("value",datasnap=>{
          arr=Object.values(datasnap.val());
          setgallery(arr);
          console.log("fanatsy");
        });
      },[]);
      console.log(gallery)

    return(
        <ScrollView style={{backgroundColor: '#000',marginTop : 30}} showsVerticalScrollIndicator={false} blurRadius={100}>
         <ImageBackground source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLmlscHdhbGxwYXBlci5jc2t3YWxscGFwZXJfc2NyZWVuXzBfMTYwMDY1ODk1Nl8wNzg/screen-0.jpg?fakeurl=1&type=.jpg' }} style={styles.ImageBg} blurRadius={10}>
         <View style={styles.contained}>
         <Text style={styles.movieName}>Fantasy League Helper</Text>
         </View>
         <AdMobBanner
               bannerSize="smartBanner"
               servePersonalizedAds={true}
               adUnitID="ca-app-pub-3940256099942544/6300978111"  // true or false
               onDidFailToReceiveAdWithError={(e) => console.log(e)}
         />
         <View style={styles.contained}>
         <Text style={styles.listnews}>{gallery[0].title}</Text>  
         </View>      
         <View style={styles.contained}>
         <Image source={{ uri: gallery[0].image }} style={styles.team} /> 
         </View>
         <TouchableOpacity activeOpacity = { .5 }  onPress={() => Linking
  .openURL('https://dream11.onelink.me/hNTA/428a86c3')
  .catch(err => console.error('Error', err))} >
         <Image source={{ uri: 'https://cdn.static-zoutons.com/images/originals/blog/Dream11ReferralCode04_1595071553.png' }}  resizeMode="stretch" style={{height: 100,borderColor:'white',
          borderWidth:3,
          borderRadius:10,marginVertical:5}} /> 
         </TouchableOpacity>

         
         <Text style={styles.listnews}>{gallery[0].titlet1}</Text>
         <Text style={{color: 'white', opacity: 0.8, lineHeight: 20,paddingLeft : 14}}>{gallery[0].tp1}</Text>
         <Text style={styles.listnews}>{gallery[0].titlet2}</Text>
         <Text style={{color: 'white', opacity: 0.8, lineHeight: 20,paddingLeft : 14,marginBottom :15}}>{gallery[0].tp2}</Text>
         <AdMobBanner
               bannerSize="smartBanner"
               servePersonalizedAds={true}
               adUnitID="ca-app-pub-3940256099942544/6300978111"  // true or false
               onDidFailToReceiveAdWithError={(e) => console.log(e)}
         />
         <Text style={styles.listnews}>{gallery[0].emw}</Text>
         
         </ImageBackground>
         </ScrollView>
  
    );

}
const styles = StyleSheet.create({
    contained:{
        marginVertical:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    team:{
          width: 280,
          height: 500,
          borderColor:'white',
          borderWidth:3,
          borderRadius:10,
          marginTop:10

          
       },
    updates:{
        color: 'white', 
        fontWeight: 'bold', 
        paddingLeft: 14,
        fontSize: 24,
        marginBottom: 6,
        marginTop: 10

    },
    listnews:{
        color: 'white', 
        fontWeight: 'bold', 
        paddingLeft: 14,
        fontSize: 20,
        marginVertical: 6,
    },
     backgroundVideo: {
      flex: 0.5,
      height:'100%'
    },
    ImageBg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',  
      },
      title: {
        paddingLeft: 14,
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 24,
        marginBottom: 6,
        marginTop: 20
      },
      movieName: {
        paddingLeft: 14,
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 30,
        marginBottom: 6,
        marginTop:20,
      },
      movieStat: {
        paddingLeft: 14,
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 16, 
        opacity: 0.8
      },
      bannerAD:{
        width: '100%',
        marginVertical:10
      }
  });

export default Predictor;