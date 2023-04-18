import { createContext } from 'react';

import { IFavorites, IHistory, IPlace, ISearch, IService } from '../../interfaces';

type PlacesContextProps = {
    loadPlaceByID:  (placeID: string) => Promise<IPlace>;
    searchPlace:    (keyword: string) => Promise<ISearch>;
    getFavorites:   (userId: string) => Promise<IFavorites>;
    getHistorical:  (userId: string) => Promise<IHistory>;
    getPlaceRating: (placeID: string) => Promise<number>;
    addFavorite:    (user: string, place: string) => Promise<void>
    addService:     (date: string, place: string, search: string, user: string) => void;
}

export const PlacesContext = createContext({} as PlacesContextProps);