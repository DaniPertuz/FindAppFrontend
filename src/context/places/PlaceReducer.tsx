import { PlaceAction } from '../../types';
import { PlaceState } from '.';

export const PlaceReducer = (state: PlaceState, { type, payload }: PlaceAction): PlaceState => {
  switch (type) {

  case 'searchPlace':
    return {
        ...state,
        places: [...payload.places]
    }

  default:
    return state
  }
}
