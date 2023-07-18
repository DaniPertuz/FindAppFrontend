import React, { useContext, useState } from 'react';
import { Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { UsersContext } from '../context';
import { useIcons } from '../hooks/useIcons';
import { roles } from '../interfaces';
import { RootStackParams } from '../navigation';

import { styles } from '../theme/AppTheme';

interface Props {
    email: string;
    password: string;
    confirmPassword: string;
    onChange: (value: string, field: 'email' | 'password' | 'confirmPassword') => void;
}

const NewPasswordFormInputs = ({ email, password, confirmPassword, onChange }: Props) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { loadUserByEmail, updateUserPassword } = useContext(UsersContext);

    const [display, setDisplay] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [nullUser, setNullUser] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(true);
    const [fieldLength, setFieldLength] = useState({
        email: false,
        password: false,
        confirmPassword: false
    });
    const [eyeIcon] = useState('../../assets/eye-closed.png');
    const [eyeIconConfirm] = useState('../../assets/eye-closed.png');

    const handleFieldLength = (email: boolean, password: boolean, confirmPassword: boolean) => {
        setFieldLength({
            email,
            password,
            confirmPassword
        });
    };

    const handlePasswordVisibility = () => {
        if (eyeIcon === '../../assets/eye-closed.png') {
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeIcon === '../../assets/eye.png') {
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleConfirmPasswordVisibility = () => {
        if (eyeIconConfirm === '../../assets/eye-closed.png') {
            setPasswordConfirmVisibility(!passwordConfirmVisibility);
        } else if (eyeIconConfirm === '../../assets/eye.png') {
            setPasswordConfirmVisibility(!passwordConfirmVisibility);
        }
    };

    const onUpdate = async () => {
        Keyboard.dismiss();

        const validation = await loadUserByEmail(email);

        if (validation === null && email.length !== 0) {
            setNullUser(true);
        }

        if (validation && validation.role !== roles.CLIENT) {
            setAuthorized(true);
            return;
        }

        if (email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0) {
            if (password !== confirmPassword) {
                setDisplay(true);
                return;
            }

            updateUserPassword(email, password);
            navigator.replace('LoginScreen');
        }

        if (email.length === 0 && password.length !== 0 && confirmPassword.length !== 0) {
            handleFieldLength(true, false, false);
            return;
        }

        if (email.length === 0 && password.length === 0 && confirmPassword.length !== 0) {
            handleFieldLength(true, true, false);
            return;
        }

        if (email.length !== 0 && password.length === 0 && confirmPassword.length !== 0) {
            handleFieldLength(false, true, false);
            return;
        }

        if (email.length !== 0 && password.length !== 0 && confirmPassword.length === 0) {
            handleFieldLength(false, false, true);
            return;
        }

        if (email.length !== 0 && password.length === 0 && confirmPassword.length === 0) {
            handleFieldLength(false, true, true);
            return;
        }

        if (email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0) {
            handleFieldLength(false, false, false);
            return;
        }

        if (email.length === 0 && password.length === 0 && confirmPassword.length === 0) {
            handleFieldLength(true, true, true);
            return;
        }
    };

    return (
        <View>
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
                    <View style={styles.warningTopMargin}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu correo</Text>
                </View>
            }
            <View>
                <Text style={styles.label}>Contraseña</Text>
                <View style={[
                    styles.inputFieldContainer,
                    (fieldLength.password === true) && styles.warningBorder
                ]}>
                    <View style={styles.tinyButtonSize}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordVisibility}
                        style={[
                            styles.inputField,
                            styles.newPasswordInputTextSize,
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
                        <View style={styles.alignItemsCenter}>
                            {(passwordVisibility === false)
                                ? useIcons('Eye', 20, 20)
                                : useIcons('EyeClosed', 20, 20)
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {(fieldLength.password === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningTopMargin}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                </View>
            }
            <View>
                <Text style={styles.label}>Repetir contraseña</Text>
                <View style={[
                    styles.inputFieldContainer,
                    (fieldLength.confirmPassword === true) && styles.warningBorder
                ]}>
                    <View style={styles.tinyButtonSize}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordConfirmVisibility}
                        style={[
                            styles.inputField,
                            styles.newPasswordInputTextSize,
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#9A9A9A'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'confirmPassword')}
                        value={confirmPassword}
                    />
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={handleConfirmPasswordVisibility}
                    >
                        <View style={styles.alignItemsCenter}>
                            {(passwordConfirmVisibility === false)
                                ? useIcons('Eye', 20, 20)
                                : useIcons('EyeClosed', 20, 20)
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {(fieldLength.confirmPassword === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>
                        Ingresa tu contraseña
                    </Text>
                </View>
            }
            {(display === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>
                        Contraseñas no coinciden
                    </Text>
                </View>
            }
            {(authorized === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>
                        Este usuario no puede realizar esta acción
                    </Text>
                </View>
            }
            {(nullUser === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>
                        No existe este correo
                    </Text>
                </View>
            }
            <View style={styles.buttonContainerMarginTop}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={styles.button}
                    onPress={onUpdate}
                >
                    <Text style={styles.buttonText}>Guardar e iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NewPasswordFormInputs;