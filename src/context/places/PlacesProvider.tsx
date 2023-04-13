import React from 'react';
import findAPI from '../../api/findapi';
import { IFavorites, IHistory, IPlace, IRatingAverage, ISearch } from '../../interfaces';
import { PlacesContext } from '.';

export interface PlaceState {
    places: IPlace | ISearch[] | null;
}

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

    const getHistorical = async (userId: string): Promise<IHistory> => {
        try {
            const { data } = await findAPI.get<IHistory>(`/services/${userId}`);
            return data;
        } catch (error) {
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
    }

    return (
        <PlacesContext.Provider value={{
            loadPlaceByID,
            searchPlace,
            getFavorites,
            getHistorical,
            getPlaceRating
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};