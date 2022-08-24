import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Modal, Title, Portal} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
const CameraModal = ({setModalVisible, modalVisible,pickCamera,pickImageLibrary}) => {
  useEffect(() => {}, []);

  return (
    <>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.containerStyle}>
          <View style={{flex: 1}}>
            <Title style={{textAlign:'center', fontSize:25}}> Upload From</Title>
            <TouchableOpacity
            onPress={()=>{
              pickCamera()
              setModalVisible(false)
            }}
              style={{
                width: 200,
                height: 50,
                backgroundColor: '#ff3259',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                borderRadius: 25,
              }}>
              <Title style={{color: 'white'}}>Camera</Title>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>{
              pickImageLibrary()
              setModalVisible(false)
            }}
              style={{
                width: 200,
                height: 50,
                backgroundColor: '#ff3259',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                borderRadius: 25,
              }}>
              <Title style={{color: 'white'}}>Gallery</Title>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: width - 50,
    height: 300,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 999,
    top: height / 2 - 175,
    position: 'absolute',
  },
  container1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

    zIndex: 998,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    zIndex: 10,
    opacity: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
