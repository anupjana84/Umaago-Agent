import { RUNNING_DETAILS } from "../ActionType/RunnigDetails";




const initialState = {
  runningDetails:{},
  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RUNNING_DETAILS:
      // console.log(action.payload.data.upcomming,'action.payload.data.running');
      return {
        ...state,
        runningDetails: action.payload.data.running,
        
        
      };

    default:
      return state;
  }
};
