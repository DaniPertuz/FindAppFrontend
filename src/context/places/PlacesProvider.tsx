import React from 'react';

import findAPI from '../../api/findapi';
import { FavoriteItem, IFavorites, IHistory, IPlace, IPlaces, IRatingAverage, IRatingList, ISearch, IService } from '../../interfaces';
import { PlacesContext } from '.';

export const PlacesProvider = ({ children }: any) => {

    const loadPlaceByID = async (placeID: string): Promise<IPlace> => {
        try {
            const { data } = await findAPI.get<IPlace>(`/places/${placeID}`);
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const searchPlace = async (keyword: string): Promise<ISearch> => {
        try {
            const { data } = await findAPI.get<ISearch>(`/search/${keyword}`);
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const getFavorites = async (userId: string): Promise<IFavorites> => {
        try {
            const { data } = await findAPI.get<IFavorites>(`/favorites/${userId}`);
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const getPlacesByCategory = async (category: string): Promise<IPlace[]> => {
        try {
            const { data } = await findAPI.get<IPlace[]>(`/places/category/${category}`);
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const getFavorite = async (userId: string, place: string): Promise<FavoriteItem> => {
        try {
            const { data } = await findAPI.get<FavoriteItem>(`/favorites/${userId}/${place}`);
            return data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const getHistorical = async (userId: string): Promise<IHistory> => {
        try {
            const { data } = await findAPI.get<IHistory>(`/services/${userId}`);
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const getHistoryItem = async (userId: string, place: string): Promise<IService> => {
        try {
            const { data } = await findAPI.get<IService>(`/services/${userId}/${place}`);
            return data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const getPlaceRating = async (placeID: string): Promise<number> => {
        try {
            const { data } = await findAPI.get<IRatingAverage>(`/ratings/${placeID}`);
            return data.average;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const getPlaces = async (): Promise<IPlaces> => {
        try {
            const { data } = await findAPI.get<IPlaces>('/places');
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    const getPopularPlaces = async (): Promise<IPlaces> => {
        try {
            const { data } = await findAPI.get<IPlaces>('/places/popular');
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    const getRatingsByUser = async (user: string): Promise<IRatingList> => {
        try {
            const { data } = await findAPI.get<IRatingList>(`/ratings/${user}`);
            return data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const addFavorite = async (user: string, place: string) => {
        try {
            await findAPI.post('/favorites', { user, place });
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const addService = async (place: string, search: string, user: string) => {
        try {
            await findAPI.post('/services', { place, search, user });
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const deleteFavorite = async (user: string, place: string) => {
        try {
            await findAPI.delete(`/favorites/${user}/${place}`);
        } catch (error: any) {
            throw new Error(`${error.response!.data.msg}`);
        }
    };

    const deleteService = async (user: string, place: string) => {
        try {
            await findAPI.delete(`/services/${user}/${place}`);
        } catch (error: any) {
            throw new Error(`${error.response!.data.msg}`);
        }
    };

    return (
        <PlacesContext.Provider value={{
            loadPlaceByID,
            searchPlace,
            getFavorite,
            getFavorites,
            getHistorical,
            getHistoryItem,
            getPlaceRating,
            getPlacesByCategory,
            getPlaces,
            getPopularPlaces,
            getRatingsByUser,
            addFavorite,
            addService,
            deleteFavorite,
            deleteService,
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};