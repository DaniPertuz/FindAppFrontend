import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthContext, UsersContext } from '../context';
import { useIcons } from '../hooks/useIcons';
import { RootStackParams } from '../navigation';

import { styles } from '../theme/AppTheme';

const TopButtons = () => {

    const isFocused = useIsFocused();

    const { user } = useContext(AuthContext);
    const { loadUserByID } = useContext(UsersContext);

    const [userDB, setUserDB] = useState<any>(null);

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserDB(usr);
    };

    useEffect(() => {
        if (isFocused) {
            load();
        }
    }, [isFocused, userDB]);

    return (
        <View style={styles.flexDirectionRow}>
            <View style={styles.topInputTextBackground}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => navigation.navigate('SearchScreen')}
                >
                    <View style={styles.flexDirectionRowAlignItemsCenter}>
                        {useIcons('Search', 16, 16)}
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={styles.placeholderText}>
                                Escribe una palabra o frase
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => navigation.navigate('EditProfileScreen')}
                style={userDB?.photo !== '' ? styles.noUserPhotoBackground : styles.userPhotoBackground}
            >
                <Image
                    source={(userDB?.photo === '' ? require('../assets/FA_Color.png') : { uri: userDB?.photo })}
                    style={userDB?.photo !== '' ? styles.noUserPhoto : styles.userPhoto}
                />
            </TouchableOpacity>
        </View>
    );
};

export default TopButtons;