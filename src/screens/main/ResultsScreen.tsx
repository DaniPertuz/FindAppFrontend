import React from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SearchStackParams } from '../../navigation/SearchNavigator';
import { styles } from '../../theme/AppTheme';
import SavedPlace from '../../components/SavedPlace';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<SearchStackParams, 'ResultsScreen'> { };

const mock = [
    {
        date: "2023-02-22T00:56:13.318Z",
        place: {
            _id: "63bdde4b949961872f0dc4e9",
            name: "Restaurante Las Rocas",
            address: 'Cl. 82 #45 - 13, Nte. Centro Historico, Barranquilla, Atlántico',
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg",
            rate: 5,
            total: 2
        },
        search: "Rocas"
    },
    {
        date: "2023-09-22T00:56:13.318Z",
        place: {
            _id: "63bddee7a5237a7b4de1a883",
            name: "Portal del Prado",
            address: "Cl. 53 #46-192, Nte. Centro Historico, Barranquilla, Atlántico",
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg",
            rate: 3.79,
            total: 3
        },
        search: "Portal"
    }
];

const ResultsScreen = ({ navigation, route }: Props) => {
    const { search = '' } = route.params;
    const { top } = useSafeAreaInsets();

    const validateResults = () => {
        return mock.some(keyValue => {
            if (keyValue.place.name.toLocaleLowerCase() === search.toLocaleLowerCase()) {
                return true;
            }
            return false;
        });
    };

    const setResults = () => {
        return mock.filter(item => item.place.name.toLocaleLowerCase() === search.toLocaleLowerCase())
    }

    return (
        <View style={{ flex: 1 }}>
            {validateResults() === false
                ?
                <Text style={styles.blackPrimaryFontStyle}>
                    No hay lugares que coincidan con {search}
                </Text>
                :
                <>
                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                        <Text
                            style={styles.blackPrimaryFontStyle}
                        >
                            Buscas: {search}
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
                                <SavedPlace item={item} onPress={() => navigation.navigate('MapScreen', { place: item.place.address, from: 'ResultsScreen' })} />
                            )}
                        />
                    </View>
                </>
            }
        </View >
    );
};

export default ResultsScreen;