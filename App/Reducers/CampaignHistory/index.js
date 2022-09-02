
import { ALL_CAMPAIGN_HISTORY } from "../../Actions/ActionType/CampaignHistory";


const initialState = {
  running:{},
  upcomming:[],
  completed:[],
  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_CAMPAIGN_HISTORY:
      // console.log(action.payload.data.upcomming,'action.payload.data.running');
    
      
      return {
        ...state,
        running: action.payload.data.running,
        upcomming: action.payload.data.upcomming,
        completed: action.payload.data.completed,
       

        
      };

    default:
      return state;
  }
};
