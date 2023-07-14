import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthContext } from '../../../context';
import { PlacesContext } from '../../../context/places/PlacesContext';
import { IFavorite } from '../../../interfaces/app-interfaces';
import useDistance from '../../../hooks/useDistance';
import { useIcons } from '../../../hooks/useIcons';
import useLocation from '../../../hooks/useLocation';
import { RootStackParams } from '../../../navigation';

import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IFavorite;
    onPress: () => void;
}

const FavoriteItem = ({ item, onPress }: Props) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { user } = useContext(AuthContext);
    const { deleteFavorite, getPlaceRating } = useContext(PlacesContext);

    const [placeRating, setPlaceRating] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);

    const { getCurrentLocation } = useLocation();

    const setRating = async () => {
        setPlaceRating(await getPlaceRating(item.place._id));
    };

    const getDistance = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setDistance(useDistance(latitude, longitude, item.place.coords.latitude, item.place.coords.longitude, 'K'));
    };

    const removeFavorite = async () => {
        Alert.alert('Eliminar de favoritos', '¿Quieres eliminar este lugar de tu lista de favoritos?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Eliminar',
                onPress: async () => await deleteFavorite(user?._id!, item.place._id)
            },
        ]);
    };

    useEffect(() => {
        setRating();
    }, []);

    useEffect(() => {
        getDistance();
    }, []);

    return (
        <>
            <View style={styles.favoriteItemContainer}>
                <View style={styles.flexOne}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.flexOneDirectionRow}
                        onPress={() => navigator.navigate('PlaceDetailsScreen', { place: item.place, search: '' })}
                    >
                        <Image
                            source={{ uri: item.place.photo }}
                            style={styles.itemIcon}
                        />
                        <View style={styles.favoriteItemDetailsContainer}>
                            <View style={styles.smallMarginBottom}>
                                <Text style={styles.boldMediumText}>{item.place.name}</Text>
                            </View>
                            <View style={{ ...styles.flexDirectionRowJustifySpaceBetween, maxWidth: 156 }}>
                                {useIcons(item.place.category, 15, 15)}
                                <View style={styles.flexDirectionRow}>
                                    <View style={styles.itemDetailsIconMarginEnd}>
                                        {useIcons('Location', 15, 15)}
                                    </View>
                                    <Text style={styles.smallPlainText}>{distance.toFixed(1)} Km</Text>
                                </View>
                                <View style={styles.flexDirectionRow}>
                                    <View style={styles.itemDetailsIconMarginEnd}>
                                        {useIcons('Star', 15, 15)}
                                    </View>
                                    <Text style={styles.smallPlainText}>{Number(item.place.rate.$numberDecimal).toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={removeFavorite}
                >
                    <View style={styles.flexOneAlignJustifyCenter}>
                        {useIcons('Favorite', 26, 26)}
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default FavoriteItem;