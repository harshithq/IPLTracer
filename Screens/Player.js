
import {StyleSheet,Text,View,ImageBackground} from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Container} from 'native-base';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AdMobBanner,PublisherBanner,AdMobRewarded,AdMobInterstitial,setTestDeviceIDAsync} from 'expo-ads-admob';

const onFullscreenUpdate = async ({fullscreenUpdate}: VideoFullscreenUpdateEvent) => {
    switch (fullscreenUpdate) {
        case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
            await ScreenOrientation.unlockAsync() // only on Android required
            break;
        case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // only on Android required
            break;
    }
}


const Player =({ route, navigation }) =>
{   
    const { itemId, otherParam } = route.params;
    console.log("Below This");
    console.log(otherParam)
    return(
    <Container>
    <ImageBackground source={{ uri: otherParam.image  }} style={styles.ImageBg} blurRadius={10}>
        <Video
                source={{ uri: otherParam.videoUrl }}
                rate={1.0}
                volume={1.0}
                // onFullscreenUpdate={async () => {
                //     await ScreenOrientation.lockAsync(
                //     orientationIsLandscape ? ScreenOrientation.OrientationLock.PORTRAIT : 
                //     ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
                //             );
                //         setOrientationIsLandscape(!orientationIsLandscape);
                // }}
                resizeMode="cover"
                onFullscreenUpdate={onFullscreenUpdate}
                isMuted={false}
                useNativeControls={true}
                shouldPlayexpo 
                style={styles.backgroundVideo}
                />
                  <Text style={styles.movieName}>{otherParam.title}</Text>
                  <Text style={styles.movieStat}>{otherParam.released}</Text>
                  <Text style={styles.movieStat}>{otherParam.location}</Text>
                  <View style={styles.bannerAD}>
                <AdMobBanner
               bannerSize="smartBanner"
               servePersonalizedAds={true}
               adUnitID="ca-app-pub-1477639281711657/3212567025"  // true or false
               onDidFailToReceiveAdWithError={(e) => console.log(e)}
              />
              </View>

                  <Text style={styles.updates}>Live Updates :</Text>
                  <Text style={styles.listnews}>{otherParam.updates}</Text>

                </ImageBackground>
    </Container>
    );

}

const styles = StyleSheet.create({
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
        marginBottom: 6,
        opacity: 0.8
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
        marginTop:20
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

export default Player;