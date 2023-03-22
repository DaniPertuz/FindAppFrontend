import { createContext } from 'react';
import { IRating } from '../../interfaces';

type RatingContextProps = {
    addRating: (rating: IRating) => void;
}

export const RatingContext = createContext({} as RatingContextProps);