import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import DeviceTimeFormat from 'react-native-device-time-format';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeepAwake from 'react-native-keep-awake';
import moment from 'moment';

import LoadingScreen from '../LoadingScreen';
import { Direction, Location, Step } from '../../interfaces/app-interfaces';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useCoords } from '../../hooks/useCoords';
import { useIcons } from '../../hooks/useIcons';
import useLocation from '../../hooks/useLocation';
import { RootStackParams } from '../../navigation';
import { AuthContext } from '../../context';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'MapScreen'> { };

const MapScreen = ({ route, navigation }: Props) => {

    const { place, search } = route.params;

    const mapViewRef = useRef<MapView>(null);
    const following = useRef<boolean>(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { top } = useSafeAreaInsets();

    const { hasLocation, initialPosition, currentUserLocation, getCurrentLocation, followUserLocation, stopFollowingUserLocation } = useLocation();

    const [destination, setDestination] = useState<Location>();
    const [duration, setDuration] = useState(0);
    const [distance, setDistance] = useState(0);
    const [direction, setDirection] = useState<Step>({ distance: '', end_location: currentUserLocation, html_instructions: '', maneuver: '' });
    const [steps, setSteps] = useState<Step[]>([]);
    const [deviceFormat, setDeviceFormat] = useState(false);
    const [movement, setMovement] = useState<boolean>(false);
    const [follow, setFollow] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [modalFollowVisible, setModalFollowVisible] = useState(false);
    const [routeBounds, setRouteBounds] = useState<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    }>();

    const { user } = useContext(AuthContext);

    const getCoords = async () => {
        const { lat, lng } = await useCoords(place.address);
        setDestination({ latitude: lat, longitude: lng });
    };

    const setInitialPosition = async () => {
        if (follow === false) {
            const { latitude, longitude } = await getCurrentLocation();
            mapViewRef.current?.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 100);
        }
    };

    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            },
            heading: 90,
            pitch: 0,
            zoom: (follow === false) ? 14 : 20,
            altitude: (follow === false) ? 20000 : 2000
        });
    };

    const setArrivalTime = () => {
        const current = new Date();
        return moment(current.getTime() + duration * 60000).format(deviceFormat ? 'HH:mm' : 'h:mm A');
    };

    const getDeviceTimeFormat = async () => {
        const currentFormat = await DeviceTimeFormat.is24HourFormat();
        setDeviceFormat(currentFormat);
    };

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

    useEffect(() => {
        getDeviceTimeFormat();
    }, []);

    useEffect(() => {
        KeepAwake.activate();
        return () => KeepAwake.deactivate();
    }, []);

    useEffect(() => {
        if (steps.length === 0) {
            getCoords();
        }
    }, [destination]);

    useEffect(() => {
        followUserLocation();

        return () => {
            stopFollowingUserLocation();
        };
    }, []);

    useEffect(() => {

        if (!following.current) return;

        setInitialPosition();

        if (follow === true) {
            centerPosition();
        }

        if (JSON.stringify(currentUserLocation) === JSON.stringify(destination)) {
            navigation.navigate('RateScreen', { item: { place, search, user: user?._id! } });
        }
    }, [currentUserLocation, destination]);

    useEffect(() => {
        if (destination) setRouteBounds(calculateRouteBounds([initialPosition, destination]));
    }, [destination]);

    useEffect(() => {
        let mounted = true;
        if (destination && mounted) {
            const waypoints: { latitude: number; longitude: number; }[] = [];

            const directions = {
                currentUserLocation,
                destination,
                waypoints,
                key: GOOGLE_MAPS_API_KEY,
            };

            fetchDirections(directions);
        }

        return () => {
            mounted = false;
        };
    }, [currentUserLocation, destination]);

    const convertText = (text: string) => (
        text
            .replace(/\n/ig, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/ig, '')
            .replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/ig, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/ig, '')
            .replace(/<\/\s*(?:p|div)>/ig, '\n')
            .replace(/<br[^>]*\/?>/ig, '\n')
            .replace(/<[^>]*>/ig, ' ')
            .replace('&nbsp;', ' ')
            .replace(/[^\S\r\n][^\S\r\n]+/ig, ' ')
    );

    const renderDirection = (instruction: string) => {
        switch (instruction) {
            case 'turn-slight-left':
                return useIcons('ArrowUpLeft', 46, 46);
            case 'turn-slight-right':
                return useIcons('ArrowUpRight', 46, 46);
            case 'straight':
                return useIcons('ArrowUp', 46, 46);
            case 'turn-left':
                return useIcons('ArrowElbowUpLeft', 46, 46);
            case 'turn-right':
                return useIcons('ArrowElbowUpRight', 46, 46);
            default:
                return useIcons('Car', 46, 46);
        }
    };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    const handleBackButtonClick = () => {
        if (follow === false) {
            navigation.pop();
            return true;
        }

        if (JSON.stringify(currentUserLocation) !== JSON.stringify(destination)) {
            Alert.alert('¿Estás seguro de salir?', 'Si no sigues, el lugar no se registrará en tu historial de lugares visitados', [
                {
                    text: 'Salir',
                    onPress: () => { setFollow(false); setModalFollowVisible(false); navigation.goBack(); }
                },
                {
                    text: 'Continuar',
                    style: 'cancel'
                }
            ]);
            return true;
        }
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [navigation]);

    useEffect(() => {
        if (steps.length > 0) {
            followDirections();
        }
    }, [currentUserLocation, steps]);

    const getDirections = async (directions: any) => {
        try {
            let apiUrl = `https://maps.googleapis.com/maps/api/directions/json?&origin=${directions.currentUserLocation.latitude},${directions.currentUserLocation.longitude}&destination=${directions.destination.latitude},${directions.destination.longitude}&key=${directions.key}&language=es`;

            if (directions.waypoints.length > 0) {
                const waypointsString = directions.waypoints
                    .map((waypoint: Location) => `${waypoint.latitude},${waypoint.longitude}`)
                    .join('|');

                apiUrl += `&waypoints=${waypointsString}`;
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 'OK') {
                return data.routes[0].legs[0].steps;
            } else {
                throw new Error('Failed to fetch directions');
            }
        } catch (error: any) {
            throw new Error('Error fetching directions: ' + error.message);
        }
    };

    const fetchDirections = async (directions: any) => {
        try {
            const response = await getDirections(directions);
            const data = response as Direction[];

            const stepsData: Step[] = [];

            data.forEach((step: Direction) => {
                stepsData.push({
                    distance: step.distance.text,
                    html_instructions: step.html_instructions,
                    maneuver: step.maneuver,
                    end_location: step.end_location
                });
            });

            setSteps(stepsData);
        } catch (error: any) {
            console.error('Error fetching directions:', error.message);
        }
    };

    const followDirections = () => {
        if (!currentUserLocation) return;

        const stepIndex = steps.length >= 1 && (JSON.stringify(currentUserLocation) !== JSON.stringify(destination)) ? 1 : 0;
        setDirection(steps[stepIndex]);
    };

    const calculateRouteBounds = (coordinates: Location[]) => {
        let minLat = coordinates[0].latitude;
        let maxLat = coordinates[0].latitude;
        let minLng = coordinates[0].longitude;
        let maxLng = coordinates[0].longitude;

        coordinates.forEach((coord) => {
            minLat = Math.min(minLat, coord.latitude);
            maxLat = Math.max(maxLat, coord.latitude);
            minLng = Math.min(minLng, coord.longitude);
            maxLng = Math.max(maxLng, coord.longitude);
        });

        return {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: maxLat - minLat + 0.01,
            longitudeDelta: maxLng - minLng + 0.01
        };
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

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            {(initialPosition && destination) &&
                <View style={styles.flexOne}>
                    <MapView
                        style={{ ...StyleSheet.absoluteFillObject }}
                        ref={mapViewRef}
                        followsUserLocation={true}
                        pitchEnabled={follow}
                        camera={{
                            center: {
                                latitude: initialPosition.latitude,
                                longitude: initialPosition.longitude,
                            },
                            heading: 90,
                            pitch: 0,
                            zoom: (follow === false) ? 14 : 20,
                            altitude: (follow === false) ? 20000 : 2000
                        }}
                        showsUserLocation
                        showsMyLocationButton={false}
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
                        <Marker coordinate={destination} />
                    </MapView>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.mapNavigationModal}>
                            <View style={{ ...styles.flexDirectionRowJustifySpaceBetween, ...styles.mediumMarginTop, marginHorizontal: 21 }}>
                                <View style={{ ...styles.flexDirectionRow, marginBottom: 15 }}>
                                    <Text style={styles.mapDuration}>
                                        {duration.toFixed(0)} min
                                    </Text>
                                    <View style={{ ...styles.flexDirectionRowAlignJustifyCenter, marginStart: 6 }}>
                                        {useIcons('Timer', 15, 15)}
                                        <View style={styles.smallMarginStart}>
                                            <Text style={styles.mapFollowSmallText}>{setArrivalTime()}</Text>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.flexDirectionRowAlignJustifyCenter, marginStart: 6 }}>
                                        {useIcons('Location', 15, 15)}
                                        <View style={styles.smallMarginStart}>
                                            <Text style={styles.mapFollowSmallText}>{distance.toFixed(1)} Km</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.flexDirectionRowJustifySpaceBetween, marginHorizontal: 21 }}>
                                <View style={{ marginEnd: 70 }}>
                                    <View style={styles.tinyMarginBottom}>
                                        <Text style={styles.boldMediumText}>{place.name}</Text>
                                    </View>
                                    <View style={styles.tinyMarginBottom}>
                                        <Text style={styles.mapAddress}>{formatAddress(place.address)}</Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => { setFollow(true); setModalVisible(false); setModalFollowVisible(true); }}
                                        style={styles.mapNavigationButton}
                                    >
                                        <Text style={styles.mapNavigationButtonText}>
                                            Iniciar Ruta
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.mapBackButtonPosition}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={() => { setModalVisible(false); navigation.pop(); }}
                            >
                                <View style={styles.flexDirectionRow}>
                                    <View style={styles.extraTinyMarginTop}>
                                        {useIcons('Back', 18, 18)}
                                    </View>
                                    <Text style={{ ...styles.mapBackButtonText, ...styles.smallMarginStart }}>Volver</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    {modalFollowVisible === true &&
                        <>
                            <View style={{ marginTop: (Platform.OS === 'ios') ? top : top + 20 }}>
                                <View style={styles.mapDirectionsBackground}>
                                    <View style={{ alignSelf: 'center', marginHorizontal: 10 }}>
                                        {renderDirection((direction.maneuver === undefined) ? 'Car' : direction.maneuver)}
                                    </View>
                                    <View style={{ ...styles.justifyContentCenter, maxWidth: '75%' }}>
                                        <Text style={styles.detailsMainName}>{direction.distance}</Text>
                                        <Text numberOfLines={2} style={{ ...styles.placeholderText }}>{convertText(direction.html_instructions!)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.mapFollowModal, height: (Platform.OS === 'ios') ? '20%' : '15%', top: (Platform.OS === 'ios') ? '72%' : '75%' }}>
                                <View style={{ ...styles.flexDirectionRowAlignJustifyCenter, ...styles.mediumMarginTop }}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        style={styles.modalBackButtonMargins}
                                        onPress={centerPosition}
                                    >
                                        <View style={styles.mapFollowButton}>
                                            {useIcons('Crosshair', 30, 30)}
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginHorizontal: 48 }}>
                                        <Text style={styles.mapFollowArrivalTime}>{setArrivalTime()}</Text>
                                        <View style={styles.smallMarginTop}>
                                            <View style={styles.flexDirectionRow}>
                                                <View style={{ ...styles.flexDirectionRow, marginEnd: 5 }}>
                                                    {useIcons('Map', 15, 15)}
                                                    <View style={styles.smallMarginStart}>
                                                        <Text style={styles.mapFollowSmallText}>
                                                            {duration.toFixed(0)} min
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ ...styles.flexDirectionRow, marginStart: 5 }}>
                                                    {useIcons('Location', 15, 15)}
                                                    <View style={styles.smallMarginStart}>
                                                        <Text style={styles.mapFollowSmallText}>
                                                            {distance.toFixed(1)} Km
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.mapFollowButton}>
                                        <TouchableOpacity
                                            activeOpacity={1.0}
                                            onPress={handleBackButtonClick}
                                        >
                                            {useIcons('Close', 30, 30)}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                </View >
            }
        </>
    );
};

export default MapScreen;
