import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/auth';
import { Navigator } from './src/navigation/Navigator';
import { ProductsProvider } from './src/context/products';
import { RestaurantsProvider } from './src/context/places';
import { UsersProvider } from './src/context/users';
import { MainScreen } from './src/screens';
import LoginScreen from './src/screens/auth/LoginScreen';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const AppState = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        {children}
      </UsersProvider>
    </AuthProvider>
  );
};

const App = () => {
  
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;