import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from './MainNavigator';
import { MapScreen, PlacesListScreen } from '../screens';

const mockH = [
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
const mockF = [
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

interface Props extends StackScreenProps<RootStackParams, 'PlacesListScreen'> { };

const Stack = createStackNavigator<RootStackParams>();

export const PlacesNavigator = ({ route }: Props) => {

    const navigator = useNavigation();

    const { sw } = route.params;

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen
                name="PlacesListScreen"
                initialParams={{ places: (sw === true) ? mockH : mockF }}
                options={{
                headerTitle: (sw === true) ? 'Historial de búsqueda' : 'Lugares favoritos',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.goBack()}
                    >
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
                    </TouchableOpacity>
                )
            }}
                component={PlacesListScreen}
            />
            <Stack.Screen name="MapScreen" options={{ title: '', headerShown: false }} component={MapScreen} />
        </Stack.Navigator>
    );
};