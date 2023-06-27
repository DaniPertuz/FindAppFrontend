import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext, PermissionsContext } from '../context';
import { LoadingScreen, LoginScreen, MainPictureScreen, NewPasswordScreen, PermissionsScreen, RegisterScreen } from '../screens';
import { DrawerNavigator } from './';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { status, user } = useContext(AuthContext);
  const { permissions } = useContext(PermissionsContext);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFFFFF'
        }
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
          (user && user.photo === '')
            ?
            <>
              <Stack.Screen name='MainPictureScreen' component={MainPictureScreen} />
              <Stack.Screen name='MainScreen' component={DrawerNavigator} />
            </>
            :
            (
              <>
                <Stack.Screen name='MainScreen' component={DrawerNavigator} />
              </>
            )
      }
    </Stack.Navigator>
  );
};