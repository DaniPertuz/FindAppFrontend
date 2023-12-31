import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDistance, useIcons, useLocation } from '../hooks';
import { IProduct } from '../interfaces/app-interfaces';

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
            <View style={{ flex: 3, ...styles.flexDirectionRow }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={onPress}
                    style={styles.flexDirectionRow}
                >
                    <View style={styles.flexOne}>
                        <Image
                            source={(item.img === '') ? require('../assets/FA_Color.png') : { uri: item.img }}
                            style={styles.itemIcon}
                        />
                    </View>
                    <View style={{ flex: 4, paddingEnd: 30 }}>
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
                                        <Text style={styles.smallPlainText}>{distance.toFixed(1)} Km</Text>
                                    </View>
                                    <View style={styles.flexDirectionRow}>
                                        <View style={styles.itemDetailsIconMarginEnd}>
                                            {useIcons('Star', 15, 15)}
                                        </View>
                                        <Text style={styles.smallPlainText}>{Number(item.rate.$numberDecimal).toFixed(1)}</Text>
                                    </View>
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
                    onPress={() => navigator.navigate('MapScreen', { place: item.place[0], search: item.name })}
                >
                    <Text style={styles.buttonText}>Iniciar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchProductResults;