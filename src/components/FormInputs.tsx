import React, { useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParams } from '../navigation';
import LoginButton from './LoginButton';

import Eye from '../assets/eye.svg';
import EyeClosed from '../assets/eye-closed.svg';
import User from '../assets/user.svg';
import Lock from '../assets/lock.svg';
import Warning from '../assets/warning.svg';

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
                (fieldLength.email === true) && styles.warningBorder
            ]}>
                <User height={25} width={25} />
                <TextInput
                    placeholder='Ingresa tu usuario o correo'
                    placeholderTextColor='#9A9A9A'
                    keyboardType='email-address'
                    style={[
                        styles.inputField,
                        (Platform.OS === 'ios') && styles.inputFieldIOS
                    ]}
                    selectionColor='#9A9A9A'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                />
            </View>
            {(fieldLength.email === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <Warning height={15} width={15} style={styles.warningIconMargins} />
                    <Text style={styles.warningText}>Ingresa tu correo electrónico</Text>
                </View>
            }
            <Text style={styles.label}>
                Contraseña
            </Text>
            <View style={[styles.inputFieldContainer, (fieldLength.password === true) && styles.warningBorder]}>
                <Lock height={25} width={25} style={{ flex: 0.4 }} />
                <TextInput
                    placeholder='Ingresa tu contraseña'
                    placeholderTextColor='#9A9A9A'
                    secureTextEntry={passwordVisibility}
                    style={[
                        styles.inputField,
                        { flex: 3, marginEnd: 10 },
                        (Platform.OS === 'ios') && styles.inputFieldIOS
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
                    {(passwordVisibility === false)
                        ? <Eye height={28} width={28} style={styles.tinyButtonSize} />
                        : <EyeClosed height={28} width={28} style={styles.tinyButtonSize} />}
                </TouchableOpacity>
            </View>
            {(fieldLength.password === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <Warning height={15} width={15} style={styles.warningIconMargins} />
                    <Text style={styles.warningText}>
                        Ingresa tu contraseña
                    </Text>
                </View>
            }
            <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigator.navigate('NewPasswordScreen')}
                >
                    <Text style={styles.forgotPasswordText}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
            </View>
            <LoginButton email={email} password={password} handleFieldLength={handleFieldLength} />
            <View style={styles.createAccountButtonsContainer}>
                <View style={styles.tinyMarginEnd}>
                    <Text style={styles.plainMediumText}>
                        ¿No tienes usuario?
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.tinyMarginStart}
                    onPress={() => navigator.replace('RegisterScreen')}
                >
                    <Text style={styles.loginButtonText}>
                        Crear cuenta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FormInputs;