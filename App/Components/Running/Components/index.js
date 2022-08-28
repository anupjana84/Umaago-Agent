import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO ;
import Geolocation from 'react-native-geolocation-service';



const Run = () => {
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
  
  useEffect(() => {
    // getLocation()
  }, [])
  
  return (

    <View style={{ flex: 1 }}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={{ flex: 1, }}
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
                  bottom: 300,
                  left: 30,
                  top: 100,
              },
          });
          }}
        />
      </MapView>
      <View style={styles.startBottm}></View>
    </View>
  )
}

export default Run

const styles = StyleSheet.create({
  startBottm:{
    width:SCREEN_WIDTH,
    height:100,
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
     backgroundColor:'red'
  }
})