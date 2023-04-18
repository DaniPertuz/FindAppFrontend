import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DeviceTimeFormat from 'react-native-device-time-format';
import moment from 'moment';

import useLocation from '../../hooks/useLocation';
import LoadingScreen from '../LoadingScreen';
import { Location } from '../../interfaces/app-interfaces';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useCoords } from '../../hooks/useCoords';
import { RootStackParams } from '../../navigation';
import { AuthContext, PlacesContext } from '../../context';

interface Props extends StackScreenProps<RootStackParams, 'MapScreen'> { };

const MapScreen = ({ route, navigation }: Props) => {

    const { place, search } = route.params;

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    const { hasLocation, initialPosition, currentUserLocation, followUserLocation, stopFollowingUserLocation } = useLocation();

    const [destination, setDestination] = useState<Location>();
    const [duration, setDuration] = useState(0);
    const [distance, setDistance] = useState(0);
    const [deviceFormat, setDeviceFormat] = useState(false);

    const { user } = useContext(AuthContext);
    const { addFavorite, addService } = useContext(PlacesContext);

    const getCoords = async () => {
        const { lat, lng } = await useCoords(place.address);
        setDestination({ latitude: lat, longitude: lng });
    };

    const setArrivalTime = () => {
        const current = new Date();
        return moment(current.getTime() + duration * 60000).format(deviceFormat ? 'HH:mm' : 'h:mm A');
    };

    const getDeviceTimeFormat = async () => {
        const currentFormat = await DeviceTimeFormat.is24HourFormat();
        setDeviceFormat(currentFormat);
    };

    useEffect(() => {
        getDeviceTimeFormat();
    }, []);

    useEffect(() => {
        getCoords();
    }, []);

    useEffect(() => {
        followUserLocation();

        return () => {
            stopFollowingUserLocation();
        };
    }, []);

    useEffect(() => {

        if (!following.current) return;

        const { latitude, longitude } = currentUserLocation;

        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        });

        if (currentUserLocation === destination) {
            addService(new Date().toString(), place._id, search, user?._id!);

            Alert.alert(`Has llegado a ${place.name}`, '¿Deseas guardarlo como favorito', [
                {
                    text: 'No',
                    onPress: () => navigation.goBack()
                },
                {
                    text: 'Sí',
                    onPress: () => {
                        addFavorite(user?._id!, place._id);
                        Alert.alert('Agregado a favoritos', '', [{ text: 'OK' }]);
                    }
                }
            ]
            );
        }
    }, [currentUserLocation]);

    const handleBackButtonClick = () => {
        if (currentUserLocation !== destination) {
            Alert.alert('¿Estás seguro de salir?', 'Si no sigues, el lugar no se registrará', [
                {
                    text: 'Salir',
                    onPress: () => navigation.goBack()
                },
                {
                    text: 'Continuar',
                    style: 'cancel'
                },
            ]);
        }
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            {(initialPosition && destination) &&
                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ ...StyleSheet.absoluteFillObject }}
                        followsUserLocation
                        showsUserLocation
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: initialPosition.latitude,
                            longitude: initialPosition.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        onTouchStart={() => following.current = false}
                    >
                        <MapViewDirections
                            apikey={GOOGLE_MAPS_API_KEY}
                            origin={initialPosition}
                            destination={destination}
                            strokeWidth={10}
                            strokeColor={'#5856D6'}
                            onReady={result => { setDistance(result.distance); setDuration(result.duration); }}
                        />
                        <Marker coordinate={initialPosition} />
                        <Marker coordinate={destination} />
                    </MapView>
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,1)',
                            borderColor: '#5856D6',
                            borderWidth: 2,
                            borderRadius: 20,
                            bottom: 30,
                            flexDirection: 'row',
                            left: 10,
                            padding: 20,
                            position: 'absolute',
                            zIndex: 999
                        }}
                    >
                        <View style={{ marginHorizontal: 10 }}><Text>{setArrivalTime()}</Text></View>
                        <View style={{ marginHorizontal: 10 }}><Text>{duration.toFixed(0)} min</Text></View>
                        <View style={{ marginHorizontal: 10 }}><Text>{distance.toFixed(2)} km.</Text></View>
                    </View>
                </View>
            }
        </>
    );
};

export default MapScreen;