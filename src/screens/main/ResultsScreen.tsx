import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../../navigation';
import SearchResults from '../../components/SearchResults';
import { PlacesContext } from '../../context';
import { IPlace, ISearch, Location } from '../../interfaces/app-interfaces';

import { styles } from '../../theme/AppTheme';
import LoadingScreen from '../LoadingScreen';
import useLocation from '../../hooks/useLocation';

interface Props extends StackScreenProps<RootStackParams, 'ResultsScreen'> { };

const ResultsScreen = ({ navigation, route }: Props) => {
    const { search } = route.params;

    const { top } = useSafeAreaInsets();
    const { currentUserLocation } = useLocation();

    const { searchPlace } = useContext(PlacesContext);

    const init = {
        keyword: search,
        totalPlaces: 0,
        places: [],
        totalProducts: 0,
        products: []
    };

    const [searchResults, setSearchResults] = useState<ISearch>(init);

    const setData = async () => {
        const results = await searchPlace(search);
        setSearchResults(results);
    };

    useEffect(() => {
        setData();
    }, []);

    const distance = (coor1: Location, coor2: Location) => {
        const x = coor2.longitude - coor1.longitude;
        const y = coor2.latitude - coor1.latitude;
        return Math.sqrt((x * x) + (y * y));
    };

    const sortByDistance = (coordinates: IPlace[], point: Location) => coordinates.sort((a: IPlace, b: IPlace) => distance(a.coords, point) - distance(b.coords, point));

    const setResults = () => sortByDistance(searchResults.places, currentUserLocation);

    return (
        <View style={{ flex: 1 }}>
            {((searchResults === init))
                ?
                <LoadingScreen />
                :
                ((searchResults.totalPlaces === 0) && (searchResults.totalProducts === 0))
                    ?
                    <View style={styles.center}>
                        <Text style={styles.secondaryFontStyle}>
                            No hay lugares que coincidan con "{search}"
                        </Text>
                    </View>
                    :
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                            <Text
                                style={styles.blackPrimaryFontStyle}
                            >
                                Buscas: {searchResults.keyword}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.topContainer,
                                flex: 10,
                                paddingTop: (Platform.OS === 'ios') ? top : top + 20
                            }}
                        >
                            <FlatList
                                data={setResults()}
                                renderItem={({ item }) => (
                                    <SearchResults item={item} onPress={() => navigation.navigate('MapScreen', { place: item, search })} />
                                )}
                            />
                        </View>
                    </>
            }
        </View >
    );
};

export default ResultsScreen;