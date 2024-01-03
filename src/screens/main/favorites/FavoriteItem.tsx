import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import LinearGradientComponent from '../../../components/LinearGradientComponent';
import { AuthContext } from '../../../context';
import { PlacesContext } from '../../../context/places/PlacesContext';
import { IFavorite } from '../../../interfaces/app-interfaces';
import { useDistance, useIcons, useLocation } from '../../../hooks';
import { RootStackParams } from '../../../navigation';

import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IFavorite;
}

const FavoriteItem = ({ item }: Props) => {

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
                <View style={{ flex: 8 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.flexOneDirectionRow}
                        onPress={() => navigator.navigate('PlaceDetailsScreen', { place: item.place, search: '' })}
                    >
                        <View style={styles.flexOne}>
                            <Image
                                source={(item.place.photo === '') ? require('../../../assets/FA_Color.png') : { uri: item.place.photo }}
                                style={styles.itemIcon}
                            />
                        </View>
                        <View style={{ flex: 6 }}>
                            <View style={styles.justifyContentSpaceBetween}>
                                <View style={{ marginHorizontal: 12 }}>
                                    <View style={styles.smallMarginBottom}>
                                        <Text numberOfLines={1} style={styles.boldMediumText}>{item.place.name}</Text>
                                    </View>
                                    <View style={{...styles.flexDirectionRowJustifySpaceBetween, marginEnd: 50 }}>
                                        {useIcons(item.place.category, 15, 15)}
                                        <View style={styles.flexDirectionRow}>
                                            <View style={styles.itemDetailsIconMarginEnd}>
                                                {useIcons('Location', 15, 15)}
                                            </View>
                                            <Text style={styles.smallPlainText}>{isNaN(distance) ? '0.0' : distance.toFixed(1)} Km</Text>
                                        </View>
                                        <View style={styles.flexDirectionRow}>
                                            <View style={styles.itemDetailsIconMarginEnd}>
                                                {useIcons('Star', 15, 15)}
                                            </View>
                                            <Text style={styles.smallPlainText}>{placeRating.toFixed(1)}</Text>
                                        </View>
                                        <LinearGradientComponent level={item.place.premium}>
                                            <View style={styles.linearGradient} />
                                        </LinearGradientComponent>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.flexOneAlignJustifyCenter}>
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