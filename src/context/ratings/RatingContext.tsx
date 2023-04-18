import { createContext } from 'react';
import { IRate, IRatingList } from '../../interfaces';

type RatingContextProps = {
    ratings:               IRatingList;
    ratingAverage:         number;
    getAllRatings:         () => Promise<IRatingList>;
    getRatings:            (placeId: string) => void;
    getPlaceRatingAverage: (placeId: string) => void;
    addRating:             (rating: IRate) => void;
}

export const RatingContext = createContext({} as RatingContextProps);