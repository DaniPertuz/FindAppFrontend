import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SavedPlace from '../../components/SavedPlace';
import { IFavorites } from '../../interfaces';

import { styles } from '../../theme/AppTheme';
import { AuthContext, PlacesContext } from '../../context';

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
                        <SavedPlace
                            item={item}
                            onPress={() => navigation.navigate('MapScreen', { place: item.place.address })}
                        />
                    );
                }}
            />
        </View>
    );
};

export default FavoritesScreen;