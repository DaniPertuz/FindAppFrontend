import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useDistance, useLocation } from '../hooks';
import { IPlace } from '../interfaces/app-interfaces';
import { RootStackParams } from '../navigation';
import { ItemIcons } from './ui';

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
                                <ItemIcons item={item} distance={distance} />
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