import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SavedPlace from '../../components/SavedPlace';
import { RootStackParams } from '../../navigation';
import { styles } from '../../theme/AppTheme';

const mock = [
    {
        date: "2023-02-22T00:56:13.318Z",
        place: {
            _id: "63bdde4b949961872f0dc4e9",
            name: "Restaurante Las Rocas",
            address: 'Cl. 82 #45 - 13, Nte. Centro Historico, Barranquilla, Atlántico',
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg",
            rate: 5
        },
        search: "Rocas"
    },
    {
        date: "2023-09-22T00:56:13.318Z",
        place: {
            _id: "63bdde4b949961872f0dc4e8",
            name: "Las Rocas",
            address: 'Cl. 82 #45 - 13, Nte. Centro Historico, Barranquilla, Atlántico',
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg",
            rate: 3.79
        },
        search: "Rocas"
    }
];

interface Props extends StackScreenProps<RootStackParams, 'MapScreen'> { };

const FavoritesScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();

    return (
        <View
            style={{
                ...styles.topContainer,
                paddingTop: (Platform.OS === 'ios') ? top : top + 20
            }}
        >
            <FlatList
                data={mock}
                keyExtractor={(m) => m.place._id}
                renderItem={({ item }) => {
                    return (
                        <SavedPlace
                            item={item}
                            onPress={() => navigation.push('MapScreen', { place: item.place.address })}
                        />
    )}}
            />
        </View>
    );
};
export default FavoritesScreen;