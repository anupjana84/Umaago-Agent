import {
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { Base_url } from '../../Utils/BaseUrl';


import Ionicons from 'react-native-vector-icons/Ionicons';
import { alertMessage } from '../../Components/AlertMessage';
const { height } = Dimensions.get('screen');

import Loder from '../../Components/Loder';



const ResetPassword = ({ navigation,route }) => {

  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cpassword, setCPassword] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [show1, setShow1] = React.useState(true);
  const [lodding, setLodding] = React.useState(false);
  const [errMessagePa, seterrorMessagePa] = useState('')
  const [errMessagePass, seterrorMessagePass] = useState('')
  //========
  const checkPasswordlength = (pass) => {
    if (pass.length < 6) {
      seterrorMessagePa('Password must be greater than 6 char.')
    } else {
      setPassword(pass)
      seterrorMessagePa('')
    }
  }
  const checkPassword = (pass) => {
    if (password !== pass) {
      seterrorMessagePass('Password does not match')
    } else {
      setCPassword(pass)
      seterrorMessagePass('')
    }
  }
  const singIn = async () => {
    if (
      password == '' ||
      cpassword == ''

    ) {
      alertMessage('Please enter password ', '#E07C24')
    } else {
      setLodding(true)

      return await fetch(`${Base_url}/resetPassword`, {
        method: 'POST',
        body: JSON.stringify({
          phone_no: route.params.phone,
          new_password:password,
          confirm_password:cpassword
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        // console.log(res,'red');
        return res.json()
      }).then(async (result) => {
        // console.log(result, 'dfdsf');
        if (result?.error==true) {
          setLodding(false)
          alertMessage('Credentials Wrong', '#A77B06')
        } else {
          
          setPassword('')
          setCPassword('')


          setLodding(false)
          navigation.navigate('Login')
          // console.log(result, 'rd')
        }
      }).catch(err => console.log(err));
    }

  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#ff3259"
          barStyle="default"
          hidden={false}
        />
        <ScrollView showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: '100%',
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ff3259',
              }}>
              <Image
                source={require('../../Images/homeLogo1.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
              />
            </View>
            <View
              style={{
                height: height - 350,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Create Password
              </Text>

              <View
                style={{
                  width: '100%',
                  height: '50%',
                  paddingVertical: 30,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{ height: 90, width: '100%', paddingHorizontal: 20 }}>
                  <TextInput
                    theme={{
                      colors: {
                        text: '#ffffff',
                        accent: '#ffffff',
                        primary: '#ffffff',
                        placeholder: '#ffffff',
                        background: 'transparent',
                      },
                    }}
                    underlineColor="#ffffff"
                    underlineColorAndroid="#ffffff"
                    style={[styles.inputStyle, styles.textFocus]}
                    label="Enter Password"
                    secureTextEntry={show}
                    onChangeText={text => checkPasswordlength(text)}
                    right={
                      <TextInput.Icon
                        onPress={() => setShow(!show)}
                        name={() => <Ionicons name={!show ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="white" />}
                      />
                    }
                  />
                  {errMessagePa ? (<HelperText type="error" style={{ color: 'white' }}>
                    {errMessagePa}
                  </HelperText>) : (null)}
                </View>
                <View
                  style={{ height: 90, width: '100%', paddingHorizontal: 20 }}>
                  <TextInput
                    theme={{
                      colors: {
                        text: '#ffffff',
                        accent: '#ffffff',
                        primary: '#ffffff',
                        placeholder: '#ffffff',
                        background: 'transparent',
                      },
                    }}
                    underlineColor="#ffffff"
                    underlineColorAndroid="#ffffff"
                    style={[styles.inputStyle, styles.textFocus]}
                    label="Confirm Password"
                    secureTextEntry={show1}
                    onChangeText={text => checkPassword(text)}
                    right={
                      <TextInput.Icon
                        onPress={() => setShow1(!show1)}
                        name={() => <Ionicons name={!show1 ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="white" />}
                      />
                    }
                  />
                  {errMessagePass ? (<HelperText type="error" style={{ color: 'white' }}>
                    {errMessagePass}
                  </HelperText>) : (null)}
                </View>
                <View
                  style={{
                    height: 50,
                    width: '100%',
                    paddingRight: 20,
                    alignItems: 'flex-end',
                  }}>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                }}>
                <TouchableOpacity
                  onPress={singIn}
                  style={{
                    width: '80%',
                    height: 50,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 25,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: '800', color: '#ff3259' }}>
                    Procced to login
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: '65%',
                    height: 40,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <View
                    style={{
                      width: '55%',
                      height: '100%',
                      justifyContent: 'center',

                      alignItems: 'flex-end'
                    }}>

                  </View>
                  <View
                    style={{
                      width: '45%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: 8

                    }}>

                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {lodding && <Loder lodding={lodding} />}


      </SafeAreaView>

    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#ff3259',
  },
  container1: {
    backgroundColor: '#ff3259',
  },
  textFocus: {
    backgroundColor: 'transparent',
    borderColor: '#5d05d5',
  },
});
