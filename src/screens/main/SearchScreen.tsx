import React, { useContext, useState } from 'react';
import { FlatList, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlacesContext } from '../../context';
import { RootStackParams } from '../../navigation';
import { useForm } from '../../hooks/useForm';
import useLocation from '../../hooks/useLocation';
import { IPlace, IProduct, ISearch, Location } from '../../interfaces';
import SearchProductResults from '../../components/SearchProductResults';
import SearchResults from '../../components/SearchResults';

import Back from '../../assets/back.svg';
import Mask from '../../assets/mask.svg';
import Search from '../../assets/search.svg';

import { styles } from '../../theme/AppTheme';

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { search, onChange } = useForm({
        search: ''
    });

    const { currentUserLocation } = useLocation();

    const { searchPlace } = useContext(PlacesContext);

    const init = {
        keyword: search,
        totalPlaces: [],
        places: [],
        totalProducts: [],
        products: []
    };

    const [searchResults, setSearchResults] = useState<ISearch>(init);
    const [display, setDisplay] = useState(false);

    const distance = (coor1: Location, coor2: Location) => {
        const x = coor2.longitude - coor1.longitude;
        const y = coor2.latitude - coor1.latitude;
        return Math.sqrt((x * x) + (y * y));
    };

    const sortPlacesByDistance = (coordinates: IPlace[], point: Location) => coordinates.sort((a: IPlace, b: IPlace) => distance(a.coords, point) - distance(b.coords, point));

    const sortProductsByDistance = (coordinates: IProduct[], point: Location) => coordinates.sort((a: IProduct, b: IProduct) => distance(a.place[0].coords, point) - distance(b.place[0].coords, point));

    const setPlaceResults = () => sortPlacesByDistance(searchResults.places, currentUserLocation);

    const setProductResults = () => sortProductsByDistance(searchResults.products, currentUserLocation);

    const getSearchResults = async () => {
        const results = await searchPlace(search);
        setSearchResults(results);
        setDisplay(true);
    };

    return (
        <View style={{ backgroundColor: 'rgba(104, 110, 222, 0.1)', flex: 1, paddingHorizontal: 20, paddingTop: (Platform.OS === 'ios') ? top : top + 20 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.goBack()}
                    >
                        <Back height={20} width={20} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 9, alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ color: '#1F273A', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20 }}>
                        Buscador
                    </Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
            <View style={{ marginTop: 35 }}>
                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>
                    ¿Qué te gustaría buscar hoy?
                </Text>
            </View>
            <View style={{ marginTop: 18 }}>
                <View style={styles.updateInputFieldContainer}>
                    <Search height={25} width={25} />
                    <TextInput
                        placeholder='Escribe una palabra o frase'
                        placeholderTextColor='#9A9A9A'
                        keyboardType='default'
                        style={[
                            styles.inputField,
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'search')}
                        value={search}
                    />
                </View>
            </View>
            <View style={{ marginTop: 21, paddingHorizontal: 22 }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={getSearchResults}
                    style={{ backgroundColor: '#207CFD', borderRadius: 8, alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10 }}
                >
                    <Text style={{ color: 'rgba(250, 250, 250, 0.98)', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22 }}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
                {/* {(display === false) && <LoadingScreen />} */}

                {((display === true) && (searchResults.totalPlaces.length === 0 && searchResults.totalProducts.length === 0)) &&
                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <Mask height={73} width={73} />
                        <View style={{ marginTop: 23 }}>
                            <Text style={{ color: '#081023', fontSize: 18, fontWeight: '600', letterSpacing: -0.36 }}>
                                No encontramos lugares con esta palabra. Intenta nuevamente.
                            </Text>
                        </View>
                    </View>
                }

                {((display === true) && (searchResults.places.length !== 0 || searchResults.products.length !== 0)) &&
                    <View style={{ height: '100%' }}>
                        <View style={{ maxHeight: '40%', paddingVertical: 10 }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>
                                    {(searchResults.places.length === 0) ? '0' : searchResults.totalPlaces[0].totalPlaces} {(searchResults.places.length !== 1) ? 'Lugares' : 'Lugar'}
                                </Text>
                            </View>
                            <FlatList
                                data={setPlaceResults()}
                                renderItem={({ item }) => (
                                    <SearchResults item={item} onPress={() => navigation.navigate('PlaceDetailsScreen', { place: item, search })} />
                                )}
                            />
                        </View>
                        <View style={{ maxHeight: '40%', paddingVertical: 10 }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>
                                    {(searchResults.products.length === 0) ? '0' : searchResults.totalProducts[0].totalProducts} {(searchResults.products.length !== 1) ? 'Productos' : 'Producto'}
                                </Text>
                            </View>
                            <FlatList
                                data={setProductResults()}
                                renderItem={({ item }) => (
                                    <SearchProductResults item={item} onPress={() => navigation.navigate('ProductDetailsScreen', { product: item, search })} />
                                )}
                            />
                        </View>
                    </View>
                }
            </View>
        </View>
    );
};

export default SearchScreen;