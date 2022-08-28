import {
  StyleSheet, Text,
  TouchableOpacity, ScrollView, Image, View,Dimensions
} from 'react-native';
import React, { useEffect, useState,useRef } from 'react';
import { Avatar, TextInput, ActivityIndicator, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { getAllCampaignHistory } from '../../Actions/CampaignHistory'
import { connect, useSelector } from 'react-redux';
import Run from './Components';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO+5 ;

const Running = ({ getAllCampaignHistory }) => {
  const [loding, setLoding] = useState(false)
  const [runShow, setRunShow] = useState(false)
  const CampaignHistory = useSelector((state) => state.CampaignHistory)
   console.log(CampaignHistory.running, 'run')
   const mapRef = useRef(null)
   const [currentRegion, setCurrentRegion] = useState({
     latitude: 24.101563,
     longitude: 88.18039,
     latitudeDelta: LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA,
   });
   const changRegion = (e) => {
     console.log(e)
 
   }
   const destination1 = {
     latitude: 22.5726,
     longitude: 88.3639,
 
   }
   const origin = {
     latitude: 22.0627,
     longitude: 88.0833,
 
   }
   const onLayoutMap = () => {
     mapRef.current.animateCamera({
       center: {
         currentRegion,
       },
       heading: 0,
       pitch: 180,
     });
   };

  // useEffect(() => {
  //   getAllCampaignHistory(setLoding)
  // }, [])

  const navigation = useNavigation()
  return (
    <View  style={{width:'100%', height:SCREEN_HEIGHT/3}}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={{width:'100%', height:SCREEN_HEIGHT/3}}
        maxZoomLevel={20}
        minZoomLevel={0}
        radius={50}

        initialRegion={currentRegion}
        ref={mapRef}
        Provider={MapView.PROVIDER_GOOGLE}
        zoomControlEnabled={false}
        zoomEnabled={true}
        zoomTapEnabled={true}
        animationEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        showsMyLocationButton={false}
        scrollDuringRotateOrZoomEnabled={true}
        preserveClusterPressBehavior={true}
        showsUserLocation={true}
        userLocationPriority={'high'}
        mapType={'standard'}
        onLayout={onLayoutMap}

      >
        <MapViewDirections
          origin={origin}
          destination={destination1}
          apikey={'AIzaSyBfraoS0ohCEyMzHjDrOfEz9wRG35IiUlw'} // insert your API Key here
          strokeWidth={6}
          strokeColor="#1b5a90"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                  right: 30,
             
                  left: 30,
                  top: SCREEN_HEIGHT/3,
              },
          });
          }}
        />
      </MapView>
      
    </View>

    
    // <ScrollView showsVerticalScrollIndicator={false} 
    // nestedScrollEnabled={true}>
    //      {CampaignHistory.running == null ?  (<Run/>) : (
    //   <View style={{ flex: 1 }}>

    //     <Card
    //       style={{
    //         padding: 20,
    //         margin: 20,
    //         backgroundColor: 'white',
    //         borderRadius: 20,
    //       }}>
    //       {loding ? (<View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
    //         <ActivityIndicator size={80} color={'#ff3259'} />
    //       </View>) : (
    //         <>
    //           {CampaignHistory.running == null ? (
    //             <Text> No Data Found</Text>
    //           ) : (
    //             <>
    //               <Title>Samsung</Title>
    //               <View style={styles.itemView}>
    //                 <Text>Serveice Type</Text>
    //                 <Text>Banner</Text>
    //               </View>
    //               <Text style={{ fontSize: 16, fontWeight: '900', marginVertical: 8 }}>Image</Text>
                
    //               <View style={styles.imageView}>
    //                 <View style={styles.imageViewLeft}>
    //                   <Image source={require('../../Images/mobile.jpg')}
    //                     style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 6 }} />
    //                 </View>
    //                 <View style={styles.imageViewRight}>
    //                   <Image source={require('../../Images/mobile.jpg')}
    //                     style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 6 }} />
    //                 </View>
    //               </View>
    //             </>
    //           )}
    //         </>
    //       )}
          
    //     </Card>
     
    //       <TouchableOpacity
    //         onPress={() => alert('Submit Successfull')}
    //         style={styles.nextBottom}>
    //         <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
    //           Start Campaign
    //         </Text>
    //       </TouchableOpacity>
        
    //   </View>
    //   )}
    // </ScrollView>
  );
};

export default connect(null, { getAllCampaignHistory })(Running);

const styles = StyleSheet.create({
  //Image View
  imageView: {
    width: '100%', height: 100, flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageViewLeft: {
    width: '48%',
    height: '100%',

    borderRadius: 8,
    padding: 2

  },
  imageViewRight: {
    width: '48%',
    height: '100%',
    borderRadius: 8,
    padding: 2
  },
  //Image View
  itemView: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  //next Bottom
  nextBottom: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#ff3259',
    borderRadius: 25,

    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
  //next Bottom
});
