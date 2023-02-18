import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { EditProfileScreen, HistoryScreen } from '../screens';
import { MainNavigator } from './MainNavigator';
import { AuthContext } from '../context';
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
                        alignItems: 'flex-start',
                        width: '85%'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfileScreen')}
                    >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon
                                name='person-circle-outline'
                                size={36}
                                color={'#000000'}
                                style={{ alignSelf: 'center', marginEnd: 10 }}
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
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon
                                name='time-outline'
                                size={36}
                                color={'#000000'}
                                style={{ alignSelf: 'center', marginEnd: 10 }}
                            />
                            <Text
                                style={styles.drawerOptions}
                            >
                                Historial
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HistoryScreen')}
                    >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon
                                name='heart-circle-outline'
                                size={36}
                                color={'#000000'}
                                style={{ alignSelf: 'center', marginEnd: 10 }}
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