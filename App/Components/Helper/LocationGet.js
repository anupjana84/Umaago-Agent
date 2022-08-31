
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from './AskPermission';

export const locationGet = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
        (position) => {
            const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                
              };
              return region
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
   
    
  };