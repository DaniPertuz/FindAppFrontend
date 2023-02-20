import { createContext } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';

import { IUser, LoginData } from '../../interfaces';

type AuthContextProps = {
    status:       'checking' | 'authenticated' | 'not-authenticated';
    token:        string | null;
    user:         IUser | null;
    errorMessage: string;
    signUp:       (registerData: IUser) => void;
    signIn:       (loginData: LoginData) => void;
    uploadImage:  (data: ImagePickerResponse) => Promise<string>;
    logOut:       () => void;
    removeError:  () => void;
}

export const AuthContext = createContext({} as AuthContextProps);