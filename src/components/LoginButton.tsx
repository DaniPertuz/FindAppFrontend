import React, { useContext, useState } from 'react';
import { ActivityIndicator, Keyboard, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context';
import { styles } from '../theme/AppTheme';

interface Props {
    email: string;
    password: string;
    handleFieldLength: (email: boolean, password: boolean) => void;
}

const LoginButton = ({ email = '', password = '', handleFieldLength }: Props) => {

    const { signIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            signIn({ email, password });
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onLogin}
        >
            <Text style={styles.buttonText}>
                {loading === true ? <ActivityIndicator size={22} color='#FFFFFF' /> : 'Iniciar Sesión'}
            </Text>
        </TouchableOpacity>
    );
};

export default LoginButton;