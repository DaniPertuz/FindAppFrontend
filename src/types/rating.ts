import { IRate, IRatingList } from '../interfaces';

export type RatingAction =
    | { type: 'getRatings', payload: { ratings: IRatingList }; }
    | { type: 'addRating', payload: { rating: IRate }; };