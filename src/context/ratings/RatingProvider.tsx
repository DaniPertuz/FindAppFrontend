import React, { useState } from 'react';
import findAPI from '../../api/findapi';
import { IRating, IRatingList, IRatings } from '../../interfaces';
import { RatingContext } from './';

export const RatingProvider = ({ children }: any) => {
    const [ratings, setRatings] = useState<IRatings>({
        total: 0,
        rates: []
    });
    const [ratingAverage, setRatingAverage] = useState(0);

    const getAllRatings = async (): Promise<IRatingList> => {
        try {
            const { data } = await findAPI.get<IRatingList>('/ratings');
            return data;
        } catch (error: any) {
            throw new Error(error.response!.data.msg);
        }
    }

    const getRatings = async (placeId: string) => {
        try {
            const { data } = await findAPI.get<IRatings>(`/ratings/all/${placeId}`);
            setRatings(data);
        } catch (error: any) {
            console.log(error.response!.data.msg);
        }
    };

    const getPlaceRatingAverage = async (placeId: string) => {
        try {
            const { data } = await findAPI.get(`/ratings/${placeId}`);
            const { average } = data;
            setRatingAverage(average);
        } catch (error: any) {
            console.log(error.response!.data.msg);
        }
    };

    const addRating = async (rating: IRating): Promise<void> => {
        try {
            await findAPI.post<IRating>('/ratings', { rating });
        } catch (error: any) {
            console.log(error.response!.data.msg);
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