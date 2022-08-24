import React, {useState} from 'react';
import {
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {RadioButton} from 'react-native-paper';
import { TextInput, Card} from 'react-native-paper';


const EditProfile = ({navigation}) => {

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [truckNo, setTruckNo] = useState('');
  const [state, setStater] = useState('');
  const [division, setDivision] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [areaName, setAreaName] = useState('');

  const [buttonBorder, setButtonBorder] = useState('circuits');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [checked, setChecked] = React.useState('first');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#ff3259"
        barStyle="default"
        hidden={false}
      />
      {/* =======Header=========== */}
      <View style={styles.headerview}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddle}>
          <Text style={{color: 'white', fontSize: 16}}>Edit Profile</Text>
        </View>
        <View style={styles.headerLeft} />
      </View>

      <ScrollView nestedScrollEnabled={true}>
        <Card
          style={{
            padding: 20,
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
          }}>
          <TextInput
            style={styles.inputStyle}
            label="First Name"
            value={fName}
            activeUnderlineColor="black"
            onChangeText={text => setFName(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Last Name"
            value={lName}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setLName(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Phone Number"
            value={phone}
            maxLength={10}
            keyboardType="numeric"
            activeUnderlineColor="#ff3259"
            onChangeText={text => setPhone(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Aadhaar Number"
            value={aadhar}
            keyboardType="numeric"
            maxLength={16}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setAadhar(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Truck No"
            value={truckNo}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setTruckNo(text)}
          />
          {/* ==========state=========== */}
          <View style={styles.dropDownView}>
            <View style={styles.dropDownViewLeft}>
              <Text style={styles.inputStyle1}>State</Text>
            </View>
            <View style={styles.dropDownViewRight}>
              <View style={styles.pickerBoxInner}>
                <Picker
                  dropdownIconRippleColor={'#FFFFFF'}
                  dropdownIconColor={'#ffffff'}
                  selectedValue={selectedLanguage}
                  style={styles.pickerStyle}
                  placeholder="Select your SIM"
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="All " value="key4" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                </Picker>
              </View>
              <Entypo
                name="chevron-down"
                size={24}
                color="black"
                style={{marginTop: '-10%', marginLeft: 315}}
              />
            </View>
          </View>
          {/* ==========state=========== */}
          {/* ==========District=========== */}
          <View style={styles.dropDownView}>
            <View style={styles.dropDownViewLeft}>
              <Text style={styles.inputStyle1}>District</Text>
            </View>
            <View style={styles.dropDownViewRight}>
              <View style={styles.pickerBoxInner}>
                <Picker
                  dropdownIconRippleColor={'#FFFFFF'}
                  dropdownIconColor={'#ffffff'}
                  selectedValue={selectedLanguage}
                  style={styles.pickerStyle}
                  placeholder="Select your SIM"
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="All " value="key4" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                </Picker>
              </View>
              <Entypo
                name="chevron-down"
                size={24}
                color="black"
                style={{marginTop: '-10%', marginLeft: 315}}
              />
            </View>
          </View>
          {/* ========== District =========== */}
          {/* ============ city========= */}
          <View style={styles.dropDownView}>
            <View style={styles.dropDownViewLeft}>
              <Text style={styles.inputStyle1}>City</Text>
            </View>
            <View style={styles.dropDownViewRight}>
              <View style={styles.pickerBoxInner}>
                <Picker
                  dropdownIconRippleColor={'#FFFFFF'}
                  dropdownIconColor={'#ffffff'}
                  selectedValue={selectedLanguage}
                  style={styles.pickerStyle}
                  placeholder="Select your SIM"
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="All " value="key4" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                </Picker>
              </View>
              <Entypo
                name="chevron-down"
                size={24}
                color="black"
                style={{marginTop: '-10%', marginLeft: 315}}
              />
            </View>
          </View>
          {/* ==========City=========== */}
          {/* ==========Division=========== */}

          {/* ==========Division=========== */}

          <TextInput
            style={styles.inputStyle}
            label="Division"
            value={division}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setDivision(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Subdivision"
            value={subDivision}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setSubDivision(text)}
          />
          <TextInput
            style={styles.inputStyle}
            label="Area Name"
            value={areaName}
            activeUnderlineColor="#ff3259"
            onChangeText={text => setAreaName(text)}
          />
          {/* =========Redio Area======== */}
          <View style={{width: '100%', height: 120, alignSelf: 'center'}}>
            <Text style={{marginTop: 20, fontSize: 18, fontWeight: '700'}}>
              Truck Type
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="first"
                  theme={{paddingLeft: -10}}
                  color="#ff3259"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text>Toto</Text>
              </View>
              <View
                style={{
                  width: '70%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="second"
                  color="#ff3259"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
                <Text>Truck</Text>
              </View>
            </View>
          </View>
          {/* =========Redio Area======== */}
          {/* =========Photo Area======== */}
          <View style={{width: '100%', height: 250, alignSelf: 'center'}}>
            <Text style={{fontWeight: '900', fontSize: 16}}>
              Upload Document
            </Text>
            <View style={styles.imageUpload}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#ff99ac',
                }}
              >
                 <Feather name="camera" size={24} color="#ff3259" />
                </View>
                <Text style={{fontWeight: '400', fontSize: 16,textAlign:'center'}}>
              Upload jpg, png, pdf
            </Text>
              <View
                style={{
                  width: '50%',
                  height: 50,
                  borderRadius: 25,
                  marginTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#ff3259',
                }}
              >

                <Text style={{fontWeight: '900',color:'white', fontSize: 16}}>
              Upload 
            </Text>
            </View>
            </View>
          </View>
          {/* =========Photoa Area======== */}
        </Card>
        <TouchableOpacity
          onPress={() => alert('Submit Successfull')}
          style={styles.nextBottom}>
          <Text style={{color: '#ff3259', fontSize: 20, fontWeight: 'bold'}}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* =======Header=========== */}
    </SafeAreaView>
  );
};



export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerview: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff3259',
    flexDirection: 'row',
  },
  headerLeft: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerMiddle: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0},
  inputStyle1: {backgroundColor: 'white', fontSize: 18, marginLeft: 0},
  ///========dropdown
  dropDownView: {
    width: '100%',
    height: 70,
    flexDirection: 'column',
    marginTop: 10,
  },
  dropDownViewLeft: {
    width: '100%',
    height: '50%',
  },
  dropDownViewRight: {
    width: '100%',
    height: '50%',
    borderColor: 'transpatent',
    borderBottomWidth: 1,

    borderBottomColor: '#cbcaca',
  },
  pickerItem: {width: 200, height: 40, borderWidth: 0.5},
  ///========dropdown
  pickerBoxInner: {
    borderWidth: 0,
    borderColor: 'black',
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  pickerBoxIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 23,
    color: 'red',
  },
  pickerStyle: {
    width: '120%',
    paddingBottom: 0,
    paddingLeft: 0,
    transform: [{scaleX: 0.85}, {scaleY: 0.85}],
    left: -38,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  //next Bottom
  nextBottom: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2.2,
    borderColor: '#ff3259',
    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  //next Bottom
  //imageUpload
  imageUpload: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  //imageUpload
});
