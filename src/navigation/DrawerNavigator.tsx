import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';

import { EditProfileScreen, HistoryScreen } from '../screens';
import { MainNavigator } from './MainNavigator';
import { AuthContext, UsersContext } from '../context';
import { styles } from '../theme/AppTheme';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

    const { width } = useWindowDimensions();

    return (
        <Drawer.Navigator
            drawerType={width >= 768 ? 'permanent' : 'front'}
            drawerContent={(props) => <MainMenu {...props} />}
        >
            <Drawer.Screen name="MainScreen" options={{ title: 'Inicio' }} component={MainNavigator} />
            <Drawer.Screen name="EditProfileScreen" options={{ title: 'Editar perfil' }} component={EditProfileScreen} />
            <Drawer.Screen name="HistoryScreen" options={{ title: 'Historial' }} component={HistoryScreen} />
        </Drawer.Navigator>
    );
};

const MainMenu = ({ navigation }: DrawerContentComponentProps<DrawerContentOptions>) => {

    const { user, logOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView>
            <View
                style={styles.avatarContainer}
            >
                <Image
                    source={
                        (!user || user.photo === '')
                        ? require('../assets/placeholder.png')
                        : { uri: user?.photo }
                    }
                    style={styles.avatar}
                />
                <Text
                    style={styles.drawerUsername}
                >
                    {(!user)
                        ? 'Username'
                        : user?.name}
                </Text>
                <Text
                    style={styles.drawerUserEmail}
                >
                    {(!user)
                        ? 'email@user.com'
                        : user?.email}
                </Text>
                <View style={styles.drawerHr} />
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfileScreen')}
                    >
                        <Text
                            style={styles.drawerOptions}
                        >
                            Editar perfil
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HistoryScreen')}
                    >
                        <Text
                            style={styles.drawerOptions}
                        >
                            Historial de búsquedas
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.drawerLogout}
                        onPress={logOut}
                    >
                        <Text
                            style={styles.drawerLogoutButton}
                        >
                            Cerrar sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};