import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { GOOGLE_MAPS_API_KEY } from '@env';
import { useIcons } from '../hooks/useIcons';
import useLocation from '../hooks/useLocation';
import { IPlace, Location, Step } from '../interfaces';
import { RootStackParams } from '../navigation';

interface Props {
    follow: boolean;
    following: React.MutableRefObject<boolean>;
    heading: number;
    mapViewRef?: React.RefObject<MapView>;
    initialPosition: Location;
    currentUserLocation: Location;
    destination: Location;
    routeBounds: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    setDistance: (distance: number) => void;
    setDuration: (duration: number) => void;
}

const MapComponent = ({ follow, following, heading, mapViewRef, initialPosition, currentUserLocation, destination, routeBounds, setDistance, setDuration }: Props) => {

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { getCurrentLocation } = useLocation();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const setInitialPosition = async () => {
        if (follow === false) {
            const { latitude, longitude } = await getCurrentLocation();
            mapViewRef?.current?.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }, 100);
        }
    };

    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        mapViewRef?.current?.animateCamera({
            center: {
                latitude,
                longitude
            },
            heading,
            pitch: 0,
            zoom: 18,
            altitude: 2000
        }, { duration: 0 });
    };

    const handleRegionChangeComplete = () => {

        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            centerPosition();
            timerRef.current = null;
        }, 5000);
    };

    useEffect(() => {
        if (!following.current) return;

        setInitialPosition();
    }, [follow]);

    useEffect(() => {
        if (follow) centerPosition();
    }, [follow, currentUserLocation]);

    return (
        <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            ref={mapViewRef}
            followsUserLocation={false}
            pitchEnabled={follow}
            camera={{
                center: {
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude
                },
                heading: heading || 0,
                pitch: 0,
                zoom: (follow === false) ? 13 : 18,
                altitude: (follow === false) ? 20000 : 2000
            }}
            showsUserLocation
            showsMyLocationButton={false}
            showsCompass={false}
            scrollEnabled={true}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
            initialRegion={routeBounds}
            onTouchStart={() => following.current = false}
            onRegionChangeComplete={handleRegionChangeComplete}
        >
            <MapViewDirections
                apikey={GOOGLE_MAPS_API_KEY}
                origin={currentUserLocation}
                destination={destination}
                strokeWidth={5}
                strokeColor={'#5856D6'}
                onReady={(result) => { setDistance(result.distance); setDuration(result.duration); }}
            />
            <MapViewDirections
                apikey={GOOGLE_MAPS_API_KEY}
                origin={initialPosition}
                destination={currentUserLocation}
                strokeWidth={5}
                strokeColor={'rgba(88, 86, 214, 0.2)'}
            />
            <Marker coordinate={initialPosition} />
            <Marker coordinate={destination}>
                <View style={{ backgroundColor: '#F2F2F2', borderRadius: 30, padding: 5 }}>
                    {useIcons('Finish', 25, 25)}
                </View>
            </Marker>
        </MapView>
    );
};

export default MapComponent;