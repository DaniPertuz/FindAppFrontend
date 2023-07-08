import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PermissionsContext, PlacesContext } from '../../context';
import TopButtons from '../../components/TopButtons';
import SearchResults from '../../components/SearchResults';
import { IPlace, ISearch, Location } from '../../interfaces';
import useLocation from '../../hooks/useLocation';

import Restaurant from '../../assets/restaurant.svg';

import { styles } from '../../theme/AppTheme';

const MainScreen = () => {

    const init = {
        keyword: '',
        totalPlaces: [],
        places: [],
        totalProducts: [],
        products: []
    };

    const [search, setSearch] = useState<string>('');
    const [display, setDisplay] = useState(false);
    const [searchResults, setSearchResults] = useState<ISearch>(init);

    const { askLocationPermission } = useContext(PermissionsContext);
    const { searchPlace } = useContext(PlacesContext);
    const { currentUserLocation } = useLocation();

    const navigation = useNavigation();

    const distance = (coor1: Location, coor2: Location) => {
        const x = coor2.longitude - coor1.longitude;
        const y = coor2.latitude - coor1.latitude;
        return Math.sqrt((x * x) + (y * y));
    };
    const sortPlacesByDistance = (coordinates: IPlace[], point: Location) => coordinates.sort((a: IPlace, b: IPlace) => distance(a.coords, point) - distance(b.coords, point));
    const setPlaceResults = () => sortPlacesByDistance(searchResults.places, currentUserLocation);

    // useEffect(() => {
    //     askLocationPermission();
    // }, []);

    useEffect(() => {
        let mounted = true;
        searchPlace('Portal').then((data) => {
            if (mounted) {
                setSearchResults(data);
                setDisplay(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <View style={styles.mainScreenContainer}>
            <TopButtons />
            <View style={styles.mediumMarginTop}>
                <Text style={styles.boldMediumText}>Categorías</Text>
            </View>
            <View style={{ ...styles.flexDirectionRowJustifyAround, ...styles.mediumMarginTop }}>
                <View style={styles.largeItem}>
                    <View style={styles.extraSmallMarginTop}>
                        <Restaurant height={33} width={33} />
                    </View>
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.plainSmallText}>Restaurantes</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.largeItemText}>14 lugares</Text>
                    </View>
                </View>
                <View style={styles.largeItem}>
                    <View style={styles.extraSmallMarginTop}>
                        <Restaurant height={33} width={33} />
                    </View>
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.plainSmallText}>Gasolineras</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.largeItemText}>6 lugares</Text>
                    </View>
                </View>
                <View style={styles.largeItem}>
                    <View style={styles.extraSmallMarginTop}>
                        <Restaurant height={33} width={33} />
                    </View>
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.plainSmallText}>Farmacias</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.largeItemText}>12 lugares</Text>
                    </View>
                </View>
            </View>
            <View style={styles.largeMarginTop}>
                <Text style={styles.boldMediumText}>Búsquedas populares</Text>
            </View>
            <View style={styles.mediumMarginTop}>
                <FlatList
                    data={setPlaceResults()}
                    scrollEnabled
                    renderItem={({ item }) => (
                        <SearchResults item={item} onPress={() => navigation.navigate('PlaceDetailsScreen', { place: item, search })} />
                    )}
                />
            </View>
        </View>
    );
};

export default MainScreen;