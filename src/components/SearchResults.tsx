import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useDistance, useIcons, useLocation } from '../hooks';
import { IPlace } from '../interfaces/app-interfaces';
import { RootStackParams } from '../navigation';
import LinearGradientComponent from './LinearGradientComponent';

import { styles } from '../theme/AppTheme';

interface Props {
    item: IPlace;
    onPress: () => void;
}

const SearchResults = ({ item, onPress }: Props) => {

    const [distance, setDistance] = useState<number>(0);

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { getCurrentLocation, currentUserLocation } = useLocation();

    const getDistance = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setDistance(useDistance(latitude, longitude, item.coords.latitude, item.coords.longitude, 'K'));
    };

    useEffect(() => {
        getDistance();
    }, [currentUserLocation]);

    return (
        <>
            {(item.address !== '') &&
                <View style={styles.listItemContainer}>
                    <View style={{ flex: 3, ...styles.flexDirectionRow }}>
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
                            <View style={{ flex: 5 }}>
                                <View style={styles.justifyContentSpaceBetween}>
                                    <View style={{ marginHorizontal: 12 }}>
                                        <View style={styles.smallMarginBottom}>
                                            <Text numberOfLines={1} style={styles.boldMediumText}>{item.name}</Text>
                                        </View>
                                        <View style={styles.flexDirectionRowJustifySpaceBetween}>
                                            {useIcons(item.category, 15, 15)}
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
                                                <Text style={styles.smallPlainText}>{Number(item.rate.$numberDecimal).toFixed(1)}</Text>
                                            </View>
                                            <LinearGradientComponent level={item.premium}>
                                                <View style={styles.linearGradient} />
                                            </LinearGradientComponent>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.flexOne, ...styles.justifyContentSpaceBetween }}>
                        <TouchableOpacity
                            style={styles.resultsNavigationButton}
                            activeOpacity={0.9}
                            onPress={() => navigator.navigate('MapScreen', { place: item, search: item.name })}
                        >
                            <Text style={styles.buttonText}>Iniciar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    );
};

export default SearchResults;