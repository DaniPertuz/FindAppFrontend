import React, { useContext, useEffect } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { AuthContext } from '../../context';
import { useForm } from '../../hooks/useForm';
import Background from '../../components/Background';
import FormInputs from '../../components/FormInputs';

import { styles } from '../../theme/AppTheme';

const LoginScreen = () => {

  const { errorMessage, removeError } = useContext(AuthContext);

  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: removeError }]);
  }, [errorMessage]);

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollViewBackground}>
      <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
        <Background />
        <View style={styles.formContainer}>
          <View style={styles.alignItemsCenter}>
            <Image source={require('../../assets/FA_COMPLETE_Color.png')} style={styles.mainLogo} />
          </View>
          <View style={styles.mediumMarginBottom}>
            <View style={styles.tinyMarginBottom}>
              <Text style={styles.welcomeTitleText}>
                Bienvenido
              </Text>
            </View>
            <Text style={styles.welcomeSubtitleText}>
              Ingresa tus credenciales para continuar
            </Text>
          </View>
          <FormInputs
            email={email.trim()}
            password={password}
            onChange={onChange}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;