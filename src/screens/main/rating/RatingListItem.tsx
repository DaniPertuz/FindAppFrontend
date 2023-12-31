import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useDistance, useIcons, useLocation } from '../../../hooks';
import { RootStackParams } from '../../../navigation';
import { IRate } from '../../../interfaces';

import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IRate;
    onPress: () => void;
}

const RatingListItem = ({ item, onPress }: Props) => {

    const [distance, setDistance] = useState<number>(0);

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { getCurrentLocation } = useLocation();

    const getDistance = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setDistance(useDistance(latitude, longitude, item.place.coords.latitude, item.place.coords.longitude, 'K'));
    };

    useEffect(() => {
        getDistance();
    }, []);

    return (
        <View style={styles.listItemContainer}>
            <View style={{ ...styles.flexThree, ...styles.flexDirectionRow }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={onPress}
                    style={styles.flexDirectionRow}
                >
                    <View style={styles.flexOne}>
                        <Image
                            source={(item.place.photo === '') ? require('../../../assets/FA_Color.png') : { uri: item.place.photo }}
                            style={styles.itemIcon}
                        />
                    </View>
                    <View style={{ flex: 4, paddingEnd: 30 }}>
                        <View style={styles.justifyContentSpaceBetween}>
                            <View style={{ marginHorizontal: 12 }}>
                                <View style={styles.smallMarginBottom}>
                                    <Text numberOfLines={1} style={styles.boldMediumText}>{item.place.name}</Text>
                                </View>
                                <View style={styles.flexDirectionRowJustifySpaceBetween}>
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
                                        <Text style={styles.smallPlainText}>{Number(item.rate).toFixed(1)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{ ...styles.flexOne, ...styles.justifyContentSpaceBetween }}>
                <TouchableOpacity
                    style={styles.resultsNavigationButton}
                    activeOpacity={0.9}
                    onPress={() => navigator.navigate('MapScreen', { place: item.place, search: '' })}
                >
                    <Text style={styles.mapNavigationButtonText}>Iniciar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RatingListItem;