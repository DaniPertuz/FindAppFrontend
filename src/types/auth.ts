import { IUser } from '../interfaces';

export type AuthAction =
    | { type: 'signUp', payload: { user: IUser, token: string; }; }
    | { type: 'addError', payload: string; }
    | { type: 'removeError'; }
    | { type: 'notAuthenticated'; }
    | { type: 'logout'; };

export type UsersAction =
    | { type: 'updateUser', payload: { user: IUser, token: string; }; }
    | { type: 'addError', payload: string; }
    | { type: 'removeError'; }
    | { type: 'notAuthenticated'; }
    | { type: 'logout'; };