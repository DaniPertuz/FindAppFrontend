import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { AuthProvider, PermissionsProvider, PlacesProvider, UsersProvider, RatingProvider, ProductsProvider } from './src/context';
import { Navigator } from './src/navigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const AppState = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <PermissionsProvider>
          <UsersProvider>
            <PlacesProvider>
              <ProductsProvider>
                <RatingProvider>
                  {children}
                </RatingProvider>
              </ProductsProvider>
            </PlacesProvider>
          </UsersProvider>
        </PermissionsProvider>
      </AuthProvider>
    </RootSiblingParent>
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