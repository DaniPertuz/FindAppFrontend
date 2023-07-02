import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../context';

const TopButtons = () => {

    const { user } = useContext(AuthContext);

    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row' }}>
            <View
                style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(250, 250, 250, 0.98)',
                    borderRadius: 8,
                    flex: 5,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginEnd: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3
                }}
            >
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => { }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/search.png')}
                            style={{ height: 16, width: 16 }}
                        />
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ color: '#858585', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>
                                Escribe una palabra o frase
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => navigation.navigate('EditProfileScreen')}
                style={user?.photo !== '' ? { backgroundColor: 'rgba(250, 250, 250, 0.98)', borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center' } : { backgroundColor: 'rgba(250, 250, 250, 0.98)', borderColor: '#081023', borderWidth: 1, borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <Image source={(user?.photo === '' ? require('../../../assets/FA_Color.png') : { uri: user?.photo })} style={user?.photo !== '' ? { height: 50, width: 50, borderRadius: 50, borderColor: '#081023', borderWidth: 1 } : { height: 50, width: 50, borderRadius: 50 }} />
            </TouchableOpacity>
        </View>
    );
};

export default TopButtons;