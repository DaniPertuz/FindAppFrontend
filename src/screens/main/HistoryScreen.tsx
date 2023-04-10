import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext } from '../../context';
import { IHistory } from '../../interfaces';
import SavedPlace from '../../components/SavedPlace';

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
        <View
            style={{
                ...styles.topContainer,
                paddingTop: (Platform.OS === 'ios') ? top : top + 20
            }}
        >
            <FlatList
                data={historical.services}
                keyExtractor={(item) => item.place._id}
                renderItem={({ item }) => {
                    return (
                        <SavedPlace
                            item={item}
                            onPress={() => navigation.navigate('MapScreen', { place: item.place.address })}
                        />
                    );
                }}
            />
        </View>
    );
};

export default HistoryScreen;