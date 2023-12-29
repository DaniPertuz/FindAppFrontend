import React, { useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useFieldValidation, useIcons } from '../hooks';
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
    const [eyeIcon, setEyeIcon] = useState('EyeClosed');
    const { fieldLength, validateFields } = useFieldValidation();
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const handlePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
        setEyeIcon((prevIcon) =>
            prevIcon === 'EyeClosed' ? 'Eye' : 'EyeClosed'
        );
    };

    const handleFieldLength = (emailEmpty: boolean, passwordEmpty: boolean) => {
        validateFields({
            email: emailEmpty,
            password: passwordEmpty
        });
    };

    return (
        <View>
            <Text style={styles.label}>
                Usuario o correo
            </Text>
            <View style={[
                styles.inputFieldContainer,
                (fieldLength.email) && styles.warningBorder
            ]}>
                {useIcons('User', 20, 20)}
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
            {(fieldLength.email) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu correo electrónico</Text>
                </View>
            }
            <Text style={styles.label}>
                Contraseña
            </Text>
            <View style={[styles.inputFieldContainer, (fieldLength.password) && styles.warningBorder]}>
                <View style={{ flex: 0.4 }}>
                    {useIcons('Lock', 20, 20)}
                </View>
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
                    <View style={styles.alignItemsCenter}>
                        {useIcons(eyeIcon, 20, 20)}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.flexDirectionRowJustifySpaceBetween}>
                <View style={styles.forgotPasswordContainerWarning}>
                    {(fieldLength.password) &&
                        <View style={styles.flexDirectionRowTinyMarginTop}>
                            <View style={styles.warningIconMargins}>
                                {useIcons('Warning', 15, 15)}
                            </View>
                            <Text style={styles.warningText}>
                                Ingresa tu contraseña
                            </Text>
                        </View>
                    }
                </View>
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