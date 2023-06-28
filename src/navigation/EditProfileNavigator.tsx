import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParams } from './MainNavigator';
import { EditProfileScreen } from '../screens';

const Stack = createStackNavigator<RootStackParams>();

export const EditProfileNavigator = () => {

    const navigator = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="EditProfileScreen" options={{
                headerTitle: 'Editar perfil',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.reset({ index: 0, routes: [{ name: 'MainScreen' }] })}
                    >
                    </TouchableOpacity>
                )
            }}
                component={EditProfileScreen}
            />
        </Stack.Navigator>
    );
};