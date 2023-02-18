import { createContext } from 'react';

import { IPlace } from '../../interfaces';

type PlacesContextProps = {
    places:        IPlace[];
    loadPlaces:    () => Promise<void>;
    loadPlaceByID: (placeID: string) => Promise<IPlace>;
    addPlace:      (place: IPlace) => Promise<void>;
    updatePlace:   (placeID: string, place: IPlace) => Promise<void>;
    deletePlace:   (placeID: string) => Promise<void>;
}

export const PlacesContext = createContext({} as PlacesContextProps);