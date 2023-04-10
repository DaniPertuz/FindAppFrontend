import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, PermissionsProvider, PlacesProvider, UsersProvider, RatingProvider } from './src/context';
import { Navigator } from './src/navigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const AppState = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <UsersProvider>
          <PlacesProvider>
            <RatingProvider>
              {children}
            </RatingProvider>
          </PlacesProvider>
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