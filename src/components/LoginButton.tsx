import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../context';
import { useEmailValidation, useEmptyFieldValidation } from '../hooks';

import { styles } from '../theme/AppTheme';

interface Props {
    email: string;
    password: string;
    handleEmailValidation: (valid: boolean) => void;
    handleFieldLength: (emailEmpty: string, passwordEmpty: string) => void;
}

const LoginButton = ({ email, password, handleEmailValidation, handleFieldLength }: Props) => {
    const { signIn, errorMessage } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const isValidEmail = useEmailValidation(email);
    const { isEmpty: isEmailEmpty } = useEmptyFieldValidation();
    const { isEmpty: isPasswordEmpty } = useEmptyFieldValidation();

    useEffect(() => {
        if (errorMessage.length > 0) setLoading(false);
    }, [errorMessage]);

    const onLogin = async () => {
        handleFieldLength(email, password);
        handleEmailValidation(isValidEmail);

        if (!isEmailEmpty && !isPasswordEmpty && isValidEmail) {
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