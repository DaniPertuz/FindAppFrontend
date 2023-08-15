import { createContext } from 'react';

import { FavoriteItem, IFavorites, IHistory, IPlace, IPlaces, IRatingList, ISearch, IService } from '../../interfaces';

type PlacesContextProps = {
    loadPlaceByID:       (placeID: string) => Promise<IPlace>;
    searchPlace:         (keyword: string) => Promise<ISearch>;
    getFavorite:         (userId: string, place: string) => Promise<FavoriteItem>;
    getFavorites:        (userId: string) => Promise<IFavorites>;
    getHistorical:       (userId: string) => Promise<IHistory>;
    getHistoryItem:      (userId: string, place: string) => Promise<IService>;
    getPlaces:           () => Promise<IPlaces>;
    getPlaceRating:      (placeID: string) => Promise<number>;
    getPlacesByCategory: (category: string) => Promise<IPlace[]>;
    getPopularPlaces:    () => Promise<IPlaces>;
    getRatingsByUser:    (user: string) => Promise<IRatingList>;
    addFavorite:         (user: string, place: string) => Promise<void>
    addService:          (date: string, place: string, search: string, user: string) => void;
    deleteFavorite:      (user: string, place: string) => Promise<void>;
    deleteService:       (user: string, place: string) => Promise<void>;
}

export const PlacesContext = createContext({} as PlacesContextProps);