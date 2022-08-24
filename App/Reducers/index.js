import {combineReducers} from 'redux';
import CampaignHistory from './CampaignHistory';



 import user from './User';

const rootReducer = combineReducers({
//   setLatLang,
//   selectList,
//   coordinates,
//   location_details,
//   photo_url,
//   order,
//   OrderDetails,
//   circuitInventory,
//   devicesInventory,
user,
CampaignHistory
});
export default rootReducer;
