import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen, ResultsScreen } from '../screens/main';

export type SearchStackParams = {
    ResultsScreen: { search: string };
    MapScreen: { place: string, from: string };
};

const Stack = createStackNavigator();

const SearchNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ResultsScreen'
                component={ResultsScreen}
                options={{ title: 'Resultados de la búsqueda' }}
            />
            <Stack.Screen name='MapScreen' options={{ title: '', headerShown: false }} component={MapScreen} />
        </Stack.Navigator>
    );
};

export default SearchNavigator;