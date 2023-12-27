import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context';
import { styles } from '../theme/AppTheme';

interface Props {
    email: string;
    password: string;
    handleFieldLength: (emailEmpty: boolean, passwordEmpty: boolean) => void
}

const LoginButton = ({ email, password, handleFieldLength }: Props) => {

    const { signIn, errorMessage } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (errorMessage.length > 0) setLoading(false);
    }, [errorMessage]);

    const onLogin = async () => {
        handleFieldLength(email.length === 0, password.length === 0);

        if (email.length !== 0 && password.length !== 0) {
            setLoading(true);
            signIn({ email, password });
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            disabled={loading}
            onPress={onLogin}
        >
            <Text style={styles.buttonText}>
                {loading ? <ActivityIndicator size={22} color='#FFFFFF' /> : 'Iniciar Sesión'}
            </Text>
        </TouchableOpacity>
    );
};

export default LoginButton;