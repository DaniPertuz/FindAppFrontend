import { createContext } from 'react';

import { IFavorites, IHistory, IPlace } from '../../interfaces';

type PlacesContextProps = {
    loadPlaceByID:  (placeID: string) => Promise<IPlace>;
    searchPlace:    (keyword: string) => void;
    getFavorites:   (userId: string) => Promise<IFavorites>;
    getHistorical:  (userId: string) => Promise<IHistory>;
    getPlaceRating: (placeID: string) => Promise<number>;
}

export const PlacesContext = createContext({} as PlacesContextProps);