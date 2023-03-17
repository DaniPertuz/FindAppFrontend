import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext, UsersContext } from '../context';
import { MainNavigator, FavoritesNavigator, HistoryNavigator, EditProfileNavigator } from './';
import { styles } from '../theme/AppTheme';

const Drawer = createDrawerNavigator();

let sw = 0;

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <MainMenu {...props} />}
            screenOptions={{
                headerStyle: (sw == 1) ? { elevation: 0, shadowOpacity: 0 } : { elevation: 1, shadowOpacity: 1 },
                swipeEnabled: false
            }}
            drawerStyle={
                (sw == 1) ? { height: 0, backgroundColor: 'transparent' } : { height: '100%' }
            }
            overlayColor={(sw == 1) ? 'transparent' : 'rgba(0,0,0,0.5)'}
        >
            <Drawer.Screen name="MainScreen" component={MainNavigator} />
            <Drawer.Screen name="EditProfileNavigator" component={EditProfileNavigator} />
            <Drawer.Screen name="HistoryNavigator" component={HistoryNavigator} />
            <Drawer.Screen name="FavoritesNavigator" component={FavoritesNavigator} />
        </Drawer.Navigator>
    );
};

const MainMenu = ({ navigation }: DrawerContentComponentProps<DrawerContentOptions>) => {

    const [userPhoto, setUserPhoto] = useState<string>('../assets/placeholder.png');
    const [userMock, setUserMock] = useState<any>({
        name: 'Username',
        email: 'email@user.com',
        photo: '../assets/placeholder.png'
    });
    const { user, logOut } = useContext(AuthContext);
    const { loadUserByID } = useContext(UsersContext);

    useFocusEffect(() => {
        sw = 0;
        load();
    });

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserMock(usr);
        setUserPhoto(usr.photo!);
    };

    const backButtonHandler = () => {
        navigation.goBack();
        sw = 0;
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, []);

    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.avatarContainer}>
                <Image
                    source={
                        (!user || user.photo === '')
                            ? require('../assets/placeholder.png')
                            : { uri: userPhoto }
                    }
                    style={styles.avatar}
                />
                <Text
                    style={styles.drawerUsername}
                >
                    {(!user)
                        ? 'Username'
                        : userMock.name}
                </Text>
                <Text
                    style={styles.drawerUserEmail}
                >
                    {(!user)
                        ? 'email@user.com'
                        : userMock.email}
                </Text>
            </View>
            <View style={styles.drawerHr} />
            <View
                style={styles.drawerMainContainer}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { navigation.navigate('EditProfileNavigator'); sw = 1; }}
                >
                    <View style={styles.drawerContainer}>
                        <Icon
                            name='person-circle-outline'
                            size={36}
                            color={'#000000'}
                            style={styles.drawerIcon}
                        />
                        <Text
                            style={styles.drawerOptions}
                        >
                            Editar perfil
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { navigation.navigate('HistoryNavigator'); sw = 1; }}
                >
                    <View style={styles.drawerContainer}>
                        <Icon
                            name='time-outline'
                            size={36}
                            color={'#000000'}
                            style={styles.drawerIcon}
                        />
                        <Text
                            style={styles.drawerOptions}
                        >
                            Historial
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { navigation.navigate('FavoritesNavigator'); sw = 1; }}
                >
                    <View style={styles.drawerContainer}>
                        <Icon
                            name='heart-circle-outline'
                            size={36}
                            color={'#000000'}
                            style={styles.drawerIcon}
                        />
                        <Text
                            style={styles.drawerOptions}
                        >
                            Favoritos
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.drawerLogoutContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.drawerLogout}
                    onPress={logOut}
                >
                    <View style={styles.drawerContainer}>
                        <Icon
                            name='power-outline'
                            size={25}
                            color={'#FFFFFF'}
                            style={styles.drawerIcon}
                        />
                        <Text
                            style={styles.drawerLogoutButton}
                        >
                            Cerrar sesión
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};