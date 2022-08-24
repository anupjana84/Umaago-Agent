import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Upcoming from '../../Components/Upcoming';
const {width} = Dimensions.get('screen');
import Running from '../../Components/Running';
import Completed from '../../Components/Completed';
const Tab = createMaterialTopTabNavigator();

const Campaign = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          animated={true}
          backgroundColor="#ff3259"
          barStyle="default"
          hidden={false}
        />
        {/* ============Profile View=========  */}
        <View style={styles.profileView}>
          <TouchableOpacity style={styles.rightProfile}
          onPress={()=>navigation.navigate('Profile')}
          >
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: 'red',
                  borderRadius: 22.5,
                }}>
                <Image
                  source={require('../../Images/car.jpg')}
                  style={{
                    width: '100%',
                    borderRadius: 50,
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </TouchableOpacity >
          <TouchableOpacity   style={styles.middleProfile}>
            <Image
              source={require('../../Images/homeLogo1.png')}
              style={{
                width: '80%',
                height: '70%',
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Notification')} style={styles.rightProfile} >
          <Ionicons name="notifications-outline" size={36} color="white" />
        </TouchableOpacity>
        </View>
        {/* ============Profile View========= */}
        <Tab.Navigator
          tabBarPosition="top"
          // backBehavior="none"
          initialRouteName={Running}
          // removeClippedSubviews={false}
          // animationEnabled={true}

          upperCaseLabel="false"
          screenOptions={{
            tabBarActiveTintColor: 'white',
            activeTintColor: 'white',
            tabBarLabelStyle: {fontSize: 12},
            tabBarStyle: {backgroundColor: '#ff3259'},

            tabBarInactiveTintColor: 'white',
            indicatorStyle: {backgroundColor: 'red'},
            tabBarActiveBackgroundColor: '#ff3259',
            tabBarLabelStyle: {
              fontSize: 15,
              fontWeight: '600',
              borderBottomColor: 'green',
            },
            tabBarIndicatorStyle: {
              borderBottomColor: 'white',
            },
            indicatorColor: {
              backgroundColor: 'red',
            },
            indicatorStyle: {
              borderBottomColor: 'green',
              borderBottomWidth: 12,
              borderColor: 'green',
            },
          }}>
          <Tab.Screen
            name="Running"
            component={Running}
            options={{
              tabBarLabel: 'Running',
              labelStyle: {textTransform: 'none'},
              tabBarActiveBackgroundColor: 'green',
              style: {
                backgroundColor: '#21147a',
              },
            }}
          />
          <Tab.Screen
            name="Upcoming"
            component={Upcoming}
            options={{
              tabBarLabel: 'Upcoming',
              labelStyle: {textTransform: 'none'},
            }}
          />
          <Tab.Screen
            name="Completed"
            component={Completed}
            options={{
              tabBarLabel: 'Completed',
              labelStyle: {textTransform: 'none'},
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};
export default Campaign;
const styles = StyleSheet.create({
  profileView: {
    width: '100%',
    height: 80,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
  },
  leftProfile: {
    width: '25%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  middleProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  rightProfile: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
