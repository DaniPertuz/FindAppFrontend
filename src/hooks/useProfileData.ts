import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { AuthContext, PlacesContext, UsersContext } from '../context';
import { IRatingList, IUser, roles } from '../interfaces';

export const useProfileData = () => {
    const isFocused = useIsFocused();

    const { user } = useContext(AuthContext);
    const { getFavorites, getRatingsByUser, getHistorical } = useContext(PlacesContext);
    const { loadUserByID } = useContext(UsersContext);

    const [totalHistory, setTotalHistory] = useState<number>(0);
    const [totalFavorites, setTotalFavorites] = useState<number>(0);
    const [userRatings, setUserRatings] = useState<IRatingList>({ total: 0, rates: [] });
    const [userDB, setUserDB] = useState<IUser>({
        role: roles.CLIENT,
        name: '',
        email: '',
        password: '',
        status: false,
        photo: ''
    });

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserDB(usr);
    };

    useEffect(() => {
        let mounted = true;
        getHistorical(user?._id!).then((data) => {
            if (mounted) {
                setTotalHistory(data.total);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        getFavorites(user?._id!).then((data) => {
            if (mounted) {
                setTotalFavorites(data.total);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        getRatingsByUser(user?._id!).then((data) => {
            if (mounted) {
                setUserRatings(data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (isFocused) {
            load();
        }
    }, [isFocused, userDB]);

    return {
        totalHistory,
        totalFavorites,
        userRatings,
        userDB
    };
};
