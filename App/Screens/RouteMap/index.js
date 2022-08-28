import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import Geolocation from 'react-native-geolocation-service';
import Count from './Components';

const RouteMap = () => {
  const [hour, setHour] = useState(0)
  const [min, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [mSecond, setmSecond] = useState(0)
  const [stop, setStop] = useState(false)
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
    latitude: 28.7041,
    longitude: 77.1025,

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
  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(position => {
      // this.setState({ coords: position.coords, loading: false });
      // console.log(position);
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current.animateToRegion(region, 500);
    });
  };
  const startOn = () => {
    setStop(true)

   
  }
  const stopOn = () => {
    setStop(false)

   
  }
  useEffect(() => {
let interval=null
   if (stop) {
  interval =  setInterval(() => {
    if (min>59) {
      setHour(hour+1)
      setMinute(0)
      clearInterval(interval)
      
    }
    if (second>59) {
      setMinute(min+1)
      setSecond(0)
      clearInterval(interval)
      
    }
    if (mSecond>999) {
      setSecond(hour+1)
      setmSecond(0)
      clearInterval(interval)
      
    }
    if (mSecond<=999) {
      setmSecond(mSecond+1)
      
    }
      
    }, 50);
    
   }else{
    clearInterval(interval)
   }
   return ()=>{
    clearInterval(interval)
   }
   
  })
  
  // useEffect(() => {
  //   // getLocation()
  // }, [])

  return (

    <View style={{ flex: 1 }}>
      {/* <MapView
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
          apikey={'AIzaSyAn9wVgUpu0h_LAHr0LPrzcKQjQ9uVczT8'} // insert your API Key here
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
      </MapView> */}
      {/* <View style={styles.startView}>
        <TouchableOpacity
        onPress={startOn} style={styles.startBottom}>
          <Text style={{ color: 'white', fontSize: 20 }}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.startBottm1}>
       <Count/>
      </View> */}
       <Count/>
    </View>
  )
}

export default RouteMap

const styles = StyleSheet.create({
  startView: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: "center"
  },
  startBottom: {
    width: '70%',
     height: 50,

    backgroundColor: 'red',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  startBottm1: {
    width: '100%',
    height: 50,
    position: 'absolute',
    alignSelf: 'center',
    top: 50,
    backgroundColor: 'white',
    opacity: 0.9,
    zIndex: 6,

    justifyContent: 'center',
    alignItems: 'center'
  }
})