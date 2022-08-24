import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import MainStack from './App/Stacks/MainStack';
import { Provider } from 'react-redux';
import store from './App/Store/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';





const App = () => {
  const setAuthToken = async () => {
    const isRegister = await AsyncStorage.getItem('@user');
    const data = isRegister != null ? JSON.parse(isRegister) : null;
    // const user = JSON.parse(await AsyncStorage.getItem('@user'));
    // const token =user.access_token
    // console.log(data?.access_token,'dats')
    if (data === null) {
      Axios.defaults.headers.common['Authorization'] = ''
    } else {
      Axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    }

  }
  useEffect(() => {
    setAuthToken()

  }, [])




  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PaperProvider>
            <MainStack />
          </PaperProvider>

        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default App
