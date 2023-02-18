import React from 'react';
import { Platform, Text, TextInput, View } from 'react-native';

import { styles } from '../theme/AppTheme';
import LoginButton from './LoginButton';

interface Props {
    username: string;
    password: string;
    onChange: (value: string, field: 'username' | 'password') => void;
    onLogin: () => void;
}

const FormInputs = ({ username, password, onChange, onLogin }: Props) => {

    return (
        <View>
            <Text style={styles.label}>
                Nombre de usuario:
            </Text>
            <TextInput
                placeholder='Ingrese su nombre de usuario'
                placeholderTextColor='rgba(255,255,255,0.4)'
                keyboardType='default'
                underlineColorAndroid='#FFFFFF'
                style={[
                    styles.inputField,
                    (Platform.OS === 'ios') && styles.inputFieldIOS
                ]}
                selectionColor='#FFFFFF'
                autoCapitalize='none'
                autoCorrect={false}
                onSubmitEditing={onLogin}
                onChangeText={(value) => onChange(value, 'username')}
                value={username}
            />

            <Text style={styles.label}>
                Contraseña:
            </Text>
            <TextInput
                placeholder='******'
                placeholderTextColor='rgba(255,255,255,0.4)'
                underlineColorAndroid='#FFFFFF'
                secureTextEntry
                style={[
                    styles.inputField,
                    (Platform.OS === 'ios') && styles.inputFieldIOS
                ]}
                selectionColor='#FFFFFF'
                autoCapitalize='none'
                autoCorrect={false}
                onSubmitEditing={onLogin}
                onChangeText={(value) => onChange(value, 'password')}
                value={password}
            />
            <LoginButton username={username} password={password} />
        </View>
    );
};

export default FormInputs;