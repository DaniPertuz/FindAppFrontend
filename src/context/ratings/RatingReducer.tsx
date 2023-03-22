import { RatingState } from '.';
import { RatingAction } from '../../types';

export const RatingReducer = (state: RatingState, { type, payload }: RatingAction): RatingState => {
    switch (type) {
        case 'addRating':
            return {
                ...state,
                rating: payload.rating
            };

        default:
            return state;
    }
};
