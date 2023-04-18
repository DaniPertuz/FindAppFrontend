import React, { useContext, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext, UsersContext } from '../context';
import { MainNavigator, EditProfileNavigator, FavoritesNavigator, HistoryNavigator, RatingNavigator } from './';
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
            <Drawer.Screen name="FavoritesNavigator" component={FavoritesNavigator} />
            <Drawer.Screen name="HistoryNavigator" component={HistoryNavigator} />
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

    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.avatarContainer}>
                <Image
                    source={
                        (userPhoto === '')
                            ? require('../assets/placeholder.png')
                            : { uri: userPhoto }
                    }
                    style={styles.avatar}
                />
                <Text
                    style={styles.drawerUsername}
                >
                    {(!user)
                        ? ''
                        : userMock.name}
                </Text>
                <Text
                    style={styles.drawerUserEmail}
                >
                    {(!user)
                        ? ''
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
                    onPress={() => navigation.navigate('HistoryNavigator')}
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
                    onPress={() => navigation.navigate('FavoritesNavigator')}
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