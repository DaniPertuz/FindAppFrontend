import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { EditProfileScreen, FavoritesScreen, HistoryScreen, MainScreen, MapScreen, RatingScreen, ResultsScreen } from '../screens';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export type RootStackParams = {
    MainScreen: undefined,
    EditProfileScreen: undefined,
    MapScreen: undefined,
    HistoryScreen: undefined,
    FavoritesScreen: undefined,
    RatingScreen: undefined,
    RateScreen: undefined,
    ResultsScreen: undefined
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
            <Stack.Screen name="HistoryScreen" options={{ title: '' }} component={HistoryScreen} />
            <Stack.Screen name="FavoritesScreen" options={{ title: '' }} component={FavoritesScreen} />
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
        </Stack.Navigator>
    );
};