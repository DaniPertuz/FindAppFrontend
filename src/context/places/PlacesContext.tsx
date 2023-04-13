import { createContext } from 'react';

import { IFavorites, IHistory, IPlace, ISearch } from '../../interfaces';

type PlacesContextProps = {
    loadPlaceByID:  (placeID: string) => Promise<IPlace>;
    searchPlace:    (keyword: string) => Promise<ISearch>;
    getFavorites:   (userId: string) => Promise<IFavorites>;
    getHistorical:  (userId: string) => Promise<IHistory>;
    getPlaceRating: (placeID: string) => Promise<number>;
}

export const PlacesContext = createContext({} as PlacesContextProps);