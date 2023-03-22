import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { EditProfileScreen, FavoritesScreen, HistoryScreen, MainScreen, MapScreen, RatingScreen } from '../screens';

export type RootStackParams = {
    MainScreen: undefined,
    EditProfileScreen: undefined,
    MapScreen: undefined,
    HistoryScreen: undefined,
    FavoritesScreen: undefined,
    RatingScreen: undefined,
    RateScreen: undefined,
};

const Stack = createStackNavigator<RootStackParams>();

export const MainNavigator = () => {
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
            <Stack.Screen name="MapScreen" options={{ title: '' }} component={MapScreen} />
            <Stack.Screen name="HistoryScreen" options={{ title: '' }} component={HistoryScreen} />
            <Stack.Screen name="FavoritesScreen" options={{ title: '' }} component={FavoritesScreen} />
            <Stack.Screen name="RatingScreen" options={{ title: '' }} component={RatingScreen} />
        </Stack.Navigator>
    );
};