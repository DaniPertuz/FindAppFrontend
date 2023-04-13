import { createContext } from 'react';
import { IRating, IRatingList, IRatings } from '../../interfaces';

type RatingContextProps = {
    ratings:               IRatings;
    ratingAverage:         number;
    getAllRatings:         () => Promise<IRatingList>;
    getRatings:            (placeId: string) => void;
    getPlaceRatingAverage: (placeId: string) => void;
    addRating:             (rating: IRating) => void;
}

export const RatingContext = createContext({} as RatingContextProps);