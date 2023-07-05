import React, { useState } from 'react';
import findAPI from '../../api/findapi';
import { IRating, IRatingAverage, IRatingList } from '../../interfaces';
import { RatingContext } from './';

export const RatingProvider = ({ children }: any) => {
    const [ratings, setRatings] = useState<IRatingList>({
        total: 0,
        rates: []
    });
    const [ratingAverage, setRatingAverage] = useState(0);

    const getAllRatings = async (): Promise<IRatingList> => {
        try {
            const { data } = await findAPI.get<IRatingList>('/ratings');
            return data;
        } catch (error: any) {
            throw new Error(error.response);
        }
    }

    const getRatings = async (placeId: string) => {
        try {
            const { data } = await findAPI.get<IRatingList>(`/ratings/all/${placeId}`);
            setRatings(data);
        } catch (error: any) {
            console.log(error.response);
        }
    };

    const getPlaceRatingAverage = async (placeId: string) => {
        try {
            const { data } = await findAPI.get<IRatingAverage>(`/ratings/${placeId}`);
            const { average } = data;
            setRatingAverage(average);
        } catch (error: any) {
            console.log(error.response);
        }
    };

    const addRating = async (rating: IRating): Promise<void> => {
        try {
            await findAPI.post<IRating>('/ratings', rating);
        } catch (error: any) {
            console.log(error.response);
        }
    };

    return (
        <RatingContext.Provider value={{
            ratings,
            ratingAverage,
            getAllRatings,
            getRatings,
            getPlaceRatingAverage,
            addRating
        }}
        >
            {children}
        </RatingContext.Provider>
    );
};