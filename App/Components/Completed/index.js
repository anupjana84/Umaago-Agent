
import {
  StyleSheet, Text,
  FlatList, View,
  TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { Card, Title, } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Completed = () => {
  const { completed } = useSelector((state) => state.CampaignHistory)
console.log(completed)
  const [cardHeight, sertCardHeight] = useState(null)


  const randerItem = ({ item, index }) => {
console.log(item.details.photos);
    return (
      <Card
        style={{
          padding: 20,
          marginHorizontal: 15,
          marginVertical: 7,
          backgroundColor: 'white',
          borderRadius: 20,
          height: cardHeight == index ? 500 : null
        }}>
        <TouchableOpacity
          onPress={() => {
            sertCardHeight(index)
          }} style={{ width: "100%", height: 30, alignItems: 'flex-end' }}>
          <MaterialIcons name={cardHeight == index ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={24} color="black" />
        </TouchableOpacity>
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
  }
  return (

    <View >
      <FlatList
        data={completed}
        renderItem={(item, i) => randerItem(item)

        }

        keyExtractor={(item, i) => i.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Title>No Data found</Title>
          </View>
        )}
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
  },
  emptyContainer: {
    width: '100%',
    height: 500,

    justifyContent: 'center',
    alignItems: 'center',
  },
  //next Bottom
});
