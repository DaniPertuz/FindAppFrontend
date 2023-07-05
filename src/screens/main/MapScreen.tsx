import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import DeviceTimeFormat from 'react-native-device-time-format';
import moment from 'moment';

import useLocation from '../../hooks/useLocation';
import LoadingScreen from '../LoadingScreen';
import { Location } from '../../interfaces/app-interfaces';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useCoords } from '../../hooks/useCoords';
import { RootStackParams } from '../../navigation';
import { AuthContext } from '../../context';

import Back from '../../assets/back.svg';
import Close from '../../assets/close.svg';
import Locate from '../../assets/location.svg';
import Map from '../../assets/map.svg';
import Search from '../../assets/search.svg';
import Timer from '../../assets/timer.svg';

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

        if (JSON.stringify(currentUserLocation) === JSON.stringify(destination)) {
            navigation.navigate('RateScreen', { item: { date: new Date().toString(), place, search, user: user?._id! } });
        }
    }, [currentUserLocation]);

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

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            {(initialPosition && destination) &&
                <View style={{ flex: 1 }}>
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
                            strokeWidth={10}
                            strokeColor={'#5856D6'}
                            onReady={result => { setDistance(result.distance); setDuration(result.duration); }}
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
                        <View
                            style={{
                                backgroundColor: 'rgba(250, 250, 250, 0.98)',
                                height: '20%',
                                top: '80%',
                                borderTopEndRadius: 20,
                                borderTopStartRadius: 20,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                elevation: 3
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 20,
                                    marginHorizontal: 21
                                }}
                            >
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Text style={{ color: '#292D32', fontSize: 28, fontWeight: '700', lineHeight: 32, letterSpacing: -0.56 }}>
                                        {duration.toFixed(0)} min
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginStart: 6 }}>
                                        <Timer height={15} width={15} />
                                        <View style={{ marginStart: 6 }}>
                                            <Text style={{ color: '#0D0D0D', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26, textAlign: 'center' }}>{setArrivalTime()}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginStart: 6 }}>
                                        <Locate height={15} width={15} />
                                        <View style={{ marginStart: 6 }}>
                                            <Text style={{ color: '#0D0D0D', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26, textAlign: 'center' }}>{distance.toFixed(1)} Km</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 21 }}>
                                <View style={{ marginEnd: 70 }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>{place.name}</Text>
                                    </View>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={{ color: '#858585', fontSize: 13, fontWeight: '500', letterSpacing: -0.26, lineHeight: 15 }}>{formatAddress(place.address)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                    >
                                        <Text style={{ color: '#207CFD', fontSize: 13, fontWeight: '500', letterSpacing: -0.26, lineHeight: 15 }}>
                                            Ver más ubicaciones
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => { setFollow(true); setModalVisible(false); setModalFollowVisible(true); }}
                                        style={{ alignItems: 'center', backgroundColor: '#207CFD', borderRadius: 8, justifyContent: 'center', paddingVertical: 6, paddingHorizontal: 14 }}
                                    >
                                        <Text style={{ color: 'rgba(250, 250, 250, 0.98)', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 32 }}>
                                            Iniciar Ruta
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'rgba(250, 250, 250, 0.98)', borderRadius: 8, right: 277, left: 21, top: 58, position: 'absolute', padding: 10, zIndex: 999 }}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={() => { setModalVisible(false); navigation.pop(); }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Back height={18} width={18} style={{ marginTop: 3 }} />
                                    <Text style={{ color: '#207CFD', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20, marginStart: 6 }}>Volver</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    {modalFollowVisible === true &&
                        <View
                            style={{
                                backgroundColor: 'rgba(250, 250, 250, 0.98)',
                                height: '15%',
                                top: '85%',
                                borderTopEndRadius: 20,
                                borderTopStartRadius: 20,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                elevation: 3
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 20
                            }}>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    style={{ marginEnd: 10, marginTop: 10 }}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(250, 250, 250, 0.98)',
                                            borderRadius: 30,
                                            padding: 5,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.12,
                                            shadowRadius: 5.22,
                                            elevation: 2
                                        }}
                                    >
                                        <Search height={30} width={30} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 48 }}>
                                    <Text style={{ color: '#292D32', fontSize: 30, fontWeight: '700', lineHeight: 32, letterSpacing: -0.56, textAlign: 'center' }}>{setArrivalTime()}</Text>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'row', marginEnd: 5 }}>
                                                <Map height={15} width={15} />
                                                <View style={{ marginStart: 6 }}>
                                                    <Text style={{ color: '#0D0D0D', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26, textAlign: 'center' }}>
                                                        {duration.toFixed(0)} min
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginStart: 5 }}>
                                                <Locate height={15} width={15} />
                                                <View style={{ marginStart: 6 }}>
                                                    <Text style={{ color: '#0D0D0D', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26, textAlign: 'center' }}>
                                                        {distance.toFixed(1)} Km
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'rgba(250, 250, 250, 0.98)',
                                        borderRadius: 30,
                                        padding: 5,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.12,
                                        shadowRadius: 5.22,
                                        elevation: 2
                                    }}
                                >
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={handleBackButtonClick}
                                    >
                                        <Close height={30} width={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            }
        </>
    );
};

export default MapScreen;