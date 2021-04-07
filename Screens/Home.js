import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList,Alert} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-anchor-carousel';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Player from './Player';
import { AdMobBanner,PublisherBanner,AdMobRewarded,AdMobInterstitial,setTestDeviceIDAsync} from 'expo-ads-admob';
import * as Analytics from 'expo-firebase-analytics';

const Stack = createStackNavigator();

async function adsCall() {
  console.log("called");
  await AdMobInterstitial.setAdUnitID('ca-app-pub-7523541834254785/9469895759'); // Test ID, Replace with your-admob-unit-id
  await AdMobInterstitial.requestAdAsync({servePersonalizedAds : false});
  await AdMobInterstitial.showAdAsync();

}
async function analytics(){
 await Analytics.setCurrentScreen('Home');
}

const Home =(props) =>
{
    let arr=[];
    const [gallery, setgallery] = useState(arr);
      useEffect(() => {
        // Update the document title using the browser API
        const myitems=firebase.database().ref("list");
        myitems.on("value",datasnap=>{
          arr=Object.values(datasnap.val());
          setgallery(arr);
          console.log("trig");
        });
      },[]);


    const [background,setBackground] = useState({
        uri: 'https://image.winudf.com/v2/image1/Y29tLmlscHdhbGxwYXBlci5jc2t3YWxscGFwZXJfc2NyZWVuXzBfMTYwMDY1ODk1Nl8wNzg/screen-0.jpg?fakeurl=1&type=.jpg',
        name: 'Avengers: End Game',
        stat: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
        desc: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
        loc: 'India'
      });
    
  
      const [ind,indUp]=useState(0);


      const carouselRef = useRef(null);

      const {width, height} = Dimensions.get('window');

      const renderItem = ({item, index}) => {
        return (
        <View>
              <TouchableOpacity
                onPress={() => 
                    { 
                    carouselRef.current.scrollToIndex(index);
                    const newCar={
                        uri: item.image,
                        name: item.title,
                        stat: item.released,
                        desc: item.desc,
                        loc: item.location
                    };
                    setBackground(newCar);
                    indUp(item);
                    }
                }
          >
            <Image source={{uri: item.image}} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.shortTitle}</Text>
          </TouchableOpacity>
         
        </View>
        )
    }
      
    return(
        <ScrollView style={{backgroundColor: '#000',marginTop : 30}} showsVerticalScrollIndicator={false} blurRadius={100}>
  
        <View style={styles.carouselContentContainer}>
       
          <View style={{...StyleSheet.absoluteFill, backgroundColor: '#000'}}>
            <ImageBackground source={{ uri: background.uri  }} style={styles.ImageBg} blurRadius={10}>

            {/* <View style={styles.SearchboxContainer}>
                <TextInput
                placeholder='Search Movies'
                placeholderTextColor='#666'
                style={styles.Searchbox}
                >
              </TextInput>
                <Feather name='search' size={22} color='#666' style={styles.SearchboxIcon} />
              </View> */}
              <View style={styles.bannerAD}>
              <AdMobBanner
               bannerSize="smartBanner"
               servePersonalizedAds={true}
               adUnitID="ca-app-pub-7523541834254785/4530422089"  // true or false
               onDidFailToReceiveAdWithError={(e) => console.log(e)}
              />
              </View>
             
            <Text style={{color: 'white', fontSize: 34, fontWeight: 'bold', marginLeft: 10, marginVertical:10, textAlign: 'center'}}>Top Picks Today</Text>
            <View style={styles.carouselContainerView}>
                <Carousel style={styles.carousel}
                data={gallery}
                renderItem={renderItem}
                itemWidth={200}
                containerWidth={width - 20} 
                separatorWidth={0}
                ref={carouselRef}
                inActiveOpacity={0.4}
                //pagingEnable={false}
                //minScrollDistance={20}
            />
      </View>

      <View style={styles.movieInfoContainer}>
        <View style={{ justifyContent: 'center'}}>
            <Text style={styles.movieName}>{background.name}</Text>
            <Text style={styles.movieStat}>{background.stat}</Text>
            <Text style={styles.movieStat}>{background.loc}</Text>
        </View>
        <TouchableOpacity style={styles.playIconContainer}>
            <FontAwesome5  name='play' size={22} color='#02ad94' style={{marginLeft: 4}} onPress={() => 
                    {
                      adsCall();
                      analytics();
                      Analytics.logEvent('ButtonTapped', {
                      name: 'play',
                      screen: 'Home',
                      purpose: 'defeated'
                      });
                      console.log("Clicked button");
                      console.log(ind);
                      if(ind===0)
                      {
                        console.log("Clicked 0");
                        Alert.alert(
        "To Watch Stream",
        "First Select Stream than click Play Button",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
                      }
                      else
                      props.navigation.navigate('Player',{itemId: 1,otherParam: ind});
                    }}  />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 14, marginTop: 14}}>
          <Text style={{color: 'white', opacity: 0.8, lineHeight: 20}}>
              {background.desc}
          </Text>
      </View>

            </ImageBackground>
            </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({


    // CAROUSEL STYLES
    
    carouselImage: {
        width: 200, 
        height: 320, 
        borderRadius: 10, 
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    carouselText: {
        paddingLeft: 14,
        color: 'white', 
        position: 'absolute', 
        bottom: 10, 
        left: 2, 
        fontWeight: 'bold',
        fontSize:20,
    },
    carouselIcon: {
        position: 'absolute', 
        top: 15, 
        right: 15
    },
    carouselContentContainer: {
        flex: 1,
        backgroundColor: '#000',
        height: 720,
        paddingHorizontal: 14
      },
    SearchboxContainer: {
        flexDirection: 'row',
        marginVertical: 20, 
        width: '100%',
        alignSelf: 'center', 
        backgroundColor: '#fff', 
        elevation: 10,
        borderRadius: 4,
      },
      Searchbox: {
        padding: 12,
        paddingLeft: 20,
        fontSize: 16,
      },
      SearchboxIcon: {
        position: 'absolute', 
        right: 20, 
        top: 14
      },
      ImageBg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',  
      },
      carouselContainerView: {
        width: '100%',
        height:350 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
      carousel: {
        flex:1,
        overflow: 'visible',
    } ,
    movieInfoContainer: {
      flexDirection: 'row', 
      marginTop: 16, 
      justifyContent: 'space-between', 
      width: Dimensions.get('window').width - 14
    },
    movieName: {
      paddingLeft: 14,
      color: 'white', 
      fontWeight: 'bold', 
      fontSize: 20,
      marginBottom: 6
    },
    movieStat: {
      paddingLeft: 14,
      color: 'white', 
      fontWeight: 'bold', 
      fontSize: 14, 
      opacity: 0.8
    },
    playIconContainer: {
      backgroundColor: '#212121',
      padding: 18,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 25,
      borderWidth: 4,
      borderColor: 'rgba(2, 173, 148, 0.2)',
      marginBottom: 14
    },
    bannerAD:{
      width: '100%',
    }

    });

export default Home;