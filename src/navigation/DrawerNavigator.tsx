import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext, UsersContext } from '../context';
import { MainNavigator, EditProfileNavigator, PlacesNavigator, RatingNavigator } from './';
import { styles } from '../theme/AppTheme';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <MainMenu {...props} />}
            screenOptions={{
                headerStyle: { elevation: 1, shadowOpacity: 1 },
                swipeEnabled: false
            }}
            overlayColor={'rgba(0,0,0,0.5)'}
        >
            <Drawer.Screen name="MainScreen" component={MainNavigator} />
            <Drawer.Screen name="EditProfileNavigator" component={EditProfileNavigator} />
            <Drawer.Screen name="PlacesNavigator" component={PlacesNavigator} />
            <Drawer.Screen name="RatingNavigator" component={RatingNavigator} />
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

    const backButtonHandler = () => {
        navigation.goBack();
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
                    onPress={() => navigation.navigate('EditProfileNavigator')}
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
                    onPress={() => navigation.navigate('PlacesNavigator', { sw: true })}
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
                    onPress={() => navigation.navigate('PlacesNavigator', { sw: false })}
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
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('RatingNavigator')}
                >
                    <View style={styles.drawerContainer}>
                        <Icon
                            name='star-half-outline'
                            size={36}
                            color={'#000000'}
                            style={styles.drawerIcon}
                        />
                        <Text
                            style={styles.drawerOptions}
                        >
                            Calificar
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.drawerLogoutContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.largeButton}
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
                            style={styles.largeButtonText}
                        >
                            Cerrar sesión
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};