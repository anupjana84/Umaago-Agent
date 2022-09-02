import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native';
import { alertMessage } from '../../Components/AlertMessage';
import Loder from '../../Components/Loder';
import { Base_url } from '../../Utils/BaseUrl';


const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const OtpReceive = ({navigation,route}) => {
  // console.log(route);
  const OTP = [];
  const ref_input = [];
  ref_input[0] = useRef();
  ref_input[1] = useRef();
  ref_input[2] = useRef();
  ref_input[3] = useRef();
  ref_input[4] = useRef();
  ref_input[5] = useRef();
  
  const [pin1, pinSet1] = useState('');
  const [pin2, pinSet2] = useState('');
  const [pin3, pinSet3] = useState('');
  const [pin4, pinSet4] = useState('');
  const [pin5, pinSet5] = useState('');
  const [pin6, pinSet6] = useState('');
 
 
  const [back1, setBack1] = useState(true);
  const [back2, setBack2] = useState(true);
  const [back3, setBack3] = useState(true);
  const [back4, setBack4] = useState(true);
  const [back5, setBack5] = useState(true);
  const [back6, setBack6] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lodding, setLodding] = useState(false);
 

  const focusNext = (text, index) => {
    if (index < ref_input.length - 1 && text) {
      ref_input[index + 1].current.focus();
    }
    if (index == ref_input.length - 1) {
      ref_input[index].current.blur();
    }
    OTP[index] = text;
  };
  const focusPrev = (key, index) => {
    if (key === 'Backspace' && index !== 0) {
      ref_input[index - 1].current.focus();
    }
  };

  const save =  (otp) => {

    if (
      otp == ''
    ) {
      alertMessage('Enter Phone No', '#E07C24')
    } else {
      setLodding(true)

      fetch(`${Base_url}/verifyCode`, {
        method: 'POST',
        body: JSON.stringify({
          phone_no: route.params.phone,
          otp:otp


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
          alertMessage('Otp Invalid', '#A77B06')
          pinSet1('');
          pinSet2('');
          pinSet3('');
          pinSet4('');
          pinSet5('');
          pinSet6('');
          setBack1(true);
          setBack2(true);
          setBack3(true);
          setBack4(true);
          setBack5(true);
          setBack6(true);
         
        } else {
          setLodding(false)
         
        
          navigation.navigate('ResetPassword',{phone:route.params.phone})
      
          
          // setPhone('')
         
        }

      }).catch(err => console.log(err));
    }

  }
 
 
  const adddd = () => {
    let otp = pin1 + pin2 + pin3 + pin4+ pin5+pin6;
    if (otp.length == 6) {
      save(otp);
       console.log(otp);
    }
  };
  useEffect(() => {
 
  });
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#ff3259" barStyle="light-content" />
        

        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={80} color={'#ffab39'} />
          </View>
        ) : (
          <View>
            <View style={{...styles.top,}}>
            <Image
                  source={require('../../Images/homeLogo1.png')}
                  style={{width: 200, height: 200, resizeMode: 'contain'}}
                />
             
            </View>
            <View style={{width:"100%", height:"25%",
          justifyContent:'center'}}>
            <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 38,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                 Verify Code
                </Text>
            <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'white',
                    
                    marginTop:20
                  }}>
                   Please enter the code we sent {route.params.phone}
                </Text>
  
            </View>

            <View style={{...styles.center,}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                }}>
                <TextInput
                  mode="flat"
                  selectionColor={{}}
                  underlineColorAndroid="transparent"
                  textAlign="center"
                  maxLength={1}
                  keyboardType="numeric"
                  value={pin1}
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: back1 ? '#ffeacf' : '#ff9201',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  autoFocus={true}
                  returnKeyType="next"
                  ref={ref_input[0]}
                  onChangeText={text => {
                    pinSet1(text);
                    focusNext(text, 0);
                    if (pin1 === '') {
                      setBack1(false);
                    }
                    if (pin1 !== '') {
                      setBack1(true);
                    }
                  }}
                  onKeyPress={e => focusPrev(e.nativeEvent.key, 0)}
                />
                <TextInput
                  mode="flat"
                  selectionColor={{}}
                  underlineColorAndroid="transparent"
                  textAlign="center"
                  maxLength={1}
                  keyboardType="numeric"
                  value={pin2}
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: back2 ? '#ffeacf' : '#ff9201',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  ref={ref_input[1]}
                  onChangeText={text => {
                    pinSet2(text);
                    focusNext(text, 1);
                    if (pin2 === '') {
                      setBack2(false);
                    }
                    if (pin2 !== '') {
                      setBack2(true);
                    }
                  }}
                  onKeyPress={e => focusPrev(e.nativeEvent.key, 1)}
                />
                <TextInput
                  mode="flat"
                  selectionColor={{}}
                  underlineColorAndroid="transparent"
                  textAlign="center"
                  maxLength={1}
                  keyboardType="numeric"
                  value={pin3}
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: back3 ? '#ffeacf' : '#ff9201',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  ref={ref_input[2]}
                  onChangeText={text => {
                    pinSet3(text);
                    focusNext(text, 2);
                    if (pin3 === '') {
                      setBack3(false);
                    }
                    if (pin3 !== '') {
                      setBack3(true);
                    }
                  }}
                  onKeyPress={e => focusPrev(e.nativeEvent.key, 2)}
                />
                <TextInput
                  mode="flat"
                  selectionColor={{}}
                  underlineColorAndroid="transparent"
                  textAlign="center"
                  maxLength={1}
                  keyboardType="numeric"
                  value={pin4}
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: back4 ? '#ffeacf' : '#ff9201',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  ref={ref_input[3]}
                  onChangeText={text => {
                    pinSet4(text);
                    focusNext(text, 3);
                    if (pin4 === '') {
                      setBack4(false);
                    }
                    if (pin4 !== '') {
                      setBack4(true);
                    }
                  }}
                 
                  onKeyPress={e => focusPrev(e.nativeEvent.key, 3)}
                />
                <TextInput
                  mode="flat"
                  selectionColor={{}}
                  underlineColorAndroid="transparent"
                  textAlign="center"
                  maxLength={1}
                  keyboardType="numeric"
                  value={pin5}
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: back5 ? '#ffeacf' : '#ff9201',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  ref={ref_input[4]}
                  onChangeText={text => {
                    pinSet5(text);
                    focusNext(text, 4);
                    if (pin5 === '') {
                      setBack5(false);
                    }
                    if (pin5 !== '') {
                      setBack5(true);
                    }
                  }}
                  
                  onKeyPress={e => focusPrev(e.nativeEvent.key, 4)}
                />
                <TextInput
                  mode="flat"
                  selectionColor={{}}
                  underlineColorAndroid="transparent"
                  textAlign="center"
                  maxLength={1}
                  keyboardType="numeric"
                  value={pin6}
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: back6 ? '#ffeacf' : '#ff9201',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  ref={ref_input[5]}
                  onChangeText={text => {
                    pinSet6(text);
                    focusNext(text, 5);
                    if (pin6 === '') {
                      setBack6(false);
                    }
                    if (pin6 !== '') {
                      setBack6(true);
                    }
                  }}
                  onBlur={adddd}
                  onKeyPress={e => focusPrev(e.nativeEvent.key, 5)}
                />
                {/* <TextInput
                  maxLength={0}
                  keyboardType="numeric"
                  ref={ref_input[4]}
                  onFocus={adddd}
                  onSubmitEditing={Keyboard.dismiss}
                /> */}
              </View>
            </View>

            <View style={styles.bottom}>
            <View
                    
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
                      style={{fontSize: 18, fontWeight: '600', color: '#ff3259'}}>
                      Next
                    </Text>
                  </View>
            </View>
          </View>
        )}
         {lodding && <Loder lodding={lodding} />}
      </View>
     

    </>
  );
};
export default OtpReceive;
const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#ff3259',
  },
  top: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  center: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
 
  bottom: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
});
