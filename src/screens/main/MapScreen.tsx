import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Platform, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MapView from 'react-native-maps';
import DeviceTimeFormat from 'react-native-device-time-format';
import Modal from "react-native-modal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeepAwake from 'react-native-keep-awake';
import moment from 'moment';

import LoadingScreen from '../LoadingScreen';
import MapComponent from '../../components/MapComponent';
import { Direction, DirectionData, Location, Step } from '../../interfaces/app-interfaces';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useDistance, useCoords, useIcons, useLocation } from '../../hooks';
import { RootStackParams } from '../../navigation';
import { AuthContext } from '../../context';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'MapScreen'> { };

const MapScreen = ({ route, navigation }: Props) => {

    const { place, search } = route.params;

    const mapViewRef = useRef<MapView>(null);
    const following = useRef<boolean>(true);
    const { top } = useSafeAreaInsets();

    const { hasLocation, heading, initialPosition, currentUserLocation, getCurrentLocation, followUserLocation, stopFollowingUserLocation } = useLocation();

    const [destination, setDestination] = useState<Location>();
    const [duration, setDuration] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [distanceNextStep, setDistanceNextStep] = useState<number>(0);
    const [distanceToDestination, setDistanceToDestination] = useState<number>(0);
    const [direction, setDirection] = useState<Step>({ end_location: currentUserLocation, html_instructions: '', maneuver: '' });
    const [steps, setSteps] = useState<Step[]>([]);
    const [deviceFormat, setDeviceFormat] = useState<boolean>(false);
    const [follow, setFollow] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(true);
    const [modalFollowVisible, setModalFollowVisible] = useState<boolean>(false);
    const [routeBounds, setRouteBounds] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number; }>();

    const { user } = useContext(AuthContext);

    const getCoords = async () => {
        const { lat, lng } = await useCoords(place.address);
        setDestination({ latitude: lat, longitude: lng });
    };

    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        mapViewRef?.current?.animateCamera({
            center: {
                latitude,
                longitude
            },
            heading: heading || 0,
            pitch: 0,
            zoom: 18,
            altitude: 2000
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

    const getBack = () => { setModalVisible(false); navigation.popToTop(); };

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
        switch (true) {
            case instruction.includes('Continúa recto'):
            case instruction.includes('Dirígete hacia el norte'):
                return useIcons('ArrowUp', 46, 46);

            case instruction.includes('Gira a la derecha'):
            case instruction.includes('Dirígete hacia el este'):
                return useIcons('ArrowElbowUpRight', 46, 46);

            case instruction.includes('Gira a la izquierda'):
            case instruction.includes('Dirígete hacia el oeste'):
                return useIcons('ArrowElbowUpLeft', 46, 46);

            case instruction.includes('Gira ligeramente a la derecha'):
                return useIcons('ArrowUpRight', 46, 46);

            case instruction.includes('Gira ligeramente a la izquierda'):
                return useIcons('ArrowUpLeft', 46, 46);

            default:
                return useIcons('Car', 46, 46);
        }
    };

    const handleBackButtonClick = () => {
        Alert.alert('¿Estás seguro de salir?', 'Si no sigues, el lugar no se registrará en tu historial de lugares visitados', [
            {
                text: 'Salir',
                onPress: () => { setFollow(false); setModalFollowVisible(false); navigation.popToTop(); }
            },
            {
                text: 'Continuar',
                style: 'cancel'
            }
        ]);
        return true;
    };

    const getDirections = async (directions: DirectionData): Promise<any> => {
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

    const fetchDirections = async (directions: DirectionData) => {
        try {
            const response = await getDirections(directions);
            const data = response as Direction[];

            const stepsData: Step[] = [];

            data.forEach((step: Direction) => {
                stepsData.push({
                    html_instructions: step.html_instructions,
                    maneuver: step.maneuver,
                    end_location: { latitude: step.end_location.lat, longitude: step.end_location.lng }
                });
            });

            setSteps(stepsData);
        } catch (error: any) {
            console.error('Error fetching directions:', error.message);
        }
    };

    const followDirections = () => {
        if (!currentUserLocation) return;

        const stepIndex = steps.length === 2 ? 1 : 0;
        if (steps[stepIndex]) {
            const nextStepDistance = useDistance(currentUserLocation.latitude, currentUserLocation.longitude, steps[stepIndex].end_location.latitude, steps[stepIndex].end_location.longitude, 'K');
            setDirection(steps[stepIndex]);
            setDistanceNextStep(nextStepDistance);
        }
    };

    useEffect(() => {
        getDeviceTimeFormat();
    }, []);

    useEffect(() => {
        KeepAwake.activate();
        return () => KeepAwake.deactivate();
    }, []);

    useEffect(() => {
        if (steps.length === 0) getCoords();
    }, [destination]);

    useEffect(() => {
        followUserLocation();
        return () => stopFollowingUserLocation();
    }, []);

    useEffect(() => {
        if (steps.length > 0) followDirections();
    }, [currentUserLocation, steps]);

    useEffect(() => {
        if (destination) {
            const distance = useDistance(currentUserLocation.latitude, currentUserLocation.longitude, destination.latitude, destination.longitude, 'M');
            setDistanceToDestination(distance);
        }
    }, [currentUserLocation, destination]);

    useEffect(() => {
        if (destination && follow) {
            if (distanceToDestination < 0.03) {
                setModalVisible(false);
                navigation.navigate('RateScreen', { item: { place, search, user: user?._id! } });
            }
        }
    }, [currentUserLocation, destination, follow]);

    useEffect(() => {
        if (destination) setRouteBounds(calculateRouteBounds([initialPosition, destination]));
    }, [destination]);

    useEffect(() => {
        let mounted = true;
        if (destination && mounted) {
            const directions: DirectionData = {
                currentUserLocation,
                destination,
                waypoints: [],
                key: GOOGLE_MAPS_API_KEY,
            };

            fetchDirections(directions);
        }

        return () => {
            mounted = false;
        };
    }, [currentUserLocation, destination]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => backHandler.remove();
    }, [follow, modalVisible]);

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            {(initialPosition && destination) &&
                <View style={styles.flexOne}>
                    <Modal
                        isVisible={modalVisible}
                        onBackButtonPress={getBack}
                        backdropOpacity={0}
                        style={{ justifyContent: 'flex-end', margin: 0 }}
                    >
                        <View style={styles.mapBackButtonPosition}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={getBack}
                            >
                                <View style={styles.flexDirectionRow}>
                                    <View style={styles.extraTinyMarginTop}>
                                        {useIcons('Back', 18, 18)}
                                    </View>
                                    <Text style={{ ...styles.mapBackButtonText, ...styles.smallMarginStart }}>Volver</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <MapComponent
                            follow={false}
                            following={following}
                            heading={heading}
                            initialPosition={initialPosition}
                            currentUserLocation={currentUserLocation}
                            destination={destination}
                            routeBounds={routeBounds!}
                            setDistance={setDistance}
                            setDuration={setDuration}
                        />
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
                    </Modal>
                    {modalFollowVisible &&
                        <>
                            <MapComponent
                                follow={true}
                                following={following}
                                mapViewRef={mapViewRef}
                                heading={heading}
                                initialPosition={initialPosition}
                                currentUserLocation={currentUserLocation}
                                destination={destination}
                                routeBounds={routeBounds!}
                                setDistance={setDistance}
                                setDuration={setDuration}
                            />
                            <View style={{ marginTop: (Platform.OS === 'ios') ? top : top + 20 }}>
                                <View style={styles.mapDirectionsBackground}>
                                    {distanceToDestination > 0.05 && direction ?
                                        <>
                                            <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                                                {renderDirection(convertText(direction.html_instructions))}
                                            </View>
                                            <View style={{ justifyContent: 'center' }}>
                                                <View style={{ minHeight: '50%', justifyContent: 'center' }}>
                                                    <Text style={styles.detailsMainName}>{(Number(distanceNextStep.toFixed(1)) < 1) ? `${(distanceNextStep * 1000).toFixed(0)} m` : `${distanceNextStep.toFixed(1)} km`}</Text>
                                                </View>
                                                <View style={{ minHeight: '50%', maxWidth: '94%' }}>
                                                    <Text numberOfLines={2} style={styles.placeholderText}>{convertText(direction.html_instructions!)} </Text>
                                                </View>
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={styles.mapFinishNavContainer}>
                                                {useIcons('Finish', 30, 30)}
                                            </View>
                                            <View style={{ ...styles.justifyContentCenter, maxWidth: '80%' }}>
                                                <Text numberOfLines={2} style={styles.detailsMainName}>Has llegado a {place.name}</Text>
                                            </View>
                                        </>
                                    }
                                </View>
                            </View>
                            <View style={{ ...styles.mapFollowModal, height: (Platform.OS === 'ios') ? '20%' : '15%', top: (Platform.OS === 'ios') ? '70%' : '73%' }}>
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
