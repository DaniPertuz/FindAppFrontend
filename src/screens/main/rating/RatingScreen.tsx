import React, { useState, useEffect, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext, RatingContext } from '../../../context';
import LoadingScreen from '../../LoadingScreen';
import RateItem from './RateItem';

import { IService } from '../../../interfaces/app-interfaces';
import { styles } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<any, any> { };

const RatingScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();

    const { getAllRatings } = useContext(RatingContext);
    const { getHistorical } = useContext(PlacesContext);
    const { user } = useContext(AuthContext);

    const [placesList, setPlacesList] = useState<IService[]>([]);
    const [sw, setSw] = useState(false);

    const setFilteredRatings = async () => {
        const { rates } = await getAllRatings();
        const hist = await getHistorical(user?._id!);

        const aux: IService[] = [];
        const ratesFiltered = rates.filter(rate => rate.user === user?._id);

        for (let i = 0; i < hist.services.length; i++) {
            const service = hist.services[i];
            for (let j = 0; j < ratesFiltered.length; j++) {
                const rate = ratesFiltered[j];
                if ((rate.user === user?._id) && (rate.place!._id !== service.place._id)) {
                    aux.push(service);
                }
                setSw((rate.user === user?._id) && (rate.place!._id === service.place._id));
            }
        }
        setPlacesList(aux);
    };

    useEffect(() => {
        setFilteredRatings();
        getHistorical(user?._id!);
    }, []);

    return (
        <>
            {(placesList.length === 0)
                ? <LoadingScreen />
                :
                <View
                    style={{
                        ...styles.topContainer,
                        paddingTop: (Platform.OS === 'ios') ? top : top + 20
                    }}
                >
                    {(sw === false)
                        ?
                        <View style={styles.center}>
                            <Text style={styles.secondaryFontStyle}>No hay sitios pendientes por calificar</Text>
                        </View>
                        :
                        <FlatList
                            data={placesList}
                            keyExtractor={m => m.date}
                            renderItem={({ item }) => (
                                <RateItem item={item} onPress={() => { navigation.navigate('RateScreen', { item }); }} />
                            )}
                        />
                    }
                </View>
            }
        </>
    );
};

export default RatingScreen;