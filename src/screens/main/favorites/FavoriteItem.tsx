import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

import { PlacesContext } from '../../../context/places/PlacesContext';
import { IFavorite } from '../../../interfaces/app-interfaces';
import useDistance from '../../../hooks/useDistance';
import useLocation from '../../../hooks/useLocation';
import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IFavorite;
    onPress: () => void;
}

const FavoriteItem = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

    const { getPlaceRating } = useContext(PlacesContext);

    const [placeRating, setPlaceRating] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0)

    const { getCurrentLocation } = useLocation();

    const setRating = async () => {
        setPlaceRating(await getPlaceRating(item.place._id));
    };

    useEffect(() => {
        setRating();
    }, []);

    const getDistance = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setDistance(useDistance(latitude, longitude, item.place.coords.latitude, item.place.coords.longitude, 'K'));
    };

    useEffect(() => {
      getDistance();
    }, [])

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
                        <Image source={require('../../../assets/restaurant.png')} style={{ height: 15, width: 15 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginEnd: 6 }}>
                                <Image source={require('../../../assets/location.png')} style={{ height: 15, width: 15 }} />
                            </View>
                            <Text style={{ color: '#1F273A', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>{distance.toFixed(1)} Km</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginEnd: 6 }}>
                                <Image source={require('../../../assets/star.png')} style={{ height: 15, width: 15 }} />
                            </View>
                            <Text style={{ color: '#1F273A', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>{placeRating.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../../assets/heart-favorite.png')} style={{ height: 26, width: 26 }} />
                </View>
            </View>
            {/* {(placeRating !== 0) &&
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPress}
                >
                    <View
                        style={styles.listItemContainer}
                    >
                        <Image
                            source={{ uri: item.place.photo }}
                            style={styles.itemIcon}
                        />
                        <Text style={{
                            ...styles.blackPrimaryFontStyle,
                            flex: 4,
                            marginHorizontal: 10,
                            paddingEnd: 20
                        }}>
                            {item.place.name}
                        </Text>
                        <View
                            style={{
                                flex: 2,
                                justifyContent: 'space-between'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center', flex: 1
                                }}
                                activeOpacity={0.9}
                                onPress={() => navigator.navigate('ReviewsScreen', { place: item.place._id })}
                            >
                                <Text style={styles.linkStyle}>
                                    {placeRating.toFixed(2)}
                                </Text>
                                <Rating
                                    fractions={2}
                                    imageSize={20}
                                    minValue={1}
                                    ratingBackgroundColor='#FFFFFF'
                                    ratingCount={5}
                                    ratingTextColor='#5856D6'
                                    readonly
                                    showReadOnlyText={false}
                                    startingValue={placeRating}
                                    style={{ flex: 2 }}
                                    tintColor='#EBEBEB'
                                    type='star'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            } */}
        </>
    );
};

export default FavoriteItem;