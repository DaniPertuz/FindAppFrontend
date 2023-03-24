import { ISearch } from '../interfaces';


export type PlaceAction = {
    type: 'searchPlace', payload: { places: ISearch[] }
}