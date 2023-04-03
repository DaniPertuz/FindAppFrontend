import React, { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagePickerResponse } from 'react-native-image-picker';

import { IUser, LoginData, LoginInterface } from '../../interfaces';
import { AuthContext, AuthReducer } from './';
import findAPI from '../../api/findapi';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    user: IUser | null;
    errorMessage: string;
}

const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
};

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        validateLogin();
    }, []);

    const validateLogin = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) return dispatch({ type: 'notAuthenticated' });

        const { data } = await findAPI.get('/auth/renew');

        await AsyncStorage.setItem('token', data.token);

        dispatch({
            type: 'signUp',
            payload: {
                user: data.user,
                token: data.token
            }
        });
    };

    const signUp = async ({ name, email, password, role }: IUser): Promise<void> => {
        try {
            const { data: userLogin } = await findAPI.post<LoginInterface>('/users', {
                name,
                email,
                password,
                role
            });
            const { data: tokenLogin } = await findAPI.post<LoginInterface>('/auth/login', { email, password });

            dispatch({
                type: 'signUp',
                payload: {
                    user: userLogin.user,
                    token: tokenLogin.token
                }
            });

            await AsyncStorage.setItem('token', tokenLogin.token);
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response!.data.errors[0].msg || 'Check information'
            });
        }
    };

    const signIn = async ({ username, password }: LoginData): Promise<void> => {
        try {
            const { data } = await findAPI.post<LoginInterface>('/auth/login', { username, password });
            const { user, token } = data;
            dispatch({
                type: 'signUp',
                payload: {
                    user,
                    token
                }
            });

            await AsyncStorage.setItem('token', data.token);
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response!.data.msg || 'Wrong information'
            });
        }
    };

    const uploadImage = async (data: ImagePickerResponse, userId: string) => {
        try {
            const { uri, type, fileName } = data.assets![0];

            const fileToUpload = {
                uri,
                type,
                name: fileName
            };

            const formData = new FormData();

            formData.append('file', fileToUpload);
            formData.append('upload_preset', 'findapp');

            const headers = {
                'Content-Type': 'multipart/form-data'
            };

            const response = await fetch('https://api.cloudinary.com/v1_1/dpertuzo/upload', {
                method: 'POST',
                headers,
                body: formData
            });

            const { secure_url } = await response.json();

            await findAPI.put(`/users/${userId}`, { photo: secure_url });

            return secure_url;
        } catch (err: any) {
            dispatch({
                type: 'addError',
                payload: err || 'Wrong information'
            });
        }
    };

    const logOut = async (): Promise<void> => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = (): void => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            uploadImage,
            logOut,
            removeError
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};