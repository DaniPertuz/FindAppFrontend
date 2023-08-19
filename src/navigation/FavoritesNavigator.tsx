import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParams } from './MainNavigator';
import { FavoritesScreen, MapScreen } from '../screens';

const Stack = createStackNavigator<RootStackParams>();

export const FavoritesNavigator = () => {

    const navigator = useNavigation();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FavoritesScreen"
                options={{ headerShown: false }}
                component={FavoritesScreen}
            />
            <Stack.Screen name="MapScreen" options={{ title: '', headerShown: false }} component={MapScreen} />
        </Stack.Navigator>
    );
};