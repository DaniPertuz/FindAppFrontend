import React, { useContext, useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PermissionsContext } from '../../context';
import { editStyles, styles } from '../../theme/AppTheme';

const MainScreen = () => {

    const [search, setSearch] = useState<string>('');
    const { askLocationPermission } = useContext(PermissionsContext);

    const navigation = useNavigation();

    useEffect(() => {
        askLocationPermission();
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
                    onPress={() => navigation.navigate('ResultsScreen', { search: search.trim() })}
                >
                    <Text style={styles.buttonSearchText}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MainScreen;