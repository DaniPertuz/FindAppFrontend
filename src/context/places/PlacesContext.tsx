import { createContext } from 'react';

import { IPlace } from '../../interfaces';

type PlacesContextProps = {
    places:        IPlace[];
    loadPlaces:    () => Promise<void>;
    loadPlaceByID: (placeID: string) => Promise<IPlace>;
    searchPlace:   (keyword: string) => void;
}

export const PlacesContext = createContext({} as PlacesContextProps);