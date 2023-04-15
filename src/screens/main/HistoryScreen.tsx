import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext } from '../../context';
import HistoryItem from '../../components/HistoryItem';
import LoadingScreen from '../LoadingScreen';
import { IHistory } from '../../interfaces';

import { styles } from '../../theme/AppTheme';

const HistoryScreen = () => {

    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    const { user } = useContext(AuthContext);
    const { getHistorical } = useContext(PlacesContext);

    const [historical, setHistorical] = useState<IHistory>({ total: 0, services: [] });

    const loadFavorites = async () => {
        const hist = await getHistorical(user?._id!);
        setHistorical(hist);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <>
            {(historical.total === 0)
                ?
                <LoadingScreen />
                :
                <View
                    style={{
                        ...styles.topContainer,
                        paddingTop: (Platform.OS === 'ios') ? top : top + 20
                    }}
                >
                    <FlatList
                        data={historical.services}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) =>
                            <HistoryItem
                                item={item}
                                onPress={() => navigation.navigate('MapScreen', { place: item.place, search: item.search })}
                            />
                        }
                    />
                </View>
            }
        </>
    );
};

export default HistoryScreen;