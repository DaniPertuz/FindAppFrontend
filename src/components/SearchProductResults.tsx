import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useDistance from '../hooks/useDistance';
import useLocation from '../hooks/useLocation';
import { IProduct } from '../interfaces/app-interfaces';

import Location from '../assets/location.svg';
import Restaurant from '../assets/restaurant.svg';
import Star from '../assets/star.svg';

import { styles } from '../theme/AppTheme';

interface Props {
    item: IProduct;
    onPress: () => void;
}

const SearchProductResults = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

    const [distance, setDistance] = useState<number>(0);

    const { getCurrentLocation } = useLocation();

    useEffect(() => {
        getDistance();
    }, []);

    const getDistance = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setDistance(useDistance(latitude, longitude, item.place[0].coords.latitude, item.place[0].coords.longitude, 'K'));
    };

    return (
        <View style={styles.listItemContainer}>
            <View style={{ flex: 3, flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={onPress}
                    style={{ flexDirection: 'row' }}
                >
                    <View style={{ flex: 1 }}>
                        <Image
                            source={(item.img === '') ? require('../assets/FA_Color.png') : { uri: item.img }}
                            style={styles.itemIcon}
                        />
                    </View>
                    <View style={{ flex: 4, paddingEnd: 30 }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <View style={{ marginHorizontal: 12 }}>
                                <View style={{ marginBottom: 8 }}>
                                    <Text numberOfLines={1} style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>{item.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                        <Text style={{ color: '#1F273A', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>{Number(item.rate.$numberDecimal).toFixed(1)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center', backgroundColor: '#207CFD', borderRadius: 4, margin: 10, paddingVertical: 1
                    }}
                    activeOpacity={0.9}
                    onPress={() => navigator.navigate('MapScreen', { place: item.place[0], search: item.name })}
                >
                    <Text style={{ color: 'rgba(250, 250, 250, 0.98)', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>
                        Iniciar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchProductResults;