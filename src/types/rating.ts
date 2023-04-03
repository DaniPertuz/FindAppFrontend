import { IRating } from '../interfaces';

export type RatingAction =
    | { type: 'getRatings', payload: { ratings: IRating[] }; }
    | { type: 'addRating', payload: { rating: IRating }; };