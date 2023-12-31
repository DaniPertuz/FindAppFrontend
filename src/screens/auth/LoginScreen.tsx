import React, { useContext, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';

import { AuthContext } from '../../context';
import { useForm } from '../../hooks';
import Background from '../../components/Background';
import FormInputs from '../../components/FormInputs';
import StatusBarComponent from '../../components/StatusBarComponent';

import { styles } from '../../theme/AppTheme';

const LoginScreen = () => {

  const { errorMessage, removeError } = useContext(AuthContext);

  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Toast.show(errorMessage, { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, hideOnPress: true, delay: 0, onHidden: removeError });
  }, [errorMessage]);

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollViewBackground}>
      <StatusBarComponent color='#207CFD' theme='light-content' />
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