import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

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
        <View style={styles.listItemContainer}>
            <View style={{ flex: 3, flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={onPress}
                    style={styles.flexDirectionRow}
                >
                    <View style={styles.flexOne}>
                        <Image
                            source={(item.photo === '') ? require('../assets/FA_Color.png') : { uri: item.photo }}
                            style={styles.itemIcon}
                        />
                    </View>
                    <View style={{ flex: 4, paddingEnd: 30 }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <View style={{ marginHorizontal: 12 }}>
                                <View style={styles.smallMarginBottom}>
                                    <Text numberOfLines={1} style={styles.boldMediumText}>{item.name}</Text>
                                </View>
                                <View style={styles.flexDirectionRowJustifySpaceBetween}>
                                    <Restaurant height={15} width={15} />
                                    <View style={styles.flexDirectionRow}>
                                        <View style={styles.itemDetailsIconMarginEnd}>
                                            <Location height={15} width={15} />
                                        </View>
                                        <Text style={styles.smallPlainText}>{distance.toFixed(1)} Km</Text>
                                    </View>
                                    <View style={styles.flexDirectionRow}>
                                        <View style={styles.itemDetailsIconMarginEnd}>
                                            <Star height={15} width={15} />
                                        </View>
                                        <Text style={styles.smallPlainText}>{Number(item.rate.$numberDecimal).toFixed(1)}</Text>
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
                    onPress={() => navigator.navigate('MapScreen', { place: item, search: item.name })}
                >
                    <Text style={{ color: 'rgba(250, 250, 250, 0.98)', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>
                        Iniciar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchResults;