import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import DeviceTimeFormat from 'react-native-device-time-format';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';

import useLocation from '../../hooks/useLocation';
import LoadingScreen from '../LoadingScreen';
import { Direction, Location, Step } from '../../interfaces/app-interfaces';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useCoords } from '../../hooks/useCoords';
import { RootStackParams } from '../../navigation';
import { AuthContext } from '../../context';

import ArrowElbowUpLeft from '../../assets/ArrowElbowUpLeft.svg';
import ArrowElbowUpRight from '../../assets/ArrowElbowUpRight.svg';
import ArrowUp from '../../assets/ArrowUp.svg';
import ArrowUpLeft from '../../assets/ArrowUpLeft.svg';
import ArrowUpRight from '../../assets/ArrowUpRight.svg';
import Back from '../../assets/back.svg';
import Car from '../../assets/Car.svg';
import Close from '../../assets/close.svg';
import Locate from '../../assets/location.svg';
import Map from '../../assets/map.svg';
import Search from '../../assets/search.svg';
import Timer from '../../assets/timer.svg';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'MapScreen'> { };

const MapScreen = ({ route, navigation }: Props) => {

    const { place, search } = route.params;

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);
    const { top } = useSafeAreaInsets();

    const { hasLocation, initialPosition, currentUserLocation, followUserLocation, stopFollowingUserLocation } = useLocation();

    const [destination, setDestination] = useState<Location>();
    const [duration, setDuration] = useState(0);
    const [display, setDisplay] = useState(false);
    const [distance, setDistance] = useState(0);
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState<Step | null>(null);
    const [nextStep, setNextStep] = useState<Step | null>(null);
    const [deviceFormat, setDeviceFormat] = useState(false);
    const [follow, setFollow] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [modalFollowVisible, setModalFollowVisible] = useState(false);

    const { user } = useContext(AuthContext);

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

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

    useEffect(() => {
        getDeviceTimeFormat();
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

        const { latitude, longitude } = currentUserLocation;

        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        });

        if (JSON.stringify(currentUserLocation) === JSON.stringify(destination)) {
            navigation.navigate('RateScreen', { item: { date: new Date().toString(), place, search, user: user?._id! } });
        }
    }, [currentUserLocation]);

    useEffect(() => {
        let mounted = true;
        if (destination && mounted) {
            const waypoints: { latitude: number; longitude: number; }[] = [];

            const directions = {
                initialPosition,
                destination,
                waypoints,
                key: GOOGLE_MAPS_API_KEY,
            };

            fetchDirections(directions);
        }

        return () => {
            mounted = false;
        };
    }, [destination]);

    const convertText = (text: string) => (
        text
            .replace(/\n/ig, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/ig, '')
            .replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/ig, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/ig, '')
            .replace(/<\/\s*(?:p|div)>/ig, '\n')
            .replace(/<br[^>]*\/?>/ig, '\n')
            .replace(/<[^>]*>/ig, '')
            .replace('&nbsp;', ' ')
            .replace(/[^\S\r\n][^\S\r\n]+/ig, ' ')
    );

    const renderDirection = (instruction: string) => {
        switch (instruction) {
            case 'turn-left':
                return <ArrowUpLeft height={46} width={46} />;
            case 'turn-right':
                return <ArrowUpRight height={46} width={46} />;
            case 'straight':
                return <ArrowUp height={46} width={46} />;
            case 'turn-slight-left':
                return <ArrowElbowUpLeft height={46} width={46} />;
            case 'turn-slight-right':
                return <ArrowElbowUpRight height={46} width={46} />;
            case 'Car':
                return <Car height={46} width={46} />;
        }
    };

    const handleBackButtonClick = () => {
        if (currentUserLocation !== destination) {
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
        }
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const getDirections = async (directions: any) => {
        try {
            let apiUrl = `https://maps.googleapis.com/maps/api/directions/json?&origin=${directions.initialPosition.latitude},${directions.initialPosition.longitude}&destination=${directions.destination.latitude},${directions.destination.longitude}&key=${directions.key}`;

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
                    end_location: step.end_location,
                });
            });

            setSteps(stepsData);
            if (data && data.length > 0) {

                if (stepsData.length > 0) {
                    setCurrentStep(stepsData[0]);

                    if (stepsData.length > 1) {
                        setNextStep(stepsData[1]);
                    }
                }
            }
        } catch (error: any) {
            console.error('Error fetching directions:', error.message);
        }
    };

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            {(initialPosition && destination) &&
                <View style={styles.flexOne}>
                    <MapView
                        style={{ ...StyleSheet.absoluteFillObject }}
                        followsUserLocation={follow}
                        showsUserLocation
                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
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
                            strokeWidth={5}
                            strokeColor={'#5856D6'}
                            onReady={(result) => { setDistance(result.distance); setDuration(result.duration); }}
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
                                        <Timer height={15} width={15} />
                                        <View style={styles.smallMarginStart}>
                                            <Text style={styles.mapFollowSmallText}>{setArrivalTime()}</Text>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.flexDirectionRowAlignJustifyCenter, marginStart: 6 }}>
                                        <Locate height={15} width={15} />
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
                                    {/* <TouchableOpacity
                                        activeOpacity={1.0}
                                    >
                                        <Text style={styles.detailsCaptionText}>
                                            Ver más ubicaciones
                                        </Text>
                                    </TouchableOpacity> */}
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
                                    <Back height={18} width={18} style={styles.extraTinyMarginTop} />
                                    <Text style={{ ...styles.mapBackButtonText, ...styles.smallMarginStart }}>Volver</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    {modalFollowVisible === true &&
                        <>
                            <View style={{ marginTop: (Platform.OS === 'ios') ? top : top + 20 }}>
                                <View style={styles.mapDirectionsBackground}>
                                    <View style={{ marginHorizontal: 10 }}>
                                        {renderDirection((currentStep?.maneuver === undefined) ? 'Car' : currentStep?.maneuver)}
                                    </View>
                                    <View>
                                        <Text style={styles.detailsMainName}>{currentStep?.distance}</Text>
                                        <Text numberOfLines={2} style={styles.placeholderText}>{convertText(currentStep?.html_instructions!)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.mapFollowModal}>
                                <View style={{ ...styles.flexDirectionRowAlignJustifyCenter, ...styles.mediumMarginTop }}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        style={styles.modalBackButtonMargins}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <View style={styles.mapFollowButton}>
                                            <Search height={30} width={30} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginHorizontal: 48 }}>
                                        <Text style={styles.mapFollowArrivalTime}>{setArrivalTime()}</Text>
                                        <View style={styles.smallMarginTop}>
                                            <View style={styles.flexDirectionRow}>
                                                <View style={{ ...styles.flexDirectionRow, marginEnd: 5 }}>
                                                    <Map height={15} width={15} />
                                                    <View style={styles.smallMarginStart}>
                                                        <Text style={styles.mapFollowSmallText}>
                                                            {duration.toFixed(0)} min
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ ...styles.flexDirectionRow, marginStart: 5 }}>
                                                    <Locate height={15} width={15} />
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
                                            <Close height={30} width={30} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                </View>
            }
        </>
    );
};

export default MapScreen;