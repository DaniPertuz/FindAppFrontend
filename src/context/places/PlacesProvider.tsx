import React, { useEffect, useReducer, useState } from 'react';
import findAPI from '../../api/findapi';
import { IPlace, ISearch } from '../../interfaces';
import { PlacesContext } from '.';
import { PlaceReducer } from './PlaceReducer';

export interface PlaceState {
    places: IPlace | ISearch[] | null;
}

const PLACE_INITIAL_STATE: PlaceState = {
    places: null
};

export const RestaurantsProvider = ({ children }: any) => {

    const [places, setPlaces] = useState<IPlace[]>([]);
    const [state, dispatch] = useReducer(PlaceReducer, PLACE_INITIAL_STATE);

    useEffect(() => {
        loadPlaces();
    }, []);

    const loadPlaces = async (): Promise<void> => {
        try {
            const resp = await findAPI.get('/places');
            setPlaces([...resp.data.places]);
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

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
            dispatch({ type: 'searchPlace', payload: { places: [data] } });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <PlacesContext.Provider value={{
            places,
            loadPlaces,
            loadPlaceByID,
            searchPlace
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};