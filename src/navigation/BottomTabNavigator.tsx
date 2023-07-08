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
import { styles } from '../theme/AppTheme';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: styles.bottomTabNavigatorLabStyle,
                style: styles.bottomTabNavigatorMinHeight
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused, size }) => {
                    switch (route.name) {
                        case 'MainScreen':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? <HouseFocused height={22} width={22} />
                                    : <House height={22} width={22} />
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Inicio</Text>
                                </View>
                            </View>;

                        case 'FavoritesNavigator':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? <HeartFocused height={22} width={22} />
                                    : <Heart height={22} width={22} />
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Favoritos</Text>
                                </View>
                            </View>;

                        case 'EditProfileScreen':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? <UserCircleFocused height={22} width={22} />
                                    : <UserCircle height={22} width={22} />
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Perfil</Text>
                                </View>
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