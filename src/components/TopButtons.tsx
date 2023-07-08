import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthContext } from '../context';
import { RootStackParams } from '../navigation';

import Search from '../assets/search.svg';

import { styles } from '../theme/AppTheme';

const TopButtons = () => {

    const { user } = useContext(AuthContext);

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    return (
        <View style={styles.flexDirectionRow}>
            <View style={styles.topInputTextBackground}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => navigation.navigate('SearchScreen')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Search height={16} width={16} />
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
                style={user?.photo !== '' ? styles.noUserPhotoBackground : styles.userPhotoBackground}
            >
                <Image
                    source={(user?.photo === '' ? require('../assets/FA_Color.png') : { uri: user?.photo })}
                    style={user?.photo !== '' ? styles.noUserPhoto : styles.userPhoto}
                />
            </TouchableOpacity>
        </View>
    );
};

export default TopButtons;