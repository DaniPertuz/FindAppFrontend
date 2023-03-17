import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_API_KEY } from '@env';

Geocoder.init(GOOGLE_MAPS_API_KEY);

export default Geocoder;