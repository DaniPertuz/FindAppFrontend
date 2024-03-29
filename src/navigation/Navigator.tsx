import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import { AuthContext, PermissionsContext } from '../context';
import { LoadingScreen, LoginScreen, NewPasswordScreen, PermissionsScreen, RegisterScreen } from '../screens';
import { MainNavigator } from './';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { status, user } = useContext(AuthContext);
  const { permissions } = useContext(PermissionsContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {(!user || status !== 'authenticated')
        ?
        (
          <>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen} />
          </>
        )
        :
        (permissions.locationStatus !== 'granted')
          ?
          <Stack.Screen name='PermissionsScreen' component={PermissionsScreen} />
          :
          <>
            <Stack.Screen name='MainScreen' component={MainNavigator} />
          </>
      }
    </Stack.Navigator>
  );
};