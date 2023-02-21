import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context';
import { LoadingScreen, LoginScreen, MainPictureScreen, RegisterScreen } from '../screens';
import { DrawerNavigator } from './DrawerNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { status, user } = useContext(AuthContext);

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
      {(status !== 'authenticated')
        ?
        (
          <>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
          </>
        )
        :
        (user && user.photo === '')
          ?
          <>
            <Stack.Screen name='MainPictureScreen' component={MainPictureScreen} />
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