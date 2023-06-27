import React, { useEffect, useContext, useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../context';
import { useForm } from '../../hooks/useForm';
import { roles } from '../../interfaces';
import { RootStackParams } from '../../navigation';
import Background from '../../components/Background';

import { styles } from '../../theme/AppTheme';

const RegisterScreen = () => {

  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
  const { signUp, errorMessage, removeError } = useContext(AuthContext);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [eyeIcon] = useState('../../assets/eye-closed.png');
  const [fieldLength, setFieldLength] = useState({
    email: false,
    password: false
  });

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const handlePasswordVisibility = () => {
    if (eyeIcon === '../../assets/eye-closed.png') {
      setPasswordVisibility(!passwordVisibility);
    } else if (eyeIcon === '../../assets/eye.png') {
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleFieldLength = (email: boolean, password: boolean) => {
    setFieldLength({
      email,
      password
    });
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: removeError }]);
  }, [errorMessage]);

  const onRegister = () => {
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
      handleFieldLength(false, false);
      return;
    }

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
      <Background />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: 'rgba(104, 110, 222, 0.1)'
        }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={styles.formContainer}>
          <View style={{ marginTop: 36 }}>
            <Text style={{ color: '#081023', fontSize: 24, fontWeight: '700', lineHeight: 28, letterSpacing: -0.4 }}>Crea tu cuenta</Text>
            <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Ingresa tus datos para crear una cuenta</Text>
          </View>
          <View>
            <Text style={styles.label}>Usuario</Text>
            <View style={[
              styles.inputFieldContainer,
              (fieldLength.email === true) && { borderColor: '#D13232', borderWidth: 1 }
            ]}>
              <Image
                source={require('../../assets/user.png')}
                style={{ height: 25, width: 25, marginStart: 16, marginEnd: 5 }}
              />
              <TextInput
                placeholder='Ingresa tu nombre'
                placeholderTextColor='#9A9A9A'
                keyboardType='default'
                style={[
                  styles.inputField,
                  // (Platform.OS === 'ios') && styles.inputFieldIOS
                ]}
                selectionColor='#9A9A9A'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(value) => onChange(value, 'email')}
                value={email}
              />
            </View>
            {(fieldLength.password === true) &&
              < View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Image
                  source={require('../../assets/warning.png')}
                  style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                />
                <Text
                  style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                >
                  Ingresa tu nombre
                </Text>
              </View>
            }
            <Text style={styles.label}>Email</Text>
            <View style={[
              styles.inputFieldContainer,
              (fieldLength.email === true) && { borderColor: '#D13232', borderWidth: 1 }
            ]}>
              <Image
                source={require('../../assets/envelope.png')}
                style={{ height: 25, width: 25, marginStart: 16, marginEnd: 5 }}
              />
              <TextInput
                placeholder='Ingresa tu correo'
                placeholderTextColor='#9A9A9A'
                keyboardType='email-address'
                style={[
                  styles.inputField,
                  // (Platform.OS === 'ios') && styles.inputFieldIOS
                ]}
                selectionColor='#9A9A9A'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(value) => onChange(value, 'email')}
                value={email}
              />
            </View>
            {(fieldLength.password === true) &&
              < View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Image
                  source={require('../../assets/warning.png')}
                  style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                />
                <Text
                  style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                >
                  Ingresa tu correo
                </Text>
              </View>
            }
            <Text style={styles.label}>Contraseña</Text>
            <View style={[
              styles.inputFieldContainer,
              (fieldLength.password === true) && { borderColor: '#D13232', borderWidth: 1 }
            ]}
            >
              <Image
                source={require('../../assets/lock.png')}
                style={{ flex: 0.2, height: 25, width: 25, marginStart: 16 }}
              />
              <TextInput
                placeholder='Ingresa tu contraseña'
                placeholderTextColor='#9A9A9A'
                secureTextEntry={passwordVisibility}
                style={[
                  styles.inputField,
                  { flex: 2, marginHorizontal: 10 },
                  // (Platform.OS === 'ios') && styles.inputFieldIOS
                ]}
                selectionColor='#9A9A9A'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(value) => onChange(value, 'password')}
                value={password}
              />
              <TouchableOpacity
                activeOpacity={1.0}
                onPress={handlePasswordVisibility}
              >
                <Image
                  source={(passwordVisibility === false) ? require('../../assets/eye.png') : require('../../assets/eye-closed.png')}
                  style={{ flex: 0.29, height: 25, width: 25, marginEnd: 16 }}
                />
              </TouchableOpacity>
            </View>
            {(fieldLength.password === true) &&
              < View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Image
                  source={require('../../assets/warning.png')}
                  style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                />
                <Text
                  style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                >
                  Ingresa tu contraseña
                </Text>
              </View>
            }
            <View style={{ marginTop: 29 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onRegister}
              >
                <Text style={styles.buttonText}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 60, marginBottom: 50 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24, marginEnd: 3 }}>
                ¿Ya tienes cuenta?
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigator.replace('LoginScreen')}
            >
              <Text style={{ color: '#207CFD', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.26, marginStart: 3 }}>
                Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;