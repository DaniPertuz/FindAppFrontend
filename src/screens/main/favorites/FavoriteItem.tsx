import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../context';
import { PlacesContext } from '../../../context/places/PlacesContext';
import { IFavorite } from '../../../interfaces/app-interfaces';
import useDistance from '../../../hooks/useDistance';
import useLocation from '../../../hooks/useLocation';

import Favorite from '../../../assets/heart-focused.svg';
import Restaurant from '../../../assets/restaurant.svg';
import Location from '../../../assets/location.svg';
import Star from '../../../assets/star.svg';

import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IFavorite;
    onPress: () => void;
}

const FavoriteItem = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

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
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 8, flexDirection: 'row', marginBottom: 20, paddingHorizontal: 10, paddingVertical: 8 }}>
                <View style={{ flex: 1 }}>
                    <Image
                        source={{ uri: item.place.photo }}
                        style={{ borderRadius: 8, height: 42, width: 42 }}
                    />
                </View>
                <View style={{ flex: 5, marginHorizontal: 12 }}>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>{item.place.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', maxWidth: 156 }}>
                        <Restaurant height={15} width={15} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginEnd: 6 }}>
                                <Location height={15} width={15} />
                            </View>
                            <Text style={{ color: '#1F273A', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>{distance.toFixed(1)} Km</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginEnd: 6 }}>
                                <Star height={15} width={15} />
                            </View>
                            <Text style={{ color: '#1F273A', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>{Number(item.place.rate.$numberDecimal).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={removeFavorite}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Favorite height={26} width={26} />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default FavoriteItem;