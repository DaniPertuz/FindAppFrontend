import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext, PlacesContext } from '../../../context';
import TopButtons from '../../../components/TopButtons';
import FavoriteItem from './FavoriteItem';
import LoadingScreen from '../../LoadingScreen';
import { IFavorites } from '../../../interfaces';

import { styles } from '../../../theme/AppTheme';

const FavoritesScreen = () => {

    const navigation = useNavigation();

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
                        backgroundColor: 'rgba(104, 110, 222, 0.1)',
                        flex: 1,
                        paddingHorizontal: 22,
                        paddingTop: 70
                    }}
                >
                    <TopButtons />
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>Favoritos</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
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
                </View>
            }
        </>
    );
};

export default FavoritesScreen;