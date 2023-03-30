import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { EditProfileScreen, MainScreen, MapScreen, PlacesListScreen, RatingScreen, ResultsScreen, ReviewsScreen } from '../screens';

export type RootStackParams = {
    MainScreen: undefined,
    EditProfileScreen: undefined,
    MapScreen: { place: string },
    PlacesListScreen: { sw: boolean, places: any[] },
    RatingScreen: undefined,
    RateScreen: undefined,
    ResultsScreen: undefined,
    ReviewsScreen: undefined
};

const Stack = createStackNavigator<RootStackParams>();

export const MainNavigator = () => {

    const navigator = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                cardStyle: {
                    backgroundColor: '#FFFFFF'
                }
            }}
        >
            <Stack.Screen name="MainScreen" options={{ title: '' }} component={MainScreen} />
            <Stack.Screen name="EditProfileScreen" options={{ title: '' }} component={EditProfileScreen} />
            <Stack.Screen name="MapScreen" options={{ title: '', headerShown: false }} component={MapScreen} />
            <Stack.Screen name="PlacesListScreen" options={{ title: '' }} component={PlacesListScreen} />
            <Stack.Screen name="RatingScreen" options={{ title: '' }} component={RatingScreen} />
            <Stack.Screen name="ResultsScreen" options={{
                headerTitle: 'Resultados de búsqueda',
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
                component={ResultsScreen} />
            <Stack.Screen name="ReviewsScreen" options={{ title: '' }} component={ReviewsScreen} />
        </Stack.Navigator>
    );
};