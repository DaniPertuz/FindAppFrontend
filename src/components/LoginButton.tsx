import React, { useContext } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context';
import { styles } from '../theme/AppTheme';

interface Props {
    email: string;
    password: string;
    handleFieldLength: (email: boolean, password: boolean) => void;
}

const LoginButton = ({ email = '', password = '', handleFieldLength }: Props) => {

    const { signIn } = useContext(AuthContext);

    const onLogin = () => {
        Keyboard.dismiss();

        if (email.length === 0 && password.length !== 0) {
            handleFieldLength(true, false);
            return;
        }

        if (email.length !== 0 && password.length === 0) {
            handleFieldLength(false, true);
            return;
        }

        if (email.length === 0 && password.length === 0) {
            handleFieldLength(true, true);
            return;
        }

        if (email.length !== 0 && password.length !== 0) {
            signIn({ email, password });
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onLogin}
        >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
    );
};

export default LoginButton;