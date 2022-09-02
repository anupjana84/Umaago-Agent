import { PROFILE_IAMGE } from "../../Actions/ActionType/ProfileImage/inxex";



const initialState = {
  profileImage:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_IAMGE:
      // console.log(action.payload.data.upcomming,'action.payload.data.running');
    
      
      return {
        ...state,
        profileImage:action.payload.data
        
      };

    default:
      return state;
  }
};
