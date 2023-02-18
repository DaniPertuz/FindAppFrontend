import React, { useEffect, useState } from 'react';
import { Button, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { editStyles } from '../../theme/AppTheme';
import { TextInput } from 'react-native-gesture-handler';

interface Props extends DrawerScreenProps<any, any> { };

const MainScreen = ({ navigation }: Props) => {

    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    title='Menú'
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        });
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingHorizontal: 30,
                justifyContent: 'center',
                backgroundColor: '#FFFFFF'
            }}>
            <Image
                source={require('../../assets/logo.png')}
                style={{
                    width: 120,
                    height: 120,
                    borderRadius: 100
                }}
            />
            <Text style={{
                color: '#000000',
                fontSize: 32,
                fontFamily: 'Nunito-Bold',
                marginVertical: 30
            }}>
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
            <View style={{
                marginTop: 30
            }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        backgroundColor: '#5856D6',
                        borderRadius: 999,
                        paddingVertical: 8,
                        paddingHorizontal: 18,

                    }}
                >
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 18,
                        fontWeight: '600'
                    }}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default MainScreen;