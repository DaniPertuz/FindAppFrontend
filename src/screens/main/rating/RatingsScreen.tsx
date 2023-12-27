import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { AuthContext, PlacesContext } from '../../../context';
import { useIcons } from '../../../hooks/useIcons';
import { IRatingList } from '../../../interfaces';
import LoadingScreen from '../../LoadingScreen';
import RatingListItem from './RatingListItem';

import { styles } from '../../../theme/AppTheme';

const RatingsScreen = () => {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    const { user } = useContext(AuthContext);
    const { getRatingsByUser } = useContext(PlacesContext);

    const init = { total: 0, rates: [] };

    const [ratingList, setRatingList] = useState<IRatingList>(init);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        let mounted = true;
        getRatingsByUser(user?._id!).then((data) => {
            if (mounted) {
                setRatingList(data);
                setDisplay(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, [ratingList]);

    return (
        <>
            {(!display)
                ? <LoadingScreen />
                :
                <View
                    style={{ paddingTop: (Platform.OS === 'ios') ? top : top + 20, ...styles.stackScreenContainer }}>
                    <View style={styles.flexDirectionRow}>
                        <View style={styles.flexOneAlignItemsCenter}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={() => navigation.goBack()}
                            >
                                {useIcons('Back', 20, 20)}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexNineAlignItemsCenter}>
                            <Text numberOfLines={1} style={styles.stackScreenTitle}>
                                Tus calificaciones
                            </Text>
                        </View>
                        <View style={styles.flexOne} />
                    </View>
                    <View style={styles.largeMarginTop}>
                        {ratingList.rates.length === 0
                            ?
                            <View style={styles.alignItemsCenter}>
                                <Text style={styles.boldMediumText}>No se han registrado calificaciones aún</Text>
                            </View>
                            :
                            <FlatList
                                data={ratingList.rates}
                                keyExtractor={(item) => item._id!}
                                renderItem={({ item }) =>
                                    <RatingListItem
                                        item={item}
                                        onPress={() => navigation.navigate('PlaceDetailsScreen', { place: item.place, search: '' })}
                                    />
                                }
                            />
                        }
                    </View>
                </View>
            }
        </>
    );
};

export default RatingsScreen;