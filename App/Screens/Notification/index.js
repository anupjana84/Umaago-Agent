import {
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import Axios from 'axios'
import React, { useState, useEffect } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { Base_url } from '../../Utils/BaseUrl';
import moment from 'moment';

const { height, width } = Dimensions.get('screen');
// console.log(width);
const Notification = ({ navigation }) => {
  const [lodding, setLoding] = React.useState(false);
  const [nitiFications, setNitiFications] = React.useState([]);
  const getNotification = () => {
    setLoding(true)
    Axios.get(`${Base_url}/notifications`)
      .then(response => {
        // console.log(response.data)
        if (response.data) {
          console.log(response.data.notification[0]);
          setLoding(false)
        }
        setNitiFications(response.data.notification)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getNotification()
  }, [])
const randerItem=({item})=>{
  return (
    <View style={styles.itemView}>
      <View
        style={{ width: '80%', height: '100%', justifyContent: 'center' }}>
        <Text>{item.message}</Text>
      </View>
      <View
        style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
        <Text>{moment(item.updated_at).fromNow()}</Text>
      </View>
    </View>

  )
}
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBar
            animated={true}
            backgroundColor="#ff3259"
            barStyle="default"
            hidden={false}
          />
          {/* ======top======== */}
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: '#ff3259',
            }}>
            <View style={styles.topView}>
              <View style={styles.topViewLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.topViewMiddle}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                  Notification
                </Text>
              </View>
              <View style={styles.topViewLeft} />
            </View>
          </View>
          {/* ======top======== */}

          <View style={styles.topView1}>
            <Text style={{ color: '#ff3259', fontSize: 20, fontWeight: '900' }}>
              Mark all as read
            </Text>

            <Text style={{ color: '#ff3259', fontSize: 20, fontWeight: '900' }}>
              clear all
            </Text>
          </View>
          {/* ======top======== */}
          {/* ======Item======== */}

          {/* ======Item======== */}
          {lodding ? (
            <ActivityIndicator size={80} color={'#ff3259'} />) : (
            <>
              <FlatList
                data={nitiFications}
                keyExtractor={(item, i) => i.toString()}
                  renderItem={(item, i) => randerItem(item)}
                  ListEmptyComponent={() => (
                    <View style={{width:'100%', height:500,
                    justifyContent:'center',alignItems:'center'}}>
                      <Text>No Data found</Text>
                    </View>
                  )}
                
              />
              </>
          )}

        </View>
      </SafeAreaView>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  //itemView
  itemViewRight: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  itemViewLeft: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    width: '94%',
    height: 80,
    backgroundColor: '#FCF4F7',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 8,
    alignSelf: 'center',
    borderLeftWidth: 7,
    borderLeftColor: '#ff3259',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  //itemView

  //topview
  topView1: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  topView: {
    width: '100%',
    height: 60,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
    alignItems: 'center',
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
