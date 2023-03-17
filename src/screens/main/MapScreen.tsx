import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import useLocation from '../../hooks/useLocation';
import LoadingScreen from '../LoadingScreen';
import Geocoder from '../../api/geocoder';
import { Location } from '../../interfaces/app-interfaces';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface Props extends StackScreenProps<any, any> { };

const MapScreen = ({ route, navigation }: Props) => {

    const { place } = route.params!;

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    const { hasLocation, initialPosition, currentUserLocation, followUserLocation, stopFollowingUserLocation } = useLocation();

    const [destination, setDestination] = useState<Location>();

    useEffect(() => {
        getCoordsFromAddress(place);
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

    const getCoordsFromAddress = async (address: string) => {
        const { results } = await Geocoder.from(address);
        const { lat, lng } = results[0].geometry.location;
        setDestination({
            latitude: lat,
            longitude: lng
        });
    };
    
    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
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
                    {(initialPosition) && <Marker coordinate={initialPosition} />}
                    {(destination) && <Marker coordinate={destination} />}
                </MapView>
        </>
    );
};

export default MapScreen;