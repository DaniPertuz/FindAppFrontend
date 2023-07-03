import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { EditProfileScreen, MainScreen } from '../screens';
import { FavoritesNavigator } from './FavoritesNavigator';

import Heart from '../assets/heart.svg';
import HeartFocused from '../assets/heart-focused.svg';
import House from '../assets/house.svg';
import HouseFocused from '../assets/house-focused.svg';
import UserCircle from '../assets/user-circle.svg';
import UserCircleFocused from '../assets/user-circle-focused.svg';

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
                            return <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                {(focused)
                                    ? <HouseFocused height={22} width={22} />
                                    : <House height={22} width={22} />
                                }
                                <Text style={{ color: (focused) ? '#207CFD' : '#5A5A5A', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28, marginStart: 10 }}>Inicio</Text>
                            </View>;

                        case 'FavoritesNavigator':
                            return <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                {(focused)
                                    ? <HeartFocused height={22} width={22} />
                                    : <Heart height={22} width={22} />
                                }
                                <Text style={{ color: (focused) ? '#207CFD' : '#5A5A5A', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28, marginStart: 10 }}>Favoritos</Text>
                            </View>;

                        case 'EditProfileScreen':
                            return <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                {(focused)
                                    ? <UserCircleFocused height={22} width={22} />
                                    : <UserCircle height={22} width={22} />
                                }
                                <Text style={{ color: (focused) ? '#207CFD' : '#5A5A5A', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28, marginStart: 10 }}>Perfil</Text>
                            </View>;
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