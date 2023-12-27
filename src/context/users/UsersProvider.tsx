import React, { useEffect, useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';

import sha1 from 'sha1';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';

import findAPI from '../../api/findapi';
import { IUser } from '../../interfaces';
import { UsersContext } from './';

export interface UsersState {
    role: string;
    name: string;
    document: string;
    email: string;
    address: string;
    phone: number;
    username: string;
    status: boolean;
    img?: string;
}

export const UsersProvider = ({ children }: any) => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async (): Promise<void> => {
        try {
            const resp = await findAPI.get('/users');
            setUsers([...resp.data.users]);
        } catch (error) {
            console.error(error);
        }
    };

    const loadUserByID = async (userID: string): Promise<IUser> => {
        try {
            const resp = await findAPI.get<IUser>(`/users/${userID}`);
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const loadUserByEmail = async (email: string): Promise<IUser> => {
        try {
            const resp = await findAPI.get<IUser>('/users/email', { params: { email } });
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const addUser = async (user: IUser): Promise<void> => {
        try {
            const resp = await findAPI.post<IUser>(`/users`, {
                user
            });

            setUsers([...users, resp.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async (userID: string, name: string, photo?: string): Promise<void> => {
        try {
            const resp = await findAPI.put<IUser>(`/users/${userID}`, {
                name,
                photo
            });

            setUsers(users.map(user => {
                return (user._id === userID) ? resp.data : user;
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const updateUserPassword = async (email: string, password: string): Promise<void> => {
        try {
            await findAPI.put<IUser>('/users/password/', {
                email,
                password
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (userID: string): Promise<void> => {
        try {
            const resp = await findAPI.put<IUser>(`/users/${userID}`, {
                id: userID
            });

            setUsers(users.map(user => {
                return (user.status) ? resp.data : user;
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const updatePhoto = async (data: ImagePickerResponse, userId: string) => {
        const { photo } = await loadUserByID(userId);

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        if (photo) {
            const nameArr = photo.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split('.');

            const timestamp = new Date().getTime();
            const image = `public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
            const signature = sha1(image);

            const destroyData = new FormData();

            destroyData.append('public_id', public_id);
            destroyData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            destroyData.append('api_key', CLOUDINARY_API_KEY);
            destroyData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
            destroyData.append('signature', signature);
            destroyData.append('timestamp', timestamp);


            await fetch('https://api.cloudinary.com/v1_1/dpertuzo/image/destroy', {
                method: 'POST',
                headers,
                body: destroyData
            });
        }

        const { uri, type, fileName } = data.assets![0];

        const fileToUpload = {
            uri,
            type,
            name: fileName
        };

        const uploadData = new FormData();
        uploadData.append('file', fileToUpload);
        uploadData.append('upload_preset', 'findapp');

        const upload = await fetch('https://api.cloudinary.com/v1_1/dpertuzo/upload', {
            method: 'POST',
            headers,
            body: uploadData
        });

        const { secure_url } = await upload.json();

        return secure_url;
    };

    return (
        <UsersContext.Provider value={{
            users,
            loadUsers,
            loadUserByEmail,
            loadUserByID,
            addUser,
            updateUser,
            updateUserPassword,
            deleteUser,
            updatePhoto
        }}
        >
            {children}
        </UsersContext.Provider>
    );
};;