import React, { useContext, useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { DrawerScreenProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { PermissionsContext } from '../../context';
import { editStyles, styles } from '../../theme/AppTheme';

interface Props extends DrawerScreenProps<any, any> { };

const MainScreen = ({ navigation }: Props) => {

    const [search, setSearch] = useState<string>('');
    const { askLocationPermission } = useContext(PermissionsContext);

    useEffect(() => {
        askLocationPermission();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Icon
                    color='#000000'
                    name='menu-outline'
                    size={30}
                    style={{ marginStart: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        });
    }, []);

    return (
        <View
            style={styles.mainScreenContainer}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.mainScreenLogo}
            />
            <Text style={styles.mainScreenTitle}>
                ¿Qué buscas?
            </Text>
            <TextInput
                style={[
                    {
                        color: '#5856D6',
                        fontSize: 24,
                        width: 350
                    },
                    (Platform.OS === 'ios') && editStyles.inputFieldIOS
                ]}
                underlineColorAndroid='#5856D6'
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={setSearch}
                value={search}
            />
            <View style={styles.buttonSearchContainer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.buttonSearch}
                >
                    <Text style={styles.buttonSearchText}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default MainScreen;