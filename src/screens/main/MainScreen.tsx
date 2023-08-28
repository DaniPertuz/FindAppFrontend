import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PlacesContext } from '../../context';
import Categories from '../../components/Categories';
import TopButtons from '../../components/TopButtons';
import SearchResults from '../../components/SearchResults';
import { IPlaces } from '../../interfaces';

import { styles } from '../../theme/AppTheme';

const MainScreen = () => {

    const init = {
        total: 0,
        places: []
    };

    const [results, setResults] = useState<IPlaces>(init);
    const [popular, setPopular] = useState<IPlaces>(init);
    const [placeCategories, setPlaceCategories] = useState<string[]>([]);

    const { getPlaces, getPopularPlaces } = useContext(PlacesContext);

    const navigation = useNavigation();

    const getPlaceCategories = () => {
        const categories = results.places.map(place => place.category);
        const filteredCategories: string[] = categories.filter((item, i, ar) => ar.indexOf(item) === i).sort().flat();
        filteredCategories.push(filteredCategories.splice(filteredCategories.indexOf('Otro'), 1)[0]);
        setPlaceCategories(filteredCategories);
    };

    const getTotalPlacesByCategory = (category: string) => {
        let count: number = 0;
        const categories = results.places.map(place => place.category).flat();
        categories.forEach((cat: string) => {
            if (cat === category) {
                count++;
            }
        });
        return count;
    };

    useEffect(() => {
        let mounted = true;
        getPlaces().then((data) => {
            if (mounted) {
                setResults(data);
            }
        });
        return () => {
            mounted = false;
        };
    }, [results]);

    useEffect(() => {
        let mounted = true;
        getPopularPlaces().then((data) => {
            if (mounted) {
                setPopular(data);
            }
        });
        return () => {
            mounted = false;
        };
    }, [popular]);

    useEffect(() => {
        getPlaceCategories();
    }, [results]);

    return (
        <View style={styles.mainBackground}>
            <View style={styles.mainScreenContainer}>
                <TopButtons />
                <View style={styles.mediumMarginTop}>
                    <Text style={styles.boldMediumText}>Categorías</Text>
                </View>
                <View style={{ ...styles.flexDirectionRowJustifyAround, ...styles.mediumMarginTop }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {placeCategories.map((category, index) => (
                            <Categories key={index} name={category} count={getTotalPlacesByCategory(category)} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.largeMarginTop}>
                    <Text style={styles.boldMediumText}>Búsquedas populares</Text>
                </View>
                <View style={{ ...styles.mediumMarginTop, marginBottom: 270 }}>
                    <FlatList
                        data={popular.places}
                        scrollEnabled={popular.total > 5}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <SearchResults item={item} onPress={() => navigation.navigate('PlaceDetailsScreen', { place: item, search: '' })} />
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

export default MainScreen;