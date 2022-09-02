import {combineReducers} from 'redux';
import CampaignHistory from './CampaignHistory';
import ProfileImage from './ProfileImage';



 import user from './User';

const rootReducer = combineReducers({

user,
CampaignHistory,
ProfileImage
});
export default rootReducer;
