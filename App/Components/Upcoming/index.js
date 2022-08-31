import {
  StyleSheet, Text,
  FlatList, View,
  Dimensions
} from 'react-native';
import React from 'react';
import { Card, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
const {height} =Dimensions.get('screen')
const Upcoming = () => {
  const CampaignHistory = useSelector((state) => state.CampaignHistory)
  // console.log(CampaignHistory.completed,'CampaignHistory');
 

  return (
   
      <View >
        <FlatList
          data={CampaignHistory.upcomming}
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
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Title>No Data found</Title>
            </View>
          )}
        />


       
      </View>
   
  );
};

export default Upcoming;

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
  },
  emptyContainer: {
    height: height-150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  //next Bottom
});
