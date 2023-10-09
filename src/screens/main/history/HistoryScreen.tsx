import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext } from '../../../context';
import SearchResults from '../../../components/SearchResults';
import { useIcons } from '../../../hooks/useIcons';
import { IHistory } from '../../../interfaces';
import LoadingScreen from '../../LoadingScreen';

import { styles } from '../../../theme/AppTheme';

const HistoryScreen = () => {

    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    const { user } = useContext(AuthContext);
    const { getHistorical } = useContext(PlacesContext);

    const init = { total: 0, services: [] };

    const [historical, setHistorical] = useState<IHistory>(init);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        let mounted = true;
        getHistorical(user?._id!).then((data) => {
            if (mounted) {
                setHistorical(data);
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
                            <Text numberOfLines={1} style={styles.stackScreenTitle}>
                                Historial
                            </Text>
                        </View>
                        <View style={styles.flexOne} />
                    </View>
                    <View style={styles.largeMarginTop}>
                        {historical.services.length === 0
                            ?
                            <View style={styles.alignItemsCenter}>
                                <Text style={styles.boldMediumText}>No se han registrado viajes aún</Text>
                            </View>
                            :
                            <FlatList
                                data={historical.services}
                                keyExtractor={(_, index) => `${index}`}
                                renderItem={({ item }) =>
                                    <SearchResults
                                        item={item.place}
                                        onPress={() => navigation.navigate('PlaceDetailsScreen', { place: item.place, search: item.search })}
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

export default HistoryScreen;