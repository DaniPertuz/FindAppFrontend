import React, { useEffect, useState } from 'react';
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

    const updateUser = async (userID: string, name: string, email: string, password: string, photo: string): Promise<void> => {
        try {
            const resp = await findAPI.put<IUser>(`/users/${userID}`, {
                name,
                email,
                password,
                photo
            });

            setUsers(users.map(user => {
                return (user._id === userID) ? resp.data : user;
            }));
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
                return (user.status === true) ? resp.data : user;
            }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UsersContext.Provider value={{
            users,
            loadUsers,
            loadUserByID,
            addUser,
            updateUser,
            deleteUser
        }}
        >
            {children}
        </UsersContext.Provider>
    );
};