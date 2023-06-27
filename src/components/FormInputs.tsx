import React, { useState } from 'react';
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParams } from '../navigation';
import LoginButton from './LoginButton';

import { styles } from '../theme/AppTheme';

interface Props {
    email: string;
    password: string;
    onChange: (value: string, field: 'email' | 'password') => void;
}

const FormInputs = ({ email, password, onChange }: Props) => {

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [eyeIcon] = useState('../assets/eye-closed.png');
    const [fieldLength, setFieldLength] = useState({
        email: false,
        password: false
    });
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const handlePasswordVisibility = () => {
        if (eyeIcon === '../assets/eye-closed.png') {
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeIcon === '../assets/eye.png') {
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleFieldLength = (email: boolean, password: boolean) => {
        setFieldLength({
            email,
            password
        });
    };

    return (
        <View>
            <Text style={styles.label}>
                Usuario o correo
            </Text>
            <View style={[
                styles.inputFieldContainer,
                (fieldLength.email === true) && { borderColor: '#D13232', borderWidth: 1 }
            ]}>
                <Image
                    source={require('../assets/user.png')}
                    style={{ height: 25, width: 25, marginStart: 16, marginEnd: 10 }}
                />
                <TextInput
                    placeholder='Ingresa tu usuario o correo'
                    placeholderTextColor='#9A9A9A'
                    keyboardType='default'
                    style={[
                        styles.inputField,
                        // (Platform.OS === 'ios') && styles.inputFieldIOS
                    ]}
                    selectionColor='#9A9A9A'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                />
            </View>
            {(fieldLength.email === true) &&
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Image
                        source={require('../assets/warning.png')}
                        style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                    />
                    <Text
                        style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                    >
                        Ingresa tu correo electrónico
                    </Text>
                </View>
            }
            <Text style={styles.label}>
                Contraseña
            </Text>
            <View style={[styles.inputFieldContainer, (fieldLength.password === true) && { borderColor: '#D13232', borderWidth: 1 }]}>
                <Image
                    source={require('../assets/lock.png')}
                    style={{ flex: 0.4, height: 25, width: 25, marginStart: 16 }}
                />
                <TextInput
                    placeholder='Ingresa tu contraseña'
                    placeholderTextColor='#9A9A9A'
                    secureTextEntry={passwordVisibility}
                    style={[
                        styles.inputField,
                        { flex: 3, marginHorizontal: 10 },
                        // (Platform.OS === 'ios') && styles.inputFieldIOS
                    ]}
                    selectionColor='#9A9A9A'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(value) => onChange(value, 'password')}
                    value={password}
                />
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={handlePasswordVisibility}
                >
                    <Image
                        source={(passwordVisibility === false) ? require('../assets/eye.png') : require('../assets/eye-closed.png')}
                        style={{ flex: 0.2, height: 20, width: 28, marginEnd: 16 }}
                    />
                </TouchableOpacity>
            </View>
            {(fieldLength.password === true) &&
                < View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Image
                        source={require('../assets/warning.png')}
                        style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                    />
                    <Text
                        style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                    >
                        Ingresa tu contraseña
                    </Text>
                </View>
            }
            <View style={{ alignItems: 'flex-end', marginTop: 12, marginBottom: 30 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigator.navigate('NewPasswordScreen')}
                >
                    <Text style={{ color: '#207CFD', fontSize: 16, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
            </View>
            <LoginButton email={email} password={password} handleFieldLength={handleFieldLength} />
            <View style={{ flexDirection: 'row', marginBottom: 38, marginTop: 32, justifyContent: 'center' }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24, marginEnd: 3 }}>
                        ¿No tienes usuario?
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigator.replace('RegisterScreen')}
                >
                    <Text style={{ color: '#207CFD', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.26, marginStart: 3 }}>
                        Crear cuenta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FormInputs;