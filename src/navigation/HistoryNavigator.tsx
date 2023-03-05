import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { HistoryScreen, MapScreen } from '../screens';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type RootStackParams = {
    HistoryScreen: undefined,
    MapScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const HistoryNavigator = () => {

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
            <Stack.Screen name="HistoryScreen" options={{
                headerTitle: 'Historial de búsqueda',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.goBack()}
                    >
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
                    </TouchableOpacity>
                )
            }}
                component={HistoryScreen}
            />
            <Stack.Screen name="MapScreen" options={{ title: '' }} component={MapScreen} />
        </Stack.Navigator>
    );
};