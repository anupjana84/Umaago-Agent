import { RUNNING_DETAILS } from "../ActionType/RunnigDetails";
import { Base_url } from './../../Utils/BaseUrl';
import Axios from 'axios'

export const startCampaign= (id,status, lat, lng)=> async(dispatch)=>{
   

    setLoding(true)
    Axios.post(`${Base_url}/agent-campaign-running`,{
    
        campaign_detail_id: id,
        status: status,
        latitude: lat,
        longitude:lng,
          
    })
        .then(response => {
            if (response.data) {
                setLoding(false)
            }
            dispatch({
                type:RUNNING_DETAILS,
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