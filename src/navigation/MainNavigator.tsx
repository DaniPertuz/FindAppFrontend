import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { EditProfileScreen, FavoritesScreen, HistoryScreen, LoginScreen, MapScreen, NewPasswordScreen, PlaceDetailsScreen, ProductDetailsScreen, ProductReviewsScreen, RateScreen, RatingScreen, RegisterScreen, ResultsScreen, ReviewsScreen, UpdateProfileScreen } from '../screens';
import { IPlace, IProduct, IService, IUser } from '../interfaces';
import { BottomTabNavigator } from './BottomTabNavigator';

export type RootStackParams = {
    BottomTabNavigator: undefined,
    EditProfileScreen: undefined,
    FavoritesScreen: undefined,
    HistoryScreen: undefined,
    LoginScreen: undefined,
    MainScreen: undefined,
    MapScreen: { place: IPlace, search: string; },
    NewPasswordScreen: undefined,
    PlaceDetailsScreen: { place: IPlace, search: string; },
    ProductDetailsScreen: { product: IProduct, search: string; },
    ProductReviewsScreen: { product: string; },
    RateScreen: { item: IService; },
    RatingScreen: undefined,
    RegisterScreen: undefined,
    ResultsScreen: { place: IPlace, search: string; },
    ReviewsScreen: { place: string; }
    UpdateProfileScreen: { user: IUser; };
};

const Stack = createStackNavigator<RootStackParams>();

export const MainNavigator = () => {

    const navigator = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                cardStyle: {
                    backgroundColor: '#FFFFFF'
                }
            }}
        >
            <Stack.Screen name="BottomTabNavigator" options={{ title: '' }} component={BottomTabNavigator} />
            <Stack.Screen name="EditProfileScreen" options={{ title: '' }} component={EditProfileScreen} />
            <Stack.Screen name="UpdateProfileScreen" options={{ title: '' }} component={UpdateProfileScreen} />
            <Stack.Screen name="LoginScreen" options={{ title: '' }} component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" options={{ title: '' }} component={RegisterScreen} />
            <Stack.Screen name="NewPasswordScreen" options={{ title: '' }} component={NewPasswordScreen} />
            <Stack.Screen name="MapScreen" options={{ title: '', headerShown: false }} component={MapScreen} />
            <Stack.Screen name="HistoryScreen" options={{ title: '' }} component={HistoryScreen} />
            <Stack.Screen name="FavoritesScreen" options={{ title: '' }} component={FavoritesScreen} />
            <Stack.Screen name="PlaceDetailsScreen" options={{
                headerTitle: 'Detalles del lugar',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.goBack()}
                    >
                    </TouchableOpacity>
                )
            }}
                component={PlaceDetailsScreen} />
            <Stack.Screen name="ProductDetailsScreen" options={{
                headerTitle: 'Detalles de producto',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.goBack()}
                    >
                    </TouchableOpacity>
                )
            }}
                component={ProductDetailsScreen} />
            <Stack.Screen name="RatingScreen" options={{ title: '' }} component={RatingScreen} />
            <Stack.Screen name="RateScreen" options={{ title: '' }} component={RateScreen} />
            <Stack.Screen name="ResultsScreen" options={{
                headerTitle: 'Resultados de búsqueda',
                headerStyle: { backgroundColor: '#5856D6' },
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
                component={ResultsScreen} />
            <Stack.Screen name="ReviewsScreen" options={{
                headerTitle: 'Opiniones',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.goBack()}
                    >
                    </TouchableOpacity>
                )
            }}
                component={ReviewsScreen} />
            <Stack.Screen name="ProductReviewsScreen" options={{
                headerTitle: 'Opiniones',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.goBack()}
                    >
                    </TouchableOpacity>
                )
            }}
                component={ProductReviewsScreen} />
        </Stack.Navigator>
    );
};