import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen, MapScreen, RatingScreen, HistoryScreen } from '../screens';

export type RootStackParams = {
    MainScreen: undefined,
    MapScreen: undefined,
    RatingScreen: undefined,
    HistoryScreen: undefined,
    HistoryItemScreen: undefined
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
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="MainScreen" options={{ title: '' }} component={MainScreen} />
            <Stack.Screen name="MapScreen" options={{ title: '' }} component={MapScreen} />
            <Stack.Screen name="RatingScreen" options={{ title: '' }} component={RatingScreen} />
            <Stack.Screen name="HistoryScreen" options={{ title: '' }} component={HistoryScreen} />
        </Stack.Navigator>
    );
};