import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoadingScreen from '../LoadingScreen';
import SearchResults from '../../components/SearchResults';
import { PlacesContext } from '../../context';
import { useIcons } from '../../hooks/useIcons';
import { IPlace } from '../../interfaces';
import { RootStackParams } from '../../navigation';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'PlacesScreen'> { };

const PlacesScreen = ({ route }: Props) => {
    const { category } = route.params;

    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    const { getPlacesByCategory } = useContext(PlacesContext);

    const [places, setPlaces] = useState<IPlace[]>([]);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        let mounted = true;
        getPlacesByCategory(category).then((data) => {
            if (mounted) {
                setPlaces(data);
                setDisplay(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <>
            {(display === false) && <LoadingScreen />}

            {(display === true) &&
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
                            <Text numberOfLines={1} style={styles.stackScreenTitle}>{category}</Text>
                        </View>
                        <View style={styles.flexOne} />
                    </View>
                    <View style={styles.largeMarginTop}>
                        <FlatList
                            data={places}
                            keyExtractor={(item) => item._id!}
                            scrollEnabled
                            renderItem={({ item }) =>
                                <SearchResults item={item} onPress={() => navigation.navigate('PlaceDetailsScreen', { place: item, search: category })} />
                            }
                        />
                    </View>
                </View>
            }
        </>
    );
};

export default PlacesScreen;