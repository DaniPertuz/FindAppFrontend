import React from 'react';
import findAPI from '../../api/findapi';
import { IFavorites, IHistory, IPlace, IRatingAverage, IRatings, ISearch } from '../../interfaces';
import { PlacesContext } from '.';
import {  } from '../../interfaces/app-interfaces';

export interface PlaceState {
    places: IPlace | ISearch[] | null;
}

export const PlacesProvider = ({ children }: any) => {

    const loadPlaceByID = async (placeID: string): Promise<IPlace> => {
        try {
            const resp = await findAPI.get<IPlace>(`/places/${placeID}`);
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const searchPlace = async (keyword: string) => {
        try {
            const { data } = await findAPI.post<ISearch>('/search', keyword);
            // dispatch({ type: 'searchPlace', payload: { places: [data] } });
        } catch (error) {
            console.error(error);
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