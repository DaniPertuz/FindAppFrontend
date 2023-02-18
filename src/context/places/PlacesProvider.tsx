import React, { useEffect, useState } from 'react';
import findAPI from '../../api/findapi';
import { IPlace } from '../../interfaces';
import { PlacesContext } from '.';

export interface PlaceState {
    name:        string;
    description: string;
    category:    string[];
    email:       string;
    address:     string;
    phone:       number;
    city:        string;
    state:       string;
    country:     string;
    schedule:    string[];
    icon:        string;
    pics?:       string[];
    rate:        number;
    status:      boolean;
}

export const RestaurantsProvider = ({ children }: any) => {

    const [places, setPlaces] = useState<IPlace[]>([]);

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

    const addPlace = async (place: IPlace): Promise<void> => {
        try {
            const resp = await findAPI.post<IPlace>('/places', {
                place
            });

            setPlaces([...places, resp.data]);
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const updatePlace = async (placeID: string, place: IPlace) => {
        try {
            const resp = await findAPI.put<IPlace>(`/places/${placeID}`, {
                place
            });
    
            setPlaces(places.map(place => {
                return (place._id === placeID) ? resp.data : place;
            }));
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const deletePlace = async (placeID: string) => {
        try {
            const resp = await findAPI.put<IPlace>(`/places/${placeID}`, {
                id: placeID
            });
    
            setPlaces(places.map(place => {
                return (place.status === true) ? resp.data : place;
            }));
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    return (
        <PlacesContext.Provider value={{
            places,
            loadPlaces,
            loadPlaceByID,
            addPlace,
            updatePlace,
            deletePlace
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};