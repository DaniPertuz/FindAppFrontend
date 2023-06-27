import React, { useContext, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '../../components/Background';
import { RootStackParams } from '../../navigation';
import { useForm } from '../../hooks/useForm';
import { UsersContext } from '../../context';
import { roles } from '../../interfaces';

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
                contentContainerStyle={{ backgroundColor: 'rgba(104, 110, 222, 0.1)', minHeight: '100%', paddingBottom: 40 }}
            >
                <KeyboardAvoidingView
                    style={{
                        flex: 1
                    }}
                    behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                >
                    <View style={styles.formContainer}>
                        <View style={{ marginTop: 36 }}>
                            <Text style={{ color: '#081023', fontSize: 24, fontWeight: '700', lineHeight: 28, letterSpacing: -0.4 }}>Crear nueva contraseña</Text>
                            <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Ingresa tu nueva contraseña</Text>
                        </View>
                        <Text style={styles.label}>Email</Text>
                        <View style={[
                            styles.inputFieldContainer,
                            (fieldLength.email === true) && { borderColor: '#D13232', borderWidth: 1 }
                        ]}>
                            <Image
                                source={require('../../assets/envelope.png')}
                                style={{ height: 25, width: 25, marginStart: 16, marginEnd: 5 }}
                            />
                            <TextInput
                                placeholder='Ingresa tu correo'
                                placeholderTextColor='#9A9A9A'
                                keyboardType='email-address'
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
                                    source={require('../../assets/warning.png')}
                                    style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                                />
                                <Text
                                    style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                                >
                                    Ingresa tu correo
                                </Text>
                            </View>
                        }
                        <View>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={[
                                styles.inputFieldContainer,
                                (fieldLength.password === true) && { borderColor: '#D13232', borderWidth: 1 }
                            ]}>
                                <Image
                                    source={require('../../assets/lock.png')}
                                    style={{ flex: 0.2, height: 25, width: 25, marginStart: 16, marginEnd: 5 }}
                                />
                                <TextInput
                                    placeholder='Ingresa tu contraseña'
                                    placeholderTextColor='#9A9A9A'
                                    secureTextEntry={passwordVisibility}
                                    style={[
                                        styles.inputField,
                                        { flex: 2, marginHorizontal: 2 },
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
                                        source={(passwordVisibility === false) ? require('../../assets/eye.png') : require('../../assets/eye-closed.png')}
                                        style={{ flex: 0.1, height: 25, width: 25, marginEnd: 16 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(fieldLength.password === true) &&
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    source={require('../../assets/warning.png')}
                                    style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                                />
                                <Text
                                    style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                                >
                                    Ingresa tu contraseña
                                </Text>
                            </View>
                        }
                        <View>
                            <Text style={styles.label}>Repetir contraseña</Text>
                            <View style={[
                                styles.inputFieldContainer,
                                (fieldLength.confirmPassword === true) && { borderColor: '#D13232', borderWidth: 1 }
                            ]}>
                                <Image
                                    source={require('../../assets/lock.png')}
                                    style={{ flex: 0.2, height: 25, width: 25, marginStart: 16, marginEnd: 5 }}
                                />
                                <TextInput
                                    placeholder='Ingresa tu contraseña'
                                    placeholderTextColor='#9A9A9A'
                                    secureTextEntry={passwordConfirmVisibility}
                                    style={[
                                        styles.inputField,
                                        { flex: 2, marginHorizontal: 2 },
                                        // (Platform.OS === 'ios') && styles.inputFieldIOS
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
                                    <Image
                                        source={(passwordConfirmVisibility === false) ? require('../../assets/eye.png') : require('../../assets/eye-closed.png')}
                                        style={{ flex: 0.1, height: 25, width: 25, marginEnd: 16 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(fieldLength.confirmPassword === true) &&
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    source={require('../../assets/warning.png')}
                                    style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                                />
                                <Text
                                    style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                                >
                                    Ingresa tu contraseña
                                </Text>
                            </View>
                        }
                        {(display === true) &&
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    source={require('../../assets/warning.png')}
                                    style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                                />
                                <Text
                                    style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                                >
                                    Contraseñas no coinciden
                                </Text>
                            </View>
                        }
                        {(authorized === true) &&
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    source={require('../../assets/warning.png')}
                                    style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                                />
                                <Text
                                    style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                                >
                                    Este usuario no puede realizar esta acción
                                </Text>
                            </View>
                        }
                        <View style={{ marginTop: 30 }}>
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