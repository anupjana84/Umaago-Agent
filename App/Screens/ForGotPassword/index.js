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
  import { TextInput, } from 'react-native-paper';
  import AntDesign from 'react-native-vector-icons/AntDesign';

  import Entypo from 'react-native-vector-icons/Entypo';
  const {height} = Dimensions.get('screen');
  const ForGotPassword = ({navigation}) => {
    const [fName, setFName] = React.useState('');
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor="#ff3259"
            barStyle="default"
            hidden={false}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
            <View
          style={{
            width: '100%',
            height: 70,
            backgroundColor: '#ff3259',
          }}>
          <View style={styles.topView}>
            <View style={styles.topViewLeft}>
              <TouchableOpacity onPress={()=>navigation.goBack()} >
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
                  width: '100%',
                  height: 250,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ff3259',
                }}>
                <Image
                  source={require('../../Images/homeLogo1.png')}
                  style={{width: 200, height: 200, resizeMode: 'contain'}}
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
                    style={{height: 50, width: '100%', paddingHorizontal: 20}}>
                    <TextInput
                      style={styles.inputStyle}
                      label="Enter Phone Number"
                      value={fName}
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
                      onChangeText={text => setFName(text)}
                     
                    />
                  </View>
                  
                
                </View>
                <View
                  style={{
                    width: '100%',
                    height: '50%',
                  }}>
                  <TouchableOpacity
                    onPress={() => alert('Successfull')}
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
                  </TouchableOpacity>
                 
                </View>
              </View>
            </View>
          </ScrollView>
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
  