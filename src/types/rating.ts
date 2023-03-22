import { IRating } from '../interfaces';

export type RatingAction =
    | { type: 'addRating', payload: { rating: IRating }; };