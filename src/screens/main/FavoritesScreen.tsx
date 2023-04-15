import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext } from '../../context';
import FavoriteItem from '../../components/FavoriteItem';
import LoadingScreen from '../LoadingScreen';
import { IFavorites } from '../../interfaces';

import { styles } from '../../theme/AppTheme';

const FavoritesScreen = () => {

    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    const [favorites, setFavorites] = useState<IFavorites>({ total: 0, favorites: [] });

    const { user } = useContext(AuthContext);
    const { getFavorites } = useContext(PlacesContext);

    const loadFavorites = async () => {
        const favs = await getFavorites(user?._id!);
        setFavorites(favs);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <>
            {(favorites.total === 0)
                ? <LoadingScreen />
                :
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
                                    onPress={() => navigation.navigate('MapScreen', { place: item.place.address, search: item.place.name })}
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