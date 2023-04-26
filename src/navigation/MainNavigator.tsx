import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { EditProfileScreen, FavoritesScreen, HistoryScreen, MainScreen, MapScreen, PlaceDetailsScreen, ProductDetailsScreen, ProductReviewsScreen, RatingScreen, ResultsScreen, ReviewsScreen } from '../screens';
import { IPlace, IProduct, IService } from '../interfaces';

export type RootStackParams = {
    MainScreen: undefined,
    EditProfileScreen: undefined,
    MapScreen: { place: IPlace, search: string; },
    FavoritesScreen: undefined,
    HistoryScreen: undefined,
    PlaceDetailsScreen: { place: IPlace, search: string; },
    ProductDetailsScreen: { product: IProduct, search: string; },
    RatingScreen: undefined,
    RateScreen: { item: IService; },
    ResultsScreen: { place: IPlace, search: string; },
    ProductReviewsScreen: { product: string; },
    ReviewsScreen: { place: string; };
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
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
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
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
                    </TouchableOpacity>
                )
            }}
                component={ProductDetailsScreen} />
            <Stack.Screen name="RatingScreen" options={{ title: '' }} component={RatingScreen} />
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
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
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
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
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
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
                    </TouchableOpacity>
                )
            }}
                component={ProductReviewsScreen} />
        </Stack.Navigator>
    );
};