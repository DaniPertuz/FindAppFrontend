import React, { useContext, useState } from 'react';
import { Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { UsersContext } from '../context';
import { useEmailValidation, useEmptyFieldValidation, useIcons, usePasswordVisibility } from '../hooks';
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
    const [emailValid, setEmailValid] = useState(true);
    const [nullUser, setNullUser] = useState(false);
    const [warning, setWarning] = useState(false);

    const isValidEmail = useEmailValidation(email);
    const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
    const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
    const { isEmpty: isConfirmedPasswordEmpty, checkEmptyFields: checkConfirmedPasswordEmpty } = useEmptyFieldValidation();
    const { eyeIcon, eyeIconConfirm, passwordVisibility, passwordConfirmVisibility, handlePasswordVisibility, handleConfirmPasswordVisibility } = usePasswordVisibility();

    const onUpdate = async () => {
        Keyboard.dismiss();

        const validation = await loadUserByEmail(email);
        checkEmailEmpty(email);
        checkPasswordEmpty(password);
        checkConfirmedPasswordEmpty(confirmPassword);
        setEmailValid(isValidEmail);
        setWarning(!isValidEmail);

        if (validation === null && email.length !== 0) {
            setNullUser(true);
        }

        if (validation && validation.role !== roles.CLIENT) {
            setAuthorized(true);
            return;
        }

        if (password !== confirmPassword) {
            setDisplay(true);
            return;
        }

        if (email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0) {
            updateUserPassword(email, password);
            navigator.replace('LoginScreen');
        }
    };

    return (
        <View>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputFieldContainer, (isEmailEmpty || warning) && styles.warningBorder]}>
                {useIcons('Envelope', 20, 20)}
                <TextInput
                    placeholder='Ingresa tu correo'
                    placeholderTextColor='#9A9A9A'
                    keyboardType='email-address'
                    style={[styles.inputField, (Platform.OS === 'ios') && styles.inputFieldIOS]}
                    selectionColor='#9A9A9A'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                />
            </View>
            {(isEmailEmpty) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu correo</Text>
                </View>
            }
            {(!emailValid && !isEmailEmpty) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Correo inválido</Text>
                </View>
            }
            <View>
                <Text style={styles.label}>Contraseña</Text>
                <View style={[styles.inputFieldContainer, (isPasswordEmpty) && styles.warningBorder]}>
                    <View style={styles.tinyButtonSize}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordVisibility}
                        style={[styles.inputField, styles.newPasswordInputTextSize, (Platform.OS === 'ios') && styles.inputFieldIOS]}
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
                            {useIcons(eyeIcon, 20, 20)}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {(isPasswordEmpty) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                </View>
            }
            <View>
                <Text style={styles.label}>Repetir contraseña</Text>
                <View style={[styles.inputFieldContainer, (isConfirmedPasswordEmpty) && styles.warningBorder]}>
                    <View style={styles.tinyButtonSize}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordConfirmVisibility}
                        style={[styles.inputField, styles.newPasswordInputTextSize, (Platform.OS === 'ios') && styles.inputFieldIOS]}
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
                            {useIcons(eyeIconConfirm, 20, 20)}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {(isConfirmedPasswordEmpty) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                </View>
            }
            {(display) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Contraseñas no coinciden</Text>
                </View>
            }
            {(authorized) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Este usuario no puede realizar esta acción</Text>
                </View>
            }
            {(nullUser) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>No existe este correo</Text>
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