import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useColorScheme } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { TextInput, HelperText, Card } from 'react-native-paper';
import CameraModal from '../../Components/CameraModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Base_url } from '../../Utils/BaseUrl';
import { alertMessage } from '../../Components/AlertMessage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Loder from '../../Components/Loder';
import { useDispatch } from 'react-redux';
// import { USER_SET } from '../../Actions/ActionType/User';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const Register = ({ navigation }) => {
  const scheme = useColorScheme();
  const dispatch =useDispatch()
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [truckNo, setTruckNo] = useState('');

  const [division, setDivision] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [areaName, setAreaName] = useState('');
  const [modalVisible, setModalVisible] = useState('');
  const [password, setPassword] = React.useState('');
  const [cPassword, setCPassword] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [show1, setShow1] = React.useState(true);
  const [lodding, setLodding] = React.useState(false);


  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [truckType, setTruckType] = React.useState('1');
  const [image, setImage] = useState(null);
  const [errMessagefn, seterrorMessagefn] = useState('')
  const [errMessageln, seterrorMessageln] = useState('')
  const [errMessagead, seterrorMessagead] = useState('')
  const [errMessageph, seterrorMessageph] = useState('')
  const [errMessagePass, seterrorMessagePass] = useState('')
  const [errMessagePa, seterrorMessagePa] = useState('')
  const [getState, setGetState] = useState([])
  const [city, setCity] = useState([])

  const [district, setDistrict] = useState([])
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
        // console.log(response.assets[0].uri,'pp')
        setImage(response.assets[0]);
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
        console.log(response);
        setImage(response.assets[0]);
      }
    });
  };
  const getdistAndTruck = () => {
    fetch(`${Base_url}/register`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        }
      }
    )
      .then(res => {
        return res.json()
      }).then(result => {
        setGetState(result.states)
        
         console.log(result.states, 'RE')
        // console.log(result, 'RE')
      })
      .catch(err => console.log(err))
  }

  //=========
  const getDistrict = (id) => {
    // console.log(id);
    fetch(`${Base_url}/get-distric/${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        }
      }
    )
      .then(res => {
        return res.json()
      }).then(result => {
       
        setDistrict(result.districs)
        // console.log(result, 'RE')
      })
      .catch(err => console.log(err))

  }
  //=========
  const changeCity = (id) => {
    // console.log(id);
    fetch(`${Base_url}/get-city/${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        }
      }
    )
      .then(res => {
        return res.json()
      }).then(result => {
        setCity(result.cities)
        console.log(result, 'RE')
      })
      .catch(err => console.log(err))

  }
  //=========
  //=========
  const checkname = (name) => {
    let rjx = /^[a-zA-Z\s-, ]+$/;
    if (!rjx.test(name)) {
      seterrorMessagefn('please write name in valid format')
    } else {
      setFName(name)
      seterrorMessagefn('')
    }
  }
  //========
  const checkln = (name) => {
    let rjx = /^[a-zA-Z\s-, ]+$/;
    if (!rjx.test(name)) {
      seterrorMessageln('please write name in valid format')
    } else {
      setLName(name)
      seterrorMessageln('')
    }
  }
  //========
  const checkph = (pin) => {

    if (pin.length < 10) {
      seterrorMessageph('Ph No. must be 10 digits')
    } else {
      setPhone(pin)
      seterrorMessageph('')
    }
  }
  //======== CHECK MATCH
  const checkPassword=(pass)=>{
if (password !== pass) {
  seterrorMessagePass('Password does not match')
}else{
  setCPassword(pass)
  seterrorMessagePass('')
}
  }
  //========
  const checkPasswordlength=(pass)=>{
if (pass.length<6) {
  seterrorMessagePa('Password must be greater than 6 char.')
}else{
  setPassword(pass)
  seterrorMessagePa('')
}
  }
  //========
  const checkad = (pin) => {
    if (pin.length < 16) {
      seterrorMessagead('Aadhaar No. must be 16 digits')
    } else {
      setAadhar(pin)
      seterrorMessagead('')
    }
  }
  //========
  const register =  async () => {
    console.log( fName ,
    phone ,
    password,
    cPassword ,
    aadhar ,
    truckNo ,
    selectedState ,'state',
    selectedDistrict ,
    selectedCity ,
    truckType ,
    division ,
    subDivision ,
    areaName ,);

    if (
      fName == ''||
      lName == '' ||
      phone == '' ||
      password == '' ||
      cPassword == '' ||
      aadhar == '' ||
      truckNo == '' ||
      selectedState == '' ||
      selectedDistrict == '' ||
      selectedCity == '' ||
      truckType == '' ||
      division == '' ||
      subDivision == '' ||
      areaName == '' 

    ) {
      alertMessage('All Field are Required', '#800000')
    } else if (phone.length > 10) {
      alertMessage('Ph No. must be 10 digits', '#E07C24')
    }
    else if (aadhar.length > 16) {
      alertMessage('Aadhaar No. must be 16 digits', '#E07C24')
    } else {
      setLodding(true)
      let formData = new FormData();
      let localUri = image.uri;
      let filename = image.fileName;
      let type = image.type;
      formData.append('document', { uri: localUri, name: filename, type });
      formData.append('first_name', fName);
      formData.append('last_name', lName);
      formData.append('phone_no', phone);
      formData.append('password', password);
      formData.append('password_confirmation', cPassword);
      formData.append('type', "1");
      formData.append('registration_no', truckNo);
      formData.append('aadhar_no', aadhar);
      formData.append('state_id', selectedState);
      formData.append('distric_id', selectedDistrict);
      formData.append('city_id', selectedCity);
      formData.append('area_name_type', areaName);
      formData.append('division', division);
      formData.append('subdivision', subDivision);
      // console.log(formData, 'formData');
      return await  fetch(`${Base_url}/register-agent`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'applicatopn/json',
          'content-type': 'multipart/form-data',
          // Accept  : 'application/json',
          // 'Content-Type' : 'application/json'

        },
      }).then(res => {
        // console.log(res,'red');
        return res.json()
      }).then( async (result) => {
        if (result?.error==true) {
          setLodding(false)
          alertMessage(result.error_messages[0], '#E07C24')
        }else{
          setFName('')
          setLName('')
          setPhone('')
          setPassword('')
          setCPassword('')
          setAadhar('')
          setTruckNo('')
    
          setSelectedState('')
          setSelectedDistrict('')
          setSelectedCity('')
          
          setDivision('')
          setSubDivision('')
          setAreaName('')
          setTruckType('')
          setImage('') 
        // await AsyncStorage.setItem('@user',JSON.stringify(result))
        // dispatch({
        //   type:USER_SET,
        //   payload:{
        //     data:result
        //   }
        // })
        alertMessage('Register Successfull', '#E07C24')
        setLodding(false)
        setTimeout(() => {
          navigation.navigate('Login')
        }, 1000);
       
        // console.log(result, 'rd')
      }
        
      }).catch(err => console.log(err));
    }
  }
  //========
  useEffect(() => {
    // console.log("first")
    getdistAndTruck()
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
      {/* =======Header=========== */}
      <View style={styles.headerview}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddle}>
          {/* <Text style={{ color: 'white', fontSize: 16 }}>Register</Text> */}
          <Text style={{ color: scheme === 'dark' ? 'white' : 'black'}}>Hello World</Text>
        </View>
        <View style={styles.headerLeft} />
      </View>
      <ScrollView nestedScrollEnabled={true}
       keyboardShouldPersistTaps="handled"
      >
        <Card
          style={{
            padding: 20,
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
          }}>
          <TextInput
            style={{...styles.inputStyle}}
            label="First Name"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            placeholderTextColor="#000" 
            activeUnderlineColor="#ff3259"
            onChangeText={text => checkname(text)}
          />
          {errMessagefn ? (<HelperText type="error" >
            {errMessagefn}
          </HelperText>) : (null)}
          <TextInput
            style={styles.inputStyle}
            label="Last Name"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            activeUnderlineColor="#ff3259"
            onChangeText={text => checkln(text)}
          />
          {errMessageln ? (<HelperText type="error" >
            {errMessageln}
          </HelperText>) : (null)}
          <TextInput
            style={styles.inputStyle}
            label="Phone Number"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            maxLength={10}
            keyboardType="numeric"
            activeUnderlineColor="#ff3259"
            onChangeText={text => checkph(text)}
          />
          {errMessageph ? (<HelperText type="error" >
            {errMessageph}
          </HelperText>) : (null)}
         
          <TextInput
            activeUnderlineColor="#ff3259"
            style={[styles.inputStyle]}
            label="Enter Password"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
          
            secureTextEntry={show}
            onChangeText={text => checkPasswordlength(text)}
            right={
              <TextInput.Icon
                onPress={() => setShow(!show)}
                name={() => <Ionicons name={!show ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="black" />}
              />
            }
          />
           {errMessagePa ? (<HelperText type="error" >
            {errMessagePa}
          </HelperText>) : (null)}
          <TextInput
            activeUnderlineColor="#ff3259"
            style={[styles.inputStyle]}
            label="Confirm Password"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            secureTextEntry={show1}
            onChangeText={text => checkPassword(text)}
            right={
              <TextInput.Icon
                onPress={() => setShow1(!show1)}
                name={() => <Ionicons name={!show1 ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="black" />}
              />
            }
          />
           {errMessagePass ? (<HelperText type="error" >
            {errMessagePass}
          </HelperText>) : (null)}
          
          <TextInput
            style={styles.inputStyle}
            label="Aadhaar Number"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            keyboardType="numeric"
            maxLength={16}
            activeUnderlineColor="#ff3259"
            onChangeText={text => checkad(text)}
          />
          {errMessagead ? (<HelperText type="error" >
            {errMessagead}
          </HelperText>) : (null)}
          <TextInput
            style={styles.inputStyle}
            label="Truck No"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={truckNo}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setTruckNo(text)}
          />
          {/* ==========state=========== */}
          <View style={styles.dropDownView}>
            <View style={styles.dropDownViewLeft}>
              <Text style={styles.inputStyle1}>State</Text>
            </View>
            <View style={styles.dropDownViewRight}>
              <View style={styles.pickerBoxInner}>
                <Picker
                  dropdownIconRippleColor={'#FFFFFF'}
                  dropdownIconColor={'#ffffff'}
                  selectedValue={selectedState}
                  style={styles.pickerStyle}
                  placeholder="Select your SIM"
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedState(itemValue)
                    getDistrict(itemValue)
                  }
                  }>
                  {getState.map((item, i) => {
                    return (
                      <Picker.Item key={i} label={item.name} value={item.id} />
                    )
                  })}
                </Picker>
              </View>
              <Entypo
                name="chevron-down"
                size={24}
                color="black"
                style={{ marginTop: '-10%', marginLeft: 315 }}
              />
            </View>
          </View>
          {/* ==========state=========== */}
          {/* ==========District=========== */}
          <View style={styles.dropDownView}>
            <View style={styles.dropDownViewLeft}>
              <Text style={styles.inputStyle1}>District</Text>
            </View>
            <View style={styles.dropDownViewRight}>
              <View style={styles.pickerBoxInner}>
                <Picker
                  dropdownIconRippleColor={'#FFFFFF'}
                  dropdownIconColor={'#ffffff'}
                  selectedValue={selectedDistrict}
                  style={styles.pickerStyle}
                  placeholder="Select your SIM"
                  onValueChange={(itemValue, itemIndex) => {
                    changeCity(itemValue)
                    setSelectedDistrict(itemValue)
                  }
                  }>
                  {district.map((item, i) => {
                    return (
                      <Picker.Item key={i} label={item.name} value={item.id} />
                    )
                  })}
                </Picker>
              </View>
              <Entypo
                name="chevron-down"
                size={24}
                color="black"
                style={{ marginTop: '-10%', marginLeft: 315 }}
              />
            </View>
          </View>
          {/* ========== District =========== */}
          {/* ============ city========= */}
          <View style={styles.dropDownView}>
            <View style={styles.dropDownViewLeft}>
              <Text style={styles.inputStyle1}>City</Text>
            </View>
            <View style={styles.dropDownViewRight}>
              <View style={styles.pickerBoxInner}>
                <Picker
                  dropdownIconRippleColor={'#FFFFFF'}
                  dropdownIconColor={'#ffffff'}
                  selectedValue={selectedCity}
                  style={styles.pickerStyle}
                  placeholder="Select your SIM"
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCity(itemValue)
                  }>
                  {city.map((item, i) => {
                    return (

                      <Picker.Item key={i} label={item.name} value={item.id} />
                    )
                  })}

                </Picker>
              </View>
              <Entypo
                name="chevron-down"
                size={24}
                color="black"
                style={{ marginTop: '-10%', marginLeft: 315 }}
              />
            </View>
          </View>
          {/* ==========City=========== */}
          {/* ==========Division=========== */}

          {/* ==========Division=========== */}

          <TextInput
            style={styles.inputStyle}
            label="Division"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={division}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setDivision(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Subdivision"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={subDivision}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setSubDivision(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Area Name"
            theme={{ colors: { text: "black", accent: "black", primary: "black", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            value={areaName}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setAreaName(text)}
          />
          {/* =========Redio Area======== */}
          <View style={{ width: '100%', height: 120, alignSelf: 'center' }}>
            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: '700' }}>
              Truck Type
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '33.33%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="1"
                  theme={{ paddingLeft: -10 }}
                  color="#ff3259"
                  status={truckType === '1' ? 'checked' : 'unchecked'}
                  onPress={() => setTruckType('1')}
                />
                <Text>Toto</Text>
              </View>
              <View
                style={{
                  width: '33.33%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="2"
                  color="#ff3259"
                  status={truckType === '2' ? 'checked' : 'unchecked'}
                  onPress={() => setTruckType('2')}
                />
                <Text>Truck</Text>
              </View>
              <View
                style={{
                  width: '33.33%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="3"
                  color="#ff3259"
                  status={truckType === '3' ? 'checked' : 'unchecked'}
                  onPress={() => setTruckType('3')}
                />
                <Text>Local</Text>
              </View>
            </View>
          </View>
          {/* =========Redio Area======== */}
          {/* =========Photo Area======== */}
          <View style={{ width: '100%', height: 250, alignSelf: 'center' }}>
            {image ? (
              <>
                <ImageBackground
                  imageStyle={{ borderRadius: 6 }}
                  source={{ uri: image.uri }}
                  style={{
                    width: "100%", height: "100%", resizeMode: 'cover',
                    alignItems: 'flex-end',

                    borderRadius: 5
                  }}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(true);
                  }}>
                    <Entypo name="circle-with-cross" size={24} color="white"
                      style={{ marginRight: 10, marginTop: 15 }} />
                  </TouchableOpacity>
                </ImageBackground>
              </>
            ) : (
              <>
                <Text style={{ fontWeight: '900', fontSize: 16 }}>
                  Upload Document
                </Text>
                <View style={styles.imageUpload}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginTop: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#ff99ac',
                    }}>
                    <Feather name="camera" size={24} color="#ff3259" />
                  </View>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Upload jpg, png, pdf
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true)
                    }}
                    style={{
                      width: '50%',
                      height: 50,
                      borderRadius: 25,
                      marginTop: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#ff3259',
                    }}>
                    <Text
                      style={{ fontWeight: '900', color: 'white', fontSize: 16 }}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          {/* =========Photoa Area======== */}
        </Card>
        <TouchableOpacity
          onPress={() => register()}
          style={styles.nextBottom}>
          <Text style={{ color: '#ff3259', fontSize: 20, fontWeight: 'bold' }}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* =======Header=========== */}
      <CameraModal
        pickImageLibrary={pickImageLibrary}
        pickCamera={pickCamera}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
   
    </SafeAreaView>
   {lodding && <Loder lodding={lodding}/>}  
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerview: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
  },
  headerLeft: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerMiddle: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: { backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0 },
  inputStyle1: { backgroundColor: 'white', fontSize: 18, marginLeft: 0 },
  ///========dropdown
  dropDownView: {
    width: '100%',
    height: 70,
    flexDirection: 'column',
    marginTop: 10,
  },
  dropDownViewLeft: {
    width: '100%',
    height: '50%',
  },
  dropDownViewRight: {
    width: '100%',
    height: '50%',
    borderColor: 'transpatent',
    borderBottomWidth: 1,

    borderBottomColor: '#cbcaca',
  },
  pickerItem: { width: 200, height: 40, borderWidth: 0.5 },
  ///========dropdown
  pickerBoxInner: {
    borderWidth: 0,
    borderColor: 'black',
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  pickerBoxIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 23,
    color: 'red',
  },
  pickerStyle: {
    width: '120%',
    paddingBottom: 0,
    paddingLeft: 0,
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    left: -38,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  //next Bottom
  nextBottom: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2.2,
    borderColor: '#ff3259',
    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  //next Bottom
  //imageUpload
  imageUpload: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  //imageUpload

  //=====
  textFocus: {
    backgroundColor: 'transparent',
    borderColor: '#5d05d5',
  },
});

export default Register;
