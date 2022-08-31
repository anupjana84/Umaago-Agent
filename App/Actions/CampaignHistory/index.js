import { ALL_CAMPAIGN_HISTORY } from "../ActionType/CampaignHistory";
import { Base_url } from './../../Utils/BaseUrl';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getAllCampaignHistory= (setLoding)=> async(dispatch)=>{
    // const user = JSON.parse(await AsyncStorage.getItem('@user'));
    // const token =user.access_token
    // console.log(token,'token',user);
    // fetch(`${Base_url}/home`, {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }).then(res=>{
    //     return res.json()
    //   })
    //   .then(response=>{
    //     console.log(response)
    //   })
    //   .catch(err=>console.log(err))

    setLoding(true)
    Axios.get(`${Base_url}/home`)
        .then(response => {
            if (response.data) {
                setLoding(false)
            }
            dispatch({
                type:ALL_CAMPAIGN_HISTORY,
                payload:{
                    data:response.data
                }
            })
            // console.log(response.data,'ddd')
        })
        .catch(error => {
            console.log(error)
        })

}