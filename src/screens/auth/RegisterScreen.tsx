import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import Background from '../../components/Background';
import RegisterFormInputs from '../../components/RegisterFormInputs';
import StatusBarComponent from '../../components/StatusBarComponent';
import { useForm } from '../../hooks';

import { styles } from '../../theme/AppTheme';

const RegisterScreen = () => {

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  return (
    <>
      <Background />
      <StatusBarComponent color='#207CFD' theme='light-content' />
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollViewBackground}>
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
          <View style={styles.registerFormContainer}>
            <View style={styles.titleMarginTopContainer}>
              <Text style={styles.boldLargeText}>Crea tu cuenta</Text>
              <Text style={styles.plainSmallText}>Ingresa tus datos para crear una cuenta</Text>
            </View>
            <RegisterFormInputs name={name} email={email} password={password} onChange={onChange} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;