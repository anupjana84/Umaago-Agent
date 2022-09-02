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
import { TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Base_url } from '../../Utils/BaseUrl';



import { alertMessage } from '../../Components/AlertMessage';
import Loder from '../../Components/Loder';

const { height } = Dimensions.get('screen');


const ForGotPassword = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [lodding, setLodding] = useState(false);

  const save =  () => {

    if (
      phone == ''
    ) {
      alertMessage('Enter Phone No', '#E07C24')
    } else {
      setLodding(true)

      fetch(`${Base_url}/forgotPassword`, {
        method: 'POST',
        body: JSON.stringify({
          phone_no: phone,

        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        // console.log(res,'red');
        return res.json()
      }).then((result) => {
        // console.log(result, 'dfdsf');
        if (result.error==true) {
          setLodding(false)
          alertMessage('Phone No. Invalid', '#A77B06')
        } else {
          setLodding(false)
          navigation.navigate('OtpReceive',{phone})
          setPhone('')
         
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
          keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: '100%',
                height: 70,
                backgroundColor: '#ff3259',
              }}>
              <View style={styles.topView}>
                <View style={styles.topViewLeft}>
                  <TouchableOpacity onPress={() => navigation.goBack()} >
                    <AntDesign name="left" size={24} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.topViewMiddle}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                    Profile
                  </Text>
                </View>
                <View style={styles.topViewLeft} />
              </View>
            </View>

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
                  fontSize: 38,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Forget Password
              </Text>

              <View
                style={{
                  width: '100%',
                  height: '50%',
                  paddingVertical: 30,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{ height: 50, width: '100%', paddingHorizontal: 20 }}>
                  <TextInput
                    style={styles.inputStyle}
                    label="Enter Phone Number"
                    value={phone}
                    maxLength={10}
                    keyboardType='numeric'
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


              </View>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                }}>
                <TouchableOpacity
                  onPress={() => save()}
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
                    style={{ fontSize: 18, fontWeight: '600', color: '#ff3259' }}>
                    Next
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </ScrollView>
        {lodding && <Loder lodding={lodding} />}

        
      </SafeAreaView>

    </>
  );
};

export default ForGotPassword;

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
  //topview
  topView: {
    width: '100%',
    height: 50,
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
});
