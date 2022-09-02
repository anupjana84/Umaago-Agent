import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
} from 'react-native';
import React from 'react';


const Home = ({navigation}) => {
  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../Images/car1.png')}
        style={styles.container}>
        <TouchableOpacity
        onPress={()=>{navigation.navigate('Login')}} style={styles.bottom}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
          Log in
          </Text>
        </TouchableOpacity>
       
       
       
        <TouchableOpacity
         onPress={()=>{navigation.navigate('Register')}} style={{...styles.regiterBottom, marginTop:20}}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
         Register
          </Text>
        </TouchableOpacity>
      </ImageBackground>
     
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    resizeMode: 'cover',
    paddingBottom: 100,
  },
  bottom: {
    width: 300,
    height: 50,
    backgroundColor: '#ff3259',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom:20
  },
  regiterBottom: {
    width: 300,
    height: 50,
    borderWidth:1.5,
    borderColor:"white",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
