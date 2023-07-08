import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '../../components/Background';
import { RootStackParams } from '../../navigation';
import { useForm } from '../../hooks/useForm';
import { UsersContext } from '../../context';
import { roles } from '../../interfaces';

import Back from '../../assets/back.svg';
import Envelope from '../../assets/envelope.svg';
import Eye from '../../assets/eye.svg';
import EyeClosed from '../../assets/eye-closed.svg';
import Lock from '../../assets/lock.svg';
import Warning from '../../assets/warning.svg';

import { styles } from '../../theme/AppTheme';

const NewPasswordScreen = () => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { loadUserByEmail, updateUserPassword } = useContext(UsersContext);

    const [display, setDisplay] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(true);
    const [fieldLength, setFieldLength] = useState({
        email: false,
        password: false,
        confirmPassword: false
    });
    const [eyeIcon] = useState('../../assets/eye-closed.png');
    const [eyeIconConfirm] = useState('../../assets/eye-closed.png');

    const { email, password, confirmPassword, onChange } = useForm({
        email: '',
        password: '',
        confirmPassword: ''
    });

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

        if (validation.role !== roles.CLIENT) {
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
        <>
            <Background />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollViewBackground}
            >
                <KeyboardAvoidingView
                    style={styles.flexOne}
                    behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                >
                    <View style={styles.formContainer}>
                        <View style={styles.titleMarginTopContainer}>
                            <View style={styles.flexDirectionRow}>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    style={styles.backButtonMargins}
                                    onPress={() => navigator.goBack()}
                                >
                                    <Back height={20} width={20} />
                                </TouchableOpacity>
                                <Text style={styles.backButtonText}>Volver</Text>
                            </View>
                            <Text style={styles.boldLargeText}>Crear nueva contraseña</Text>
                            <Text style={styles.plainSmallText}>Ingresa tu nueva contraseña</Text>
                        </View>
                        <Text style={styles.label}>Email</Text>
                        <View style={[
                            styles.inputFieldContainer,
                            (fieldLength.email === true) && styles.warningBorder
                        ]}>
                            <Envelope height={25} width={25} />
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
                                <Warning height={15} width={15} style={styles.warningTopMargin} />
                                <Text style={styles.warningText}>Ingresa tu correo</Text>
                            </View>
                        }
                        <View>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={[
                                styles.inputFieldContainer,
                                (fieldLength.password === true) && styles.warningBorder
                            ]}>
                                <Lock height={25} width={25} style={styles.tinyButtonSize} />
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
                                    {(passwordVisibility === false)
                                        ? <Eye height={28} width={28} style={styles.extraTinyButtonSize} />
                                        : <EyeClosed height={28} width={28} style={styles.extraTinyButtonSize} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(fieldLength.password === true) &&
                            <View style={styles.flexDirectionRowTinyMarginTop}>
                                <Warning height={15} width={15} style={styles.warningTopMargin} />
                                <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                            </View>
                        }
                        <View>
                            <Text style={styles.label}>Repetir contraseña</Text>
                            <View style={[
                                styles.inputFieldContainer,
                                (fieldLength.confirmPassword === true) && styles.warningBorder
                            ]}>
                                <Lock height={25} width={25} style={styles.tinyButtonSize} />
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
                                    {(passwordConfirmVisibility === false)
                                        ? <Eye height={28} width={28} style={styles.extraTinyButtonSize} />
                                        : <EyeClosed height={28} width={28} style={styles.extraTinyButtonSize} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(fieldLength.confirmPassword === true) &&
                            <View style={styles.flexDirectionRowTinyMarginTop}>
                                <Warning height={15} width={15} style={styles.warningIconMargins} />
                                <Text style={styles.warningText}>
                                    Ingresa tu contraseña
                                </Text>
                            </View>
                        }
                        {(display === true) &&
                            <View style={styles.flexDirectionRowTinyMarginTop}>
                                <Warning height={15} width={15} style={styles.warningIconMargins} />
                                <Text style={styles.warningText}>
                                    Contraseñas no coinciden
                                </Text>
                            </View>
                        }
                        {(authorized === true) &&
                            <View style={styles.flexDirectionRowTinyMarginTop}>
                                <Warning height={15} width={15} style={styles.warningIconMargins} />
                                <Text style={styles.warningText}>
                                    Este usuario no puede realizar esta acción
                                </Text>
                            </View>
                        }
                        <View style={styles.buttonContainerMarginTop}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={styles.button}
                                onPress={onUpdate}
                            >
                                <Text style={styles.buttonText}>Guardar e iniciar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    );
};

export default NewPasswordScreen;