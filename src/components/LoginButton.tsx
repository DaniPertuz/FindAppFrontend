import React, { useContext } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context';
import { styles } from '../theme/AppTheme';

const LoginButton = ({ email = '', password = '' }) => {

    const { signIn } = useContext(AuthContext);

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ email, password });
    };

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginButton;