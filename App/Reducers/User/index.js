
import { USER_SET } from './../../Actions/ActionType/User/index';

const initialState = {
 user:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        user: action.payload.data,
        
      };

    default:
      return state;
  }
};
