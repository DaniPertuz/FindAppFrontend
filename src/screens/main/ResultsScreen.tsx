import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../../navigation';
import SearchResults from '../../components/SearchResults';
import SearchProductResults from '../../components/SearchProductResults';
import { PlacesContext } from '../../context';
import { IPlace, IProduct, ISearch, Location } from '../../interfaces/app-interfaces';

import { styles } from '../../theme/AppTheme';
import LoadingScreen from '../LoadingScreen';
import useLocation from '../../hooks/useLocation';

interface Props extends StackScreenProps<RootStackParams, 'ResultsScreen'> { };

const ResultsScreen = ({ navigation, route }: Props) => {
    const { search } = route.params;

    const { top } = useSafeAreaInsets();
    const { height } = useWindowDimensions();
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
    const [display, setDisplay] = useState(false);

    const setData = async () => {
        const results = await searchPlace(search);
        if (results) {
            setSearchResults(results);
            setDisplay(true);
        }
    };

    useEffect(() => {
        setData();
    }, []);

    const distance = (coor1: Location, coor2: Location) => {
        const x = coor2.longitude - coor1.longitude;
        const y = coor2.latitude - coor1.latitude;
        return Math.sqrt((x * x) + (y * y));
    };

    const sortPlacesByDistance = (coordinates: IPlace[], point: Location) => coordinates.sort((a: IPlace, b: IPlace) => distance(a.coords, point) - distance(b.coords, point));

    const sortProductsByDistance = (coordinates: IProduct[], point: Location) => coordinates.sort((a: IProduct, b: IProduct) => distance(a.place.coords, point) - distance(b.place.coords, point));

    const setPlaceResults = () => sortPlacesByDistance(searchResults.places, currentUserLocation);

    const setProductResults = () => sortProductsByDistance(searchResults.products, currentUserLocation);

    return (
        <View style={{ flex: 1 }}>
            {(display === false) && <LoadingScreen />}

            {((display === true) && (searchResults.totalPlaces === 0 && searchResults.totalProducts === 0)) &&
                <View style={styles.center}>
                    <Text style={styles.secondaryFontStyle}>
                        No hay lugares que coincidan con "{search}"
                    </Text>
                </View>
            }

            {((display === true) && (searchResults.totalPlaces !== 0 || searchResults.totalProducts !== 0)) &&
                <>
                    <View style={styles.resultsCenterContainer}>
                        <Text
                            style={styles.blackPrimaryFontStyle}
                        >
                            Buscas: {searchResults.keyword}
                        </Text>
                    </View>
                    <View style={{ paddingStart: 15 }}>
                        <Text style={styles.blackPrimaryFontStyle}>{searchResults.totalPlaces} {(searchResults.totalPlaces !== 1) ? 'Lugares' : 'Lugar'}</Text>
                    </View>
                    <View
                        style={{
                            ...styles.topContainer,
                            flex: 4,
                            paddingTop: (Platform.OS === 'ios') ? top : top + 20
                        }}
                    >
                        <FlatList
                            data={setPlaceResults()}
                            style={{ maxHeight: height / 3 }}
                            renderItem={({ item }) => (
                                <SearchResults item={item} onPress={() => navigation.navigate('PlaceDetailsScreen', { place: item, search })} />
                            )}
                        />
                    </View>
                    <View style={{ paddingStart: 15 }}>
                        <Text style={styles.blackPrimaryFontStyle}>{searchResults.totalProducts} {(searchResults.totalProducts !== 1) ? 'Productos' : 'Producto'}</Text>
                    </View>
                    <View
                        style={{
                            ...styles.topContainer,
                            flex: 4,
                            paddingTop: (Platform.OS === 'ios') ? top : top + 20
                        }}
                    >
                        <FlatList
                            data={setProductResults()}
                            style={{ maxHeight: height / 3 }}
                            renderItem={({ item }) => (
                                <SearchProductResults item={item} onPress={() => navigation.navigate('ProductDetailsScreen', { product: item, search })} />
                            )}
                        />
                    </View>
                </>
            }
        </View >
    );
};

export default ResultsScreen;