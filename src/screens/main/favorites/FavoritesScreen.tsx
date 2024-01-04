import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { AuthContext, PlacesContext } from '../../../context';
import { FavoritesList } from '../../../components/favorites';
import StatusBarComponent from '../../../components/StatusBarComponent';
import TopButtons from '../../../components/TopButtons';
import LoadingScreen from '../../LoadingScreen';
import { IFavorites } from '../../../interfaces';

import { styles } from '../../../theme/AppTheme';

const FavoritesScreen = () => {

    const init = { total: 0, favorites: [] };

    const [favorites, setFavorites] = useState<IFavorites>(init);
    const [display, setDisplay] = useState(false);

    const { user } = useContext(AuthContext);
    const { getFavorites } = useContext(PlacesContext);

    useEffect(() => {
        let mounted = true;
        getFavorites(user?._id!).then((data) => {
            if (mounted) {
                setFavorites(data);
                setDisplay(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, [favorites]);

    return (
        <>
            {(!display) ? <LoadingScreen /> : <FavoritesList favorites={favorites} />}
        </>
    );
};

export default FavoritesScreen;