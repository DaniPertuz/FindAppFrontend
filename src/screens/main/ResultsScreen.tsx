import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { SearchStackParams } from '../../navigation/SearchNavigator';
import SearchResults from '../../components/SearchResults';
import { PlacesContext } from '../../context';
import { ISearch } from '../../interfaces/app-interfaces';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<SearchStackParams, 'ResultsScreen'> { };

const ResultsScreen = ({ navigation, route }: Props) => {
    const { search = '' } = route.params;
    const { top } = useSafeAreaInsets();

    const { searchPlace } = useContext(PlacesContext);

    const [searchResults, setSearchResults] = useState<ISearch>({
        keyword: search,
        totalPlaces: 0,
        places: [],
        totalProducts: 0,
        products: []
    });

    const setData = async () => {
        const results = await searchPlace(search);
        setSearchResults(results);
    };

    useEffect(() => {
        setData();
    }, []);

    const validateResults = () => {
        return (searchResults.places.some(keyValue => {
            if (keyValue.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
                return true;
            }
            return false;
        })
            ||
            searchResults.products.some(keyValue => {
                if (keyValue.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
                    return true;
                }
                return false;
            })
        );
    };

    const setResults = () => {
        return searchResults.places.filter(item => item.name.toLocaleLowerCase() === search.toLocaleLowerCase());
    };

    return (
        <View style={{ flex: 1 }}>
            {validateResults() === false
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
                                <SearchResults item={item} onPress={() => navigation.navigate('MapScreen', { place: item.address, from: 'ResultsScreen' })} />
                            )}
                        />
                    </View>
                </>
            }
        </View >
    );
};

export default ResultsScreen;