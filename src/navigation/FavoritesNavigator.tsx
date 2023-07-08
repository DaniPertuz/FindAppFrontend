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
                name="FavoritesScreen"
                options={{
                    headerShown: false,
                    headerTintColor: '#FFFFFF',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ marginLeft: 15 }}
                            onPress={() => navigator.reset({ index: 0, routes: [{ name: 'MainScreen' }] })}
                        >
                        </TouchableOpacity>
                    )
                }}
                component={FavoritesScreen}
            />
            <Stack.Screen name="MapScreen" options={{ title: '', headerShown: false }} component={MapScreen} />
        </Stack.Navigator>
    );
};