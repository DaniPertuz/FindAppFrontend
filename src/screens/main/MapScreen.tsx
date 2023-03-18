import React, { useEffect, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import useLocation from '../../hooks/useLocation';
import LoadingScreen from '../LoadingScreen';
import { Location } from '../../interfaces/app-interfaces';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useCoords } from '../../hooks/useCoords';

interface Props extends StackScreenProps<any, any> { };

const MapScreen = ({ route, navigation }: Props) => {

    const { place } = route.params!;

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    const { hasLocation, initialPosition, currentUserLocation, followUserLocation, stopFollowingUserLocation } = useLocation();

    const [destination, setDestination] = useState<Location>();

    const getCoords = async () => {
        const { lat, lng } = await useCoords(place);
        setDestination({ latitude: lat, longitude: lng });
    };

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
    }, [currentUserLocation]);

    useEffect(() => {
        const navFocusListener = navigation.addListener('blur', () => {
            navigation.goBack();
        });

        return navFocusListener;
    }, []);

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            {(initialPosition && destination) &&
                <MapView
                    style={{ flex: 1 }}
                    followsUserLocation
                    showsUserLocation
                    provider={PROVIDER_GOOGLE}
                    minZoomLevel={18}
                    zoomEnabled
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
                    />
                    <Marker coordinate={initialPosition} />
                    <Marker coordinate={destination} />
                </MapView>
            }
        </>
    );
};

export default MapScreen;