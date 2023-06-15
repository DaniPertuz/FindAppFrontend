import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext } from '../../../context';
import FavoriteItem from './FavoriteItem';
import LoadingScreen from '../../LoadingScreen';
import { IFavorites } from '../../../interfaces';

import { styles } from '../../../theme/AppTheme';

const FavoritesScreen = () => {

    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

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
            {(display === false) && <LoadingScreen />}

            {(display === true) &&
                <View
                    style={{
                        ...styles.topContainer,
                        paddingTop: (Platform.OS === 'ios') ? top : top + 20
                    }}
                >
                    <FlatList
                        data={favorites.favorites}
                        keyExtractor={(item) => item.place._id}
                        renderItem={({ item }) => {
                            return (
                                <FavoriteItem
                                    item={item}
                                    onPress={() => navigation.navigate('MapScreen', { place: item.place, search: item.place.name })}
                                />
                            );
                        }}
                    />
                </View>
            }
        </>
    );
};

export default FavoritesScreen;