import React, { useReducer } from 'react';
import findAPI from '../../api/findapi';
import { IRating } from '../../interfaces';
import { RatingContext, RatingReducer } from './';

export interface RatingState {
    rating: IRating | null;
}

const RATING_INITIAL_STATE: RatingState = {
    rating: null
};

export const RatingProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(RatingReducer, RATING_INITIAL_STATE);

    const addRating = async (rating: IRating) => {
        const { data } = await findAPI.post<IRating>('/ratings', rating);
        dispatch({ type: 'addRating', payload: { rating: data } });
    };

    return (
        <RatingContext.Provider value={{
            ...state,
            addRating
        }}
        >
            {children}
        </RatingContext.Provider>
    );
};