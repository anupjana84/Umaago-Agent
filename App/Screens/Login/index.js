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
import React from 'react';
import { TextInput } from 'react-native-paper';
import { Base_url } from '../../Utils/BaseUrl';
import Axios from 'axios'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { alertMessage } from '../../Components/AlertMessage';
const { height } = Dimensions.get('screen');
import { USER_SET } from '../../Actions/ActionType/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loder from '../../Components/Loder';
import { useDispatch } from 'react-redux';



const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [lodding, setLodding] = React.useState(false);

  const singIn = async () => {
    if (
      phone == '' ||
      password == ''

    ) {
      alertMessage('Please Phone No. & Password Provide', '#E07C24')
    } else {
      setLodding(true)

      return await fetch(`${Base_url}/login`, {
        method: 'POST',
        body: JSON.stringify({
          phone_no: phone,
          password
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        // console.log(res,'red');
        return res.json()
      }).then(async (result) => {
        console.log(result, 'dfdsf');
        if (result?.message) {
          setLodding(false)
          alertMessage('Credentials Wrong', '#A77B06')
        } else {
          setPhone('')
          setPassword('')
          Axios.defaults.headers.common['Authorization'] = `Bearer ${result.access_token}`
          // console.log( Axios.defaults.headers,'result');
          // console.log(result);
          await AsyncStorage.setItem('@user', JSON.stringify(result))
          dispatch({
            type: USER_SET,
            payload: {
              data: result
            }
          })
          setLodding(false)
          setTimeout(() => {

            navigation.navigate('Profile')
          }, 1000);
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
          keyboardShouldPersistTaps="handled"

        >
          {/* ==========upper========= */}
          <View style={{
            width: '100%', height: 200,
            alignItems: 'center'
          }}>
            <Image
              source={require('../../Images/homeLogo1.png')}
              style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />


          </View>
          {/* ==========upper========= */}
          {/* ==========Middle========= */}
          <View style={{ width: '100%', height: 250, }}>
            <View style={{ width: "100%", height: '15%' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Log In
              </Text>
            </View>
            <View style={{
              width: "100%", height: 200, justifyContent: 'flex-end',
            }}>
              <View
                style={{ height: 90, width: '100%', paddingHorizontal: 20 }}>
                <TextInput
                  style={styles.inputStyle}
                  label="Enter Phone Number"
                  value={phone}
                  keyboardType="numeric"
                  maxLength={10}
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
                  onChangeText={text => setPhone(text)}

                />
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
                  label="Enter Password"
                  value={password}
                  secureTextEntry={show}
                  onChangeText={text => setPassword(text)}
                  right={

                    <TextInput.Icon
                      onPress={() => setShow(!show)}
                      name={() => <Ionicons name={!show ? "md-eye-outline" : 'md-eye-off-outline'} size={20} color="white" />}
                    />

                  }
                />
              </View>
            </View>

          </View>
          {/* ==========Middle========= */}
          {/* ==========Lower========= */}
          <View style={{
            width: '100%', height: 300,
          }}>


            <TouchableOpacity onPress={() => navigation.navigate('ForGotPassword')}>
              <Text style={{ color: 'white', textAlign: 'right', marginRight: 20 }}>
                Forget Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={singIn}
              style={{
                width: '80%',
                height: 50,
                marginTop:20,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
                backgroundColor: '#ff99ac',
              }}>
              <Text
                style={{ fontSize: 18, fontWeight: '800', color: '#ff3259' }}>
                Login
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
                <Text style={{ color: 'white', fontSize: 14 }}>Don't Have Account,</Text>
              </View>
              <View
                style={{
                  width: '45%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: 8

                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>




          </View>

          {/* ==========Lower========= */}
         
        </ScrollView>
        {lodding && <Loder lodding={lodding} />}


      </SafeAreaView>

    </>
  );
};

export default Login;

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
