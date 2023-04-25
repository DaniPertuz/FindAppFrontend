import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext } from '../../../context';
import HistoryItem from './HistoryItem';
import LoadingScreen from '../../LoadingScreen';
import { IHistory } from '../../../interfaces';

import { styles } from '../../../theme/AppTheme';

const HistoryScreen = () => {

    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    const { user } = useContext(AuthContext);
    const { getHistorical } = useContext(PlacesContext);

    const init = { total: 0, services: [] };

    const [historical, setHistorical] = useState<IHistory>(init);
    const [display, setDisplay] = useState(false);

    const setHistoricalData = async () => {
        const data = await getHistorical(user?._id!);
        if (data) {
            setHistorical(data);
            setDisplay(true);
        }
    };

    useEffect(() => {
        setHistoricalData();
    }, [historical]);

    return (
        <>
            {(display === false) && <LoadingScreen />}

            {(display === true) &&
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