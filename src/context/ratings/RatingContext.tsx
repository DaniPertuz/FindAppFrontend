import { createContext } from 'react';
import { IRating, IRatings } from '../../interfaces';

type RatingContextProps = {
    ratings:               IRatings;
    ratingAverage:         number;
    getRatings:            (placeId: string) => void;
    getPlaceRatingAverage: (placeId: string) => void;
    addRating:             (rating: IRating) => void;
}

export const RatingContext = createContext({} as RatingContextProps);