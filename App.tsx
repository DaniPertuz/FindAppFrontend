import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, UsersProvider, PermissionsProvider } from './src/context';
import { Navigator } from './src/navigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['new NativeEventEmitter']);

const AppState = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <UsersProvider>
          {children}
        </UsersProvider>
      </PermissionsProvider>
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