import React, { useEffect, useContext } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthContext } from '../../context';
import { useForm } from '../../hooks/useForm';

import { loginStyles } from '../../theme/AppTheme';
import { roles } from '../../interfaces';

interface Props extends StackScreenProps<any, any> { };

const RegisterScreen = ({ navigation }: Props) => {

  const { signUp, errorMessage, removeError, user } = useContext(AuthContext);

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: removeError }]);
  }, [errorMessage]);

  const onRegister = () => {
    Keyboard.dismiss();

    signUp({
      name,
      email,
      password,
      role: roles.CLIENT,
      status: true
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#5856D6'
        }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <ScrollView
          style={loginStyles.formContainer}
          contentContainerStyle={{
            justifyContent: 'center'
          }}>

          {/* Keyboard avoid view */}
          {/* <WhiteLogo /> */}
          <Text style={loginStyles.title}>
            Crear cuenta
          </Text>
          <Text style={loginStyles.label}>
            Nombre:
          </Text>
          <TextInput
            placeholder='Ingrese su nombre'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='#FFFFFF'
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor='#FFFFFF'
            autoCapitalize='words'
            autoCorrect={false}
            onSubmitEditing={onRegister}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
          />
          <Text style={loginStyles.label}>
            Email:
          </Text>
          <TextInput
            placeholder='Ingrese su email'
            placeholderTextColor='rgba(255,255,255,0.4)'
            keyboardType='email-address'
            underlineColorAndroid='#FFFFFF'
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor='#FFFFFF'
            autoCapitalize='none'
            autoCorrect={false}
            onSubmitEditing={onRegister}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
          />
          <Text style={loginStyles.label}>
            Password:
          </Text>
          <TextInput
            placeholder='******'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='#FFFFFF'
            secureTextEntry
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor='#FFFFFF'
            autoCapitalize='none'
            autoCorrect={false}
            onSubmitEditing={onRegister}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
          />
          {/* Botón login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}
            >
              <Text style={loginStyles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Crear una nueva cuenta */}
        <TouchableOpacity
          onPress={() => navigation.replace('LoginScreen')}
          activeOpacity={0.8}
          style={loginStyles.buttonReturn}
        >
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;