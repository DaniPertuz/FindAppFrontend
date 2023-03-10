import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const navFocusListener = navigation.addListener('blur', () => {
            navigation.goBack();
        });
    
        return navFocusListener;
    }, []);

    return (
        <MapView
            style={{
                height: '100%',
                width: '100%',
            }}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        />
    );
};

export default MapScreen;