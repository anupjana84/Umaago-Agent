import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';

import React from 'react'

import {ProgressDialog} from 'react-native-simple-dialogs';
const {height} = Dimensions.get('screen');
const Loder = ({lodding}) => {
  return (
    <>
    
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
      }}>
   
    <ProgressDialog
    visible={lodding}
    message="Please, wait..."
    titleStyle={{color: 'red', textAlign: 'center'}}
    messageStyle={{color: 'green', textAlign: 'center'}}
    contentStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width:'100%',
      height:'100%'
    }}
    dialogStyle={{
      borderRadius: 10,
      width: '70%',
      height: 70,
      justifyContent: 'center',
      alignSelf:'center'
    }}
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    overlayStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }}
  />
  
  </View>
  </>
  )
}

export default Loder

const styles = StyleSheet.create({})