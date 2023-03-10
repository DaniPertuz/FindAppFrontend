import React, { useContext, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../context';
import { useForm } from '../../hooks/useForm';
import { styles } from '../../theme/AppTheme';
import Background from '../../components/Background';
import FormInputs from '../../components/FormInputs';

interface Props extends StackScreenProps<any, any> { }

const LoginScreen = ({ navigation }: Props) => {

  const { signIn, errorMessage, removeError } = useContext(AuthContext);

  const { username, password, onChange } = useForm({
    username: '',
    password: ''
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: removeError }]);
  }, [errorMessage]);

  const onLogin = () => {
    Keyboard.dismiss();
    signIn({ username, password });
  };

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{
          flex: 1
        }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View
          style={styles.formContainer}
        >
          <Text
            style={styles.title}
          >
            FindAPP
          </Text>
          <FormInputs
            username={username}
            password={password}
            onChange={onChange}
            onLogin={onLogin}
          />
        </View>
        <View style={styles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => navigation.replace('RegisterScreen')}
          >
            <Text style={styles.buttonText}>Nueva cuenta</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;