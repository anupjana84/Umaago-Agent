import {
  StyleSheet, Text,
  TouchableOpacity, ScrollView, Image, View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, TextInput, ActivityIndicator, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { getAllCampaignHistory } from '../../Actions/CampaignHistory'
import { connect, useSelector } from 'react-redux';

const Running = ({ getAllCampaignHistory }) => {
  const [loding, setLoding] = useState(false)
  const  CampaignHistory  = useSelector((state) => state.CampaignHistory)
  // console.log(CampaignHistory.running,'run')


  useEffect(() => {
    getAllCampaignHistory(setLoding)
  }, [])

  const navigation = useNavigation()
  return (
    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      <View style={{ flex: 1 }}>

        <Card
          style={{
            padding: 20,
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
          }}>
          {loding ? (<View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={80} color={'#ff3259'} />
          </View>) : (
          <>
            {CampaignHistory.running==null ? (
               <Text> No Data Found</Text>
            

          ) : (
           
            <>
            <Title>Samsung</Title>
           
            <View style={styles.itemView}>
              <Text>Serveice Type</Text>
              <Text>Banner</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '900', marginVertical: 8 }}>Image</Text>
          {/* ===========ItemView========= */}
          {/* ===========Image View========= */}
          <View style={styles.imageView}>
            <View style={styles.imageViewLeft}>
              <Image source={require('../../Images/mobile.jpg')}
                style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 6 }} />
            </View>
            <View style={styles.imageViewRight}>
              <Image source={require('../../Images/mobile.jpg')}
                style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 6 }} />
            </View>
          </View>
            </>
            )}
          </>

          )} 






         
          {/* ===========Image View========= */}


        </Card>

        <TouchableOpacity
          onPress={() => alert('Submit Successfull')}
          style={styles.nextBottom}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
            Start Campaign
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default connect(null, { getAllCampaignHistory })(Running);

const styles = StyleSheet.create({
  //Image View
  imageView: {
    width: '100%', height: 100, flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageViewLeft: {
    width: '48%',
    height: '100%',

    borderRadius: 8,
    padding: 2

  },
  imageViewRight: {
    width: '48%',
    height: '100%',
    borderRadius: 8,
    padding: 2
  },
  //Image View
  itemView: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  //next Bottom
  nextBottom: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#ff3259',
    borderRadius: 25,

    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
  //next Bottom
});
