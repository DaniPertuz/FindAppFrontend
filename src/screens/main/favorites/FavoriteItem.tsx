import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ItemIcons } from '../../../components/ui';
import { IFavorite } from '../../../interfaces/app-interfaces';
import { useDistance, useFavoritesAndService, useIcons, useLocation } from '../../../hooks';
import { RootStackParams } from '../../../navigation';

import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IFavorite;
}

const FavoriteItem = ({ item }: Props) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const [distance, setDistance] = useState<number>(0);

    const { getCurrentLocation } = useLocation();

    const { removeFavorite } = useFavoritesAndService({ place: item.place });

    const getDistance = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setDistance(useDistance(latitude, longitude, item.place.coords.latitude, item.place.coords.longitude, 'K'));
    };

    useEffect(() => {
        getDistance();
    }, []);

    return (
        <>
            <View style={styles.favoriteItemContainer}>
                <View style={{ flex: 8 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.flexOneDirectionRow}
                        onPress={() => navigator.navigate('PlaceDetailsScreen', { place: item.place, search: '' })}
                    >
                        <View style={styles.flexOne}>
                            <Image source={(item.place.photo === '') ? require('../../../assets/FA_Color.png') : { uri: item.place.photo }} style={styles.itemIcon} />
                        </View>
                        <View style={{ flex: 5 }}>
                            <ItemIcons item={item.place} distance={distance} />
                        </View>
                        <View style={styles.flexOne} />
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.alignItemsJustifyContentCenter, ...styles.flexOne }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={removeFavorite}
                    >
                        {useIcons('Favorite', 26, 26)}
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default FavoriteItem;;