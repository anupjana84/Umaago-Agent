
import {
  StyleSheet, Text,
  TouchableOpacity, ScrollView, FlatList, View
} from 'react-native';
import React from 'react';
import { Card, Title, } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Completed = () => {
  const CampaignHistory = useSelector((state) => state.CampaignHistory)
  // console.log(CampaignHistory.completed,'CampaignHistory');
  // console.log(CampaignHistory.upcomming,'completed');

  // console.log(CampaignHistory.upcomming, 'running');

  return (
   
      <View >
        <FlatList
          data={CampaignHistory.completed}
          renderItem={({ item, id }) => {
            // console.log(item);
            return (
              <Card
                style={{
                  padding: 20,
                  marginHorizontal:15,
                  marginVertical:7,
                  backgroundColor: 'white',
                  borderRadius: 20,
                }}>
                <Title>Campaign {item.campaign_type_id} </Title>
                <View style={styles.itemView}>
                  <Text>Campaign Type </Text>
                  <Text>{item.type.name}</Text>
                </View>
                <View style={styles.itemView}>
                  <Text>Start Date </Text>
                  <Text>{moment(item.from_date).format("DD MMM")}</Text>
                </View>
                <View style={styles.itemView}>
                  <Text>End Date </Text>
                  <Text>{moment(item.to_date).format("DD MMM")}</Text>
                </View>
              </Card>
            );
          }}

          keyExtractor={(item, i) => i.toString()}

        />


        {/* <TouchableOpacity
          onPress={() => alert('Submit Successfull')}
          style={styles.nextBottom}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
           Start Campaign
          </Text>
        </TouchableOpacity> */}
      </View>
   
  );
};

export default Completed;

const styles = StyleSheet.create({
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
