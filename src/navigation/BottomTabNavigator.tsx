import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { EditProfileScreen, MainScreen } from '../screens';
import { FavoritesNavigator } from './FavoritesNavigator';
import { useIcons } from '../hooks';

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
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case 'MainScreen':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? useIcons('HouseFocused', 22, 22)
                                    : useIcons('House', 22, 22)
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Inicio</Text>
                                </View>
                            </View>;

                        case 'FavoritesNavigator':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? useIcons('HeartFocused', 22, 22)
                                    : useIcons('Heart', 22, 22)
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Favoritos</Text>
                                </View>
                            </View>;

                        case 'EditProfileScreen':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? useIcons('UserCircleFocused', 22, 22)
                                    : useIcons('UserCircle', 22, 22)
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