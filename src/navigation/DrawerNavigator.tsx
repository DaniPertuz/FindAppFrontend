import React, { useContext, useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { EditProfileScreen, HistoryScreen, FavoritesScreen } from '../screens';
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
            <Drawer.Screen name="MainScreen" component={MainNavigator} />
            <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
            <Drawer.Screen name="FavoritesScreen" component={FavoritesScreen} />
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
        load();
    });

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserMock(usr);
        setUserPhoto(usr.photo!);
    };

    return (
        <DrawerContentScrollView>
            <View
                style={styles.avatarContainer}
            >
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
                <View style={styles.drawerHr} />
                <View
                    style={styles.drawerMainContainer}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfileScreen')}
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
                        onPress={() => navigation.navigate('HistoryScreen')}
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
                        onPress={() => navigation.navigate('FavoritesScreen')}
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
            </View>
        </DrawerContentScrollView>
    );
};