import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from './MainNavigator';
import { FavoritesScreen, MapScreen, ReviewsScreen } from '../screens';

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
                    headerTitle: 'Lugares favoritos',
                    headerStyle: { backgroundColor: '#5856D6' },
                    headerTintColor: '#FFFFFF',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ marginLeft: 15 }}
                            onPress={() => navigator.reset({ index: 0, routes: [{ name: 'MainScreen' }] })}
                        >
                            <Icon
                                name='arrow-back-outline'
                                size={25}
                                color={'#FFFFFF'} />
                        </TouchableOpacity>
                    )
                }}
                component={FavoritesScreen}
            />
            <Stack.Screen name='ReviewsScreen'
                options={{
                    headerTitle: 'Opiniones',
                    headerStyle: { backgroundColor: '#5856D6' },
                    headerTintColor: '#FFFFFF',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ marginLeft: 15 }}
                            onPress={() => navigator.navigate('FavoritesScreen')}
                        >
                            <Icon
                                name='arrow-back-outline'
                                size={25}
                                color={'#FFFFFF'} />
                        </TouchableOpacity>
                    )
                }}
                component={ReviewsScreen} />
            <Stack.Screen name="MapScreen" options={{ title: '', headerShown: false }} component={MapScreen} />
        </Stack.Navigator>
    );
};