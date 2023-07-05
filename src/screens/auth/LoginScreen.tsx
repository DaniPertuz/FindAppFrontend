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
    <ScrollView
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{ backgroundColor: 'rgba(104, 110, 222, 0.1)', flex: 1, paddingBottom: 40 }}
    >
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <Background />
        <View
          style={styles.formContainer}
        >
          <View style={styles.alignItemsCenter}>
            <Image
              source={require('../../assets/FA_COMPLETE_Color.png')}
              style={{ height: 107, width: 239, marginBottom: 33, marginTop: 40, marginHorizontal: 98 }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#2F2F2F', fontSize: 24, fontWeight: '700', lineHeight: 28, letterSpacing: -0.4, marginBottom: 5 }}>
              Bienvenido
            </Text>
            <Text style={{ color: '#2F2F2F', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>
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