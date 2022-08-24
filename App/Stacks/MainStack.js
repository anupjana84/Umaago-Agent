import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

const Stack = createNativeStackNavigator();
import Login from '../Screens/Login'
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import Top from '../Screens/Top';
import ForGotPassword from '../Screens/ForGotPassword';
import Campaign from '../Screens/Campaign';
import Profile from '../Screens/Profile';
import Notification from '../Screens/Notification';
import EditProfile from '../Screens/EditProfile';

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Top"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Top" component={Top} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
   
        <Stack.Screen name="Campaign" component={Campaign} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForGotPassword" component={ForGotPassword} />
        <Stack.Screen name="Register" component={Register} />
      
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
