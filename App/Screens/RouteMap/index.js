import { StyleSheet,Platform, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import Geolocation from 'react-native-geolocation-service';
import { alertMessage } from '../../Components/AlertMessage';

import Count from './Components';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { hasLocationPermission } from '../../Components/Helper/AskPermission';
import CameraModal from './Components/CameraModal';
import FlashMessage from "react-native-flash-message";
import ImageModal from './Components/ImageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';
import { Base_url } from '../../Utils/BaseUrl';

import Loder from '../../Components/Loder';

const CustomMarker = () => {
  return (
    <Image
      style={{ width: 35, height: 55 }}
      source={require('../../Images/14.png')}
    />
  );
};
const RouteMap = ({ navigation }) => {
  const { running } = useSelector((state) => state.CampaignHistory)
  //  console.log(running, 'run')
  const [lodding, setLodding] = useState(false)

  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [listOfSeasons, setListOfSeasons] = useState([]);
 
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 24.101563,
    longitude: 88.18039,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [state, setState] = useState({

    coordinate: new AnimatedRegion({
      latitude: 24.101563,
      longitude: 88.18039,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }),
  })
  const { coordinate } = state
 
  
 
  const destination1 = {
    latitude: parseFloat(running.running_detail.to_latitude),
    longitude: parseFloat(running.running_detail.to_longitude),

  }
  const origin = {
    latitude: parseFloat(running.running_detail.from_latitude),
    longitude: parseFloat(running.running_detail.from_longitude),


  }
  const onLayoutMap = (lat, lng) => {
    mapRef.current.animateCamera({
      center: {
        currentRegion,
      },
      heading: 0,
      pitch: 180,
    });
  };
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
        if (markerRef.current) {
            markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
        }
    } else {
        coordinate.timing(newCoordinate).start();
    }
}

  const getLocation2 = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    
    Geolocation.getCurrentPosition(
      (position) => {
       
         animate(position.coords.latitude, position.coords.longitude);
        setCurrentRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        )
       
        

      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  };
  const getLocation1 = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    
    Geolocation.getCurrentPosition(
      (position) => {
        const{latitude,longitude}= position.coords
        animate(position.coords.latitude, position.coords.longitude);
        
        setState({
          coordinate: new AnimatedRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          })
        }
        )

      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  };
  const getLocation = async (status) => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    // console.log("first", status)
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        
       campainSave(position.coords.latitude, position.coords.longitude, status)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  };
  //===========
  const options = {
    title: ' Choose Image ',
    takePhotoButtonTitle: 'From camera',
    ChooseFromLibraryButtonTitle: 'From Library',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const pickCamera = async () => {
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response.fileName, 'hh', response.path, response.type)
        // console.log(response.assets[0].uri, 'pp')
        addToList(response.assets[0].uri, response.assets[0].fileName, response.assets[0].type);
        setModalVisible1(true)
        // setImage(response.assets[0]);
        // console.log(response.uri, response.fileName, response.type);
      }
    });
  };

  const pickImageLibrary = async () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response);
        addToList(response.assets[0].uri, response.assets[0].fileName, response.assets[0].type);
        setModalVisible1(true)
        // setImage(response.assets[0]);
      }
    });
  };
  //===========
  //===========
  const addToList = async (item1, item2, item3) => {
    // console.log(item1, 'item1', item2, 'item2', item3);
    try {
      const seasonToAdd = {
        id: shortid.generate(),
        imguri: item1,
        imgfilename: item2,
        imgtype: item3,
      };
      const storedValue = await AsyncStorage.getItem('@season_list1');
      const prevList = await JSON.parse(storedValue);
      console.log(typeof prevList)
      if (!prevList) {
        const newList = [seasonToAdd];

        await AsyncStorage.setItem('@season_list1', JSON.stringify(newList));
        getList();
      } else {
        console.log(prevList.length);
        if (prevList.length >= 6) {
          alert('Max 6 Images')
        } else {

          prevList.push(seasonToAdd);
          await AsyncStorage.setItem('@season_list1', JSON.stringify(prevList));
          getList();
        }

      }
    } catch (error) {
      console.log(error);
    }
  };
  const getList = async () => {
    const storedValue = await AsyncStorage.getItem('@season_list1');
    if (!storedValue) {
      setListOfSeasons([]);
    }
    const list = JSON.parse(storedValue);
    setListOfSeasons(list);
  };

  const deleteSeason = async id => {
    const newList = await listOfSeasons.filter(list => list.id !== id);
    await AsyncStorage.setItem('@season_list1', JSON.stringify(newList));
    setListOfSeasons(newList);
  };
  //===========
  const save = async () => {

    // console.log(serveType)

    const user = JSON.parse(await AsyncStorage.getItem('@user'));
    // console.log(user.access_token)
    let formData = new FormData();
    const storedValue = JSON.parse(await AsyncStorage.getItem('@season_list1'));
    if (
      running.running_detail.campaign_id == null

    ) {
      alertMessage('ID Not found', '#0D0D0D');
    } else {
      setLodding(true);
      if (storedValue && storedValue.length > 0) {
        storedValue.map((item, i) => {
          const imagdata = {
            uri: item.imguri,
            name: item.imgfilename,
            type: item.imgtype,
          };
          formData.append('image[]', imagdata);
        });
      } else {
        formData.append('image[]', null);
      }

      formData.append('campaign_detail_id', running.running_detail.id);


      // console.log(formData);
      return await fetch(`${Base_url}/campaign-detail-imgae-store`, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${user.access_token}`
        },
      }).then(res => {
        return res.json()
      }).then(async (result) => {
        console.log(result);
        if (result?.error == true) {
          setLodding(false)
          alertMessage(result.error_messages[0], '#E07C24')
        } else {
          setLodding(false)
          await AsyncStorage.removeItem('@season_list1')
          getList()
          setModalVisible1(false)
          alertMessage('Save Successfully', '#4DD637')
        }
        // }
      }).catch(err => console.log(err));
    }
  };
  const campainSave = async (lat, lng, status) => {
    //  console.log(status,'statuss');
    // console.log(lat,'lat')
    // console.log(lng,'lng')
    // console.log(status,'status')

    const user = JSON.parse(await AsyncStorage.getItem('@user'));
    if (
      running.running_detail.id == null ||
      lat == null ||
      lng == null ||
      status == ''

    ) {
      alertMessage('Wrong data Provide', '#E07C24')
    } else {
      setLodding(true)

      return await fetch(`${Base_url}/agent-campaign-running`, {
        method: 'POST',
        body: JSON.stringify({
          campaign_detail_id: running.running_detail.id,
          status: status,
          latitude: lat,
          longitude: lng,

        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`
        },
      }).then(res => {

        return res.json()
      }).then(async (result) => {
        //  console.log(result ,'dfdsf');
        if (result?.error == true) {
          setLodding(false)
          alertMessage('Wrong data Provide', '#A77B06')
        } else {
          if (result.data.status == 'Completed') {
            setLodding(false)
            setTimeout(() => {

              navigation.navigate('Campaign')
            }, 1000);

          } else {
            setLodding(false)
          }


        }

      }).catch(err => console.log(err));
    }

  }
  const origin1 = {
    latitude: 22.082948,
    longitude: 88.078499,

  }
  const destination2 = {
    latitude: 22.089702,
    longitude: 88.041250,

  }
  
  const intervalRef = useRef();
  const chatngeLoacationStart=()=>{
    intervalRef.current  = setInterval(() => {
             getLocation1()
             console.log("first")
          }, 2000);

  }
  const chatngeLoacationStop=()=>{
    const intervalId = intervalRef.current;
    clearInterval(intervalRef.current);
  }


  useEffect(() => {
    
    getLocation2()
    getList();
  }, [])

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* {startOn()} */}

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
          <Marker.Animated
            ref={markerRef}
            coordinate={coordinate}
          >
            <CustomMarker />
          </Marker.Animated>
          <MapViewDirections
            origin={origin}
            destination={destination1}
            apikey={''} // insert your API Key here
            strokeWidth={6}
            strokeColor="#1b5a90"
            optimizeWaypoints={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 30,
                  left: 30,
                  top: 30,
                },
              });
            }}
          />
        </MapView>
       
        <View style={{
          width: "100%", height: 100,
          justifyContent: 'center',
          paddingLeft: 10,
          backgroundColor: 'transparent'
        }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              width: 140, height: 40, backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Upload Image</Text>
          </TouchableOpacity>
        </View>
        <Count getLocation={getLocation}
        chatngeLoacationStart={chatngeLoacationStart}
        chatngeLoacationStop={chatngeLoacationStop}
        />
      </View>
      <CameraModal
        pickImageLibrary={pickImageLibrary}
        pickCamera={pickCamera}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ImageModal
        save={save}
        listOfSeasons={listOfSeasons}
        deleteSeason={deleteSeason}
        modalVisible1={modalVisible1}
        setModalVisible1={setModalVisible1}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <FlashMessage />
      {lodding && <Loder lodding={lodding} />}
    </>
  )
}

export default RouteMap

const styles = StyleSheet.create({
  startView: {
    width: SCREEN_WIDTH,
    height: 100,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    justifyContent: "center"
  },
  startBottom: {
    width: '70%',
    height: 50,

    backgroundColor: 'green',
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
