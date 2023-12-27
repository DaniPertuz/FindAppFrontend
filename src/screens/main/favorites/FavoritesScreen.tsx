import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext, PlacesContext } from '../../../context';
import StatusBarComponent from '../../../components/StatusBarComponent';
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
            {(!display)
                ? <LoadingScreen />
                :
                <View style={styles.favoriteScreenContainer}>
                    <StatusBarComponent color='rgba(104, 110, 222, 0)' theme='dark-content' />
                    <TopButtons />
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.boldMediumText}>Favoritos</Text>
                    </View>
                    <View style={styles.smallMarginTop}>
                        {(favorites.total === 0)
                            ?
                            <View style={styles.alignItemsJustifyContentCenter}>
                                <Text style={styles.boldMediumText}>No hay favoritos aún</Text>
                            </View>
                            :
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
                        }
                    </View>
                </View>
            }
        </>
    );
};

export default FavoritesScreen;