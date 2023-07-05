import { createContext } from 'react';

import { FavoriteItem, IFavorites, IHistory, IPlace, ISearch, IService } from '../../interfaces';

type PlacesContextProps = {
    loadPlaceByID:  (placeID: string) => Promise<IPlace>;
    searchPlace:    (keyword: string) => Promise<ISearch>;
    getFavorite:    (userId: string, place: string) => Promise<FavoriteItem>;
    getFavorites:   (userId: string) => Promise<IFavorites>;
    getHistorical:  (userId: string) => Promise<IHistory>;
    getHistoryItem:  (userId: string, place: string) => Promise<IService>;
    getPlaceRating: (placeID: string) => Promise<number>;
    addFavorite:    (user: string, place: string) => Promise<void>
    addService:     (date: string, place: string, search: string, user: string) => void;
    deleteFavorite: (user: string, place: string) => Promise<void>;
    deleteService: (user: string, place: string) => Promise<void>;
}

export const PlacesContext = createContext({} as PlacesContextProps);