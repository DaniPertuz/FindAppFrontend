import Geocoder from '../api/geocoder';

export const useCoords = async (address: string) => {
    const { results } = await Geocoder.from(address);
    const { lat, lng } = results[0].geometry.location;
    return { lat, lng };
};
