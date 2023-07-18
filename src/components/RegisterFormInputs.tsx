import React, { useContext, useState } from 'react';
import { Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthContext } from '../context';
import { useForm } from '../hooks/useForm';
import { useIcons } from '../hooks/useIcons';
import { roles } from '../interfaces';
import { RootStackParams } from '../navigation';

import { styles } from '../theme/AppTheme';

interface Props {
    name: string;
    email: string;
    password: string;
    onChange: (value: string, field: 'name' | 'email' | 'password') => void;
}

const RegisterFormInputs = ({ name, email, password, onChange }: Props) => {
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
    const { signUp } = useContext(AuthContext);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [eyeIcon] = useState('../../assets/eye-closed.png');
    const [fieldLength, setFieldLength] = useState({
        name: false,
        email: false,
        password: false
    });

    const handlePasswordVisibility = () => {
        if (eyeIcon === '../../assets/eye-closed.png') {
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeIcon === '../../assets/eye.png') {
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleFieldLength = (name: boolean, email: boolean, password: boolean) => {
        setFieldLength({
            name,
            email,
            password
        });
    };

    const onRegister = () => {
        Keyboard.dismiss();

        if (name.length !== 0 && email.length === 0 && password.length !== 0) {
            handleFieldLength(false, true, false);
            return;
        }

        if (name.length !== 0 && email.length === 0 && password.length === 0) {
            handleFieldLength(false, true, true);
            return;
        }

        if (name.length === 0 && email.length !== 0 && password.length !== 0) {
            handleFieldLength(true, false, false);
            return;
        }

        if (name.length === 0 && email.length === 0 && password.length !== 0) {
            handleFieldLength(true, true, false);
            return;
        }

        if (name.length !== 0 && email.length !== 0 && password.length === 0) {
            handleFieldLength(false, false, true);
            return;
        }

        if (name.length === 0 && email.length === 0 && password.length === 0) {
            handleFieldLength(true, true, true);
            return;
        }

        if (name.length !== 0 && email.length !== 0 && password.length !== 0) {
            signUp({
                name,
                email,
                password,
                role: roles.CLIENT,
                status: true
            });
        }

    };
    return (
        <>
            <View>
                <Text style={styles.label}>Usuario</Text>
                <View style={[
                    styles.inputFieldContainer,
                    (fieldLength.name === true) && styles.warningBorder
                ]}>
                    {useIcons('User', 20, 20)}
                    <TextInput
                        placeholder='Ingresa tu nombre'
                        placeholderTextColor='#9A9A9A'
                        keyboardType='default'
                        style={[
                            styles.inputField,
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#9A9A9A'
                        autoCapitalize='words'
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                    />
                </View>
                {(fieldLength.name === true) &&
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>Ingresa tu nombre</Text>
                    </View>
                }
                <Text style={styles.label}>Email</Text>
                <View style={[
                    styles.inputFieldContainer,
                    (fieldLength.email === true) && styles.warningBorder
                ]}>
                    {useIcons('Envelope', 20, 20)}
                    <TextInput
                        placeholder='Ingresa tu correo'
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
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>Ingresa tu correo</Text>
                    </View>
                }
                <Text style={styles.label}>Contraseña</Text>
                <View style={[
                    styles.inputFieldContainer,
                    (fieldLength.password === true) && styles.warningBorder
                ]}
                >
                    {useIcons('Lock', 20, 20)}
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordVisibility}
                        style={[
                            styles.inputField,
                            styles.registerPasswordTextInputSize,
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
                        style={styles.registerHideButtonSize}
                        onPress={handlePasswordVisibility}
                    >
                        {(passwordVisibility === false)
                            ? useIcons('Eye', 20, 20)
                            : useIcons('EyeClosed', 20, 20)
                        }
                    </TouchableOpacity>
                </View>
                {(fieldLength.password === true) &&
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                    </View>
                }
                <View style={styles.buttonContainerMarginTop}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={onRegister}
                    >
                        <Text style={styles.buttonText}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.registerBottomContainer}>
                <View style={styles.tinyMarginEnd}>
                    <Text style={styles.plainMediumText}>¿Ya tienes cuenta?</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={styles.tinyMarginStart}
                    onPress={() => navigator.replace('LoginScreen')}
                >
                    <Text style={styles.loginButtonText}>
                        Inicia sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default RegisterFormInputs;