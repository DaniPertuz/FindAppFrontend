import React, { useContext, useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PermissionsContext, PlacesContext } from '../../context';
import { styles } from '../../theme/AppTheme';
import TopButtons from '../../components/TopButtons';
import SearchResults from '../../components/SearchResults';
import { IPlace, ISearch, Location } from '../../interfaces';
import useLocation from '../../hooks/useLocation';

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
            <View style={{ marginTop: 22 }}>
                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>
                    Categorías
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 8, minWidth: 90, paddingHorizontal: 10, paddingVertical: 8 }}>
                    <View style={{ marginTop: 8 }}>
                        <Image source={require('../../assets/restaurant.png')} style={{ minHeight: 33, minWidth: 33 }} />
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Restaurantes</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Text style={{ color: '#0D0D0D', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>14 lugares</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 8, minWidth: 90, paddingHorizontal: 10, paddingVertical: 8 }}>
                    <View style={{ marginTop: 8 }}>
                        <Image source={require('../../assets/restaurant.png')} style={{ minHeight: 33, minWidth: 33 }} />
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Gasolineras</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Text style={{ color: '#0D0D0D', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>6 lugares</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 8, minWidth: 90, paddingHorizontal: 10, paddingVertical: 8 }}>
                    <View style={{ marginTop: 8 }}>
                        <Image source={require('../../assets/restaurant.png')} style={{ minHeight: 33, minWidth: 33 }} />
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Farmacias</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Text style={{ color: '#0D0D0D', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>12 lugares</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 26 }}>
                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>
                    Búsquedas populares
                </Text>
            </View>
            <View style={{ marginTop: 20 }}>
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