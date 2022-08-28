import {
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  BackHandler,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import React,{useRef, useEffect} from 'react';
import {Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const {height, width} = Dimensions.get('screen');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import {Image_url } from '../../Utils/BaseUrl';



const Profile = ({navigation}) => {
  const {user}=useSelector(state=>state.user)
  // console.log(user);
 
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

        // setImage(response);
        console.log(response.uri, response.fileName, response.type);
      }
    });
  };
  const pickImageLibrary= async () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
      }
    });
  };
 const handleBackButton = () => {               
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
   }
   useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButton,
      );
    };
   }, [])
   
  return (
    <>
   
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#ff3259"
          barStyle="default"
          hidden={false}
        />
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: '#ff3259',
          }}>
          <View style={styles.topView}>
            <View style={styles.topViewLeft}>
              <TouchableOpacity onPress={handleBackButton} >
                <AntDesign name="left" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.topViewMiddle}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                Profile
              </Text>
            </View>
            <View style={styles.topViewLeft} />
          </View>
        </View>
        <View
          style={{
            height: height - 250,
            width: width - 50,
            backgroundColor: 'white',
            borderRadius: 20,
            left: 25,

            top: 120,
            alignItems: 'center',
            position: 'absolute',
            zIndex: 10,
          }}>
          <View
            style={{
              width: '100%',
              height: 150,
              paddingBottom: 15,
              justifyContent: 'flex-end',
            }}>
            <Title
              style={{textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>
            {user.user.first_name} {user.user.last_name}
            </Title>
          </View>
          <View style={{width: '100%', paddingHorizontal: 10}}>
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <SimpleLineIcons name="pencil" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditProfile');
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: '#ff3259',
                    }}>
                    Edite Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <FontAwesome name="volume-up" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RouteMap');
                  }}>
                <Text
                  style={{fontSize: 22, fontWeight: 'bold', color: '#ff3259'}}>
                  Compaign History
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* =========Item ========= */}
            <View style={styles.itemView}>
              <View style={styles.itemViewLeft}>
                <LinearGradient
                  colors={['#FFA68D', '#FD3A84']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={styles.CircleShapeView}>
                  <AntDesign name="setting" size={24} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.itemViewRight}>
                <Text
                  style={{fontSize: 22, fontWeight: 'bold', color: '#ff3259'}}>
                  Change Password{}
                </Text>
              </View>
            </View>
            {/* =========Item ========= */}
            {/* =========Item ========= */}
          </View>
        </View>
        <View
          style={{
            height: 150,
            width: 150,
            backgroundColor: 'white',
            borderRadius: 75,

            left: width / 2 - 75,
            top: 65,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 122,
          }}>
          <View
            style={{
              width: 144,
              height: 144,
              borderRadius: 72,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../Images/user2.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 72,
              }}
            />
          </View>
          <TouchableOpacity onPress={()=>{
            bottomSheetRef.current.snapToIndex(2)
          }}>
            <LinearGradient
              colors={['#FFA68D', '#FD3A84']}
              start={{x: 0.0, y: 0.0}}
              end={{x: 0.0, y: 1.0}}
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'green',
                left: 30,
                top: -50,
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 500000,
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <AntDesign name="setting" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
       
        </View>
      </SafeAreaView>
      {/* <BottomSheetView bottomSheetRef={bottomSheetRef}/> */}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  //itemView
  itemViewRight: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  itemViewLeft: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    width: '100%',
    height: 80,
    backgroundColor: '#FCF4F7',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 8,
  },
  //itemView

  //topview
  topView: {
    width: '100%',
    height: 70,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
  },
  topViewLeft: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  topViewMiddle: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topViewLower: {
    width: '100%',
    height: 150,
    backgroundColor: '#ff3259',
  },
  //gradiant
  CircleShapeView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
