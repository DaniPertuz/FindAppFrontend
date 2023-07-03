import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import useDistance from '../hooks/useDistance';
import useLocation from '../hooks/useLocation';
import { IPlace } from '../interfaces/app-interfaces';
import { RootStackParams } from '../navigation';

import Location from '../assets/location.svg';
import Restaurant from '../assets/restaurant.svg';
import Star from '../assets/star.svg';

import { styles } from '../theme/AppTheme';

interface Props {
    item: IPlace;
    onPress: () => void;
}

const SearchResults = ({ item, onPress }: Props) => {

    const [distance, setDistance] = useState<number>(0);

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { getCurrentLocation } = useLocation();

    const getDistance = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setDistance(useDistance(latitude, longitude, item.coords.latitude, item.coords.longitude, 'K'));
    };

    useEffect(() => {
        getDistance();
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={styles.listItemContainer}
            >
                <Image
                    source={(item.photo === '') ? require('../assets/FA_Color.png') : { uri: item.photo }}
                    style={styles.itemIcon}
                />
                <View style={{ flex: 4, marginHorizontal: 12, paddingEnd: 24 }}>
                    <View style={{ justifyContent: 'space-between' }}>
                        <View style={{ flex: 5, marginHorizontal: 12 }}>
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>{item.name}</Text>
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
                                    <Text style={{ color: '#1F273A', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>{Number(item.rate.$numberDecimal).toFixed(1)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flex: 2,
                        justifyContent: 'space-between'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: 'center', backgroundColor: '#207CFD', borderRadius: 4, justifyContent: 'center', marginVertical: 10, paddingHorizontal: 14, flex: 1
                        }}
                        activeOpacity={0.9}
                        onPress={() => navigator.navigate('MapScreen', { place: item, search: item.name })}
                    >
                        <Text style={{ color: 'rgba(250, 250, 250, 0.98)', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>
                            Iniciar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SearchResults;