import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from './MainNavigator';
import { RateScreen, RatingScreen } from '../screens';

const Stack = createStackNavigator<RootStackParams>();

export const RatingNavigator = () => {

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
            <Stack.Screen name='RatingScreen' options={{
                headerTitle: 'Calificar lugares',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.navigate('MainScreen')}
                    >
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
                    </TouchableOpacity>
                )
            }}
                component={RatingScreen}
            />
            <Stack.Screen name='RateScreen' options={{
                headerTitle: 'Calificar',
                headerStyle: { backgroundColor: '#5856D6' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ marginLeft: 15 }}
                        onPress={() => navigator.navigate('RatingScreen')}
                    >
                        <Icon
                            name='arrow-back-outline'
                            size={25}
                            color={'#FFFFFF'} />
                    </TouchableOpacity>
                )
            }}
                component={RateScreen} />
        </Stack.Navigator>
    );
};