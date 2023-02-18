import { createContext } from 'react';

import { IUser } from '../../interfaces';

interface UsersContextProps {
    users:        IUser[];
    loadUsers:    () => Promise<void>;
    loadUserByID: (userID: string) => Promise<IUser>;
    addUser:      (user: IUser) => Promise<void>;
    updateUser:   (userID: string, name: string, email: string, password: string, photo: string) => Promise<void>;
    deleteUser:   (userID: string) => Promise<void>;
}

export const UsersContext = createContext({} as UsersContextProps);