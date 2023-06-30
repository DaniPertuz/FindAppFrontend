import React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { EditProfileScreen, MainScreen } from '../screens';
import { FavoritesNavigator } from './FavoritesNavigator';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 20,
                    letterSpacing: -0.28
                },
                style: {
                    minHeight: 62
                }
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused, size }) => {
                    switch (route.name) {
                        case 'MainScreen':
                            return <>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                    <Image source={(focused) ? require('../assets/house-focused.png') : require('../assets/house.png')} style={{ height: 30, width: 30 }} />
                                    <Text style={{ color: (focused) ? '#207CFD' : '#5A5A5A', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28, marginStart: 10, marginTop: 5 }}>Inicio</Text>
                                </View>
                            </>;

                        case 'FavoritesNavigator':
                            return <>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                    <Image source={(focused) ? require('../assets/heart-focused.png') : require('../assets/heart.png')} style={{ height: 30, width: 30 }} />
                                    <Text style={{ color: (focused) ? '#207CFD' : '#5A5A5A', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28, marginStart: 10, marginTop: 5 }}>Favoritos</Text>
                                </View>
                            </>;

                        case 'EditProfileScreen':
                            return <>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                    <Image source={(focused) ? require('../assets/user-circle-focused.png') : require('../assets/user-circle.png')} style={{ height: 30, width: 30 }} />
                                    <Text style={{ color: (focused) ? '#207CFD' : '#5A5A5A', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28, marginStart: 10, marginTop: 5 }}>Perfil</Text>
                                </View>
                            </>;
                    }
                }
            })}
        >
            <Tab.Screen name="MainScreen" options={{ title: '' }} component={MainScreen} />
            <Tab.Screen name="FavoritesNavigator" options={{ title: '' }} component={FavoritesNavigator} />
            <Tab.Screen name="EditProfileScreen" options={{ title: '' }} component={EditProfileScreen} />
        </Tab.Navigator>
    );
};