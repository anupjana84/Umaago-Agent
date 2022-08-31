import React, { useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Modal, Title, Portal } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const { width, height } = Dimensions.get('screen');
const ImageModal = ({ 
    setModalVisible1,
    setModalVisible,
    listOfSeasons,
    deleteSeason,
    modalVisible1,
    save }) => {
    

    return (
        <>
            <Portal>
                <Modal
                    visible={modalVisible1}

                    contentContainerStyle={styles.containerStyle}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            width: 250, height: 50, alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity onPress={()=>{
                                setModalVisible1(false)
                                
                            }}>
                            <Entypo name="cross" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={{
                                textAlign: 'center', fontSize: 25,
                                marginRight: 20
                            }}> Upload Images


                            </Text>
                            <TouchableOpacity onPress={()=>{
                                setModalVisible1(false)
                                setModalVisible(true)
                            }}>
                            <Fontisto style={{  }} name="plus-a" size={24} color="black" />
                            </TouchableOpacity>
                            
                        </View>


                        <View style={{
                            height: 250, width: "100%",
                            flexDirection: 'row', flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                            paddingVertical: 10
                        }}>
                            {listOfSeasons &&
                                listOfSeasons.map((item, i) => {
                                    return (
                                        <View
                                            key={i}
                                            style={{
                                                width: '30%', height: 70,
                                                borderRadius: 10,
                                                marginVertical: 8,
                                                borderColor: 'black',
                                                backgroundColor: 'white',
                                                marginLeft: 10
                                            }}>
                                            <ImageBackground
                                                source={{ uri: item.imguri }}
                                                imageStyle={{ borderRadius: 10 }}
                                                style={{ width: '100%', height: '100%' }}
                                                resizeMode="cover">
                                                <TouchableOpacity
                                                    onPress={() => deleteSeason(item.id)}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <MaterialIcons
                                                        name="delete-outline"
                                                        size={24}
                                                        color="red"
                                                    />
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </View>
                                    );
                                })}


                        </View>
                        <TouchableOpacity
                        onPress={()=>{
                            save()
                        }}
                         style={{
                            width: 100, height: 50,
                            alignSelf: 'center',
                            backgroundColor: '#ff3259',
                            borderRadius:25,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <Text style={{fontWeight:'900', color:'white'}}>Upload</Text>
                        </TouchableOpacity>
                    </View>


                </Modal>
            </Portal>
        </>
    );
};

export default ImageModal;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        width: width - 50,
        height: 400,
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 999,
        top: height / 2 - 175,
        position: 'absolute',
    },

});
