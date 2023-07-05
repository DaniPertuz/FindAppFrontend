import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';
import Carousel from 'react-native-reanimated-carousel';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';

import { AuthContext, PlacesContext } from '../../context';
import { RootStackParams } from '../../navigation';

import Back from '../../assets/back.svg';
import Heart from '../../assets/heart.svg';
import HeartFocused from '../../assets/heart-focused.svg';
import Instagram from '../../assets/instagram-plain.svg';
import Left from '../../assets/left.svg';
import Location from '../../assets/location.svg';
import PhoneOutgoing from '../../assets/phone-outgoing.svg';
import Star from '../../assets/star.svg';
import Whatsapp from '../../assets/whatsapp.svg';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'PlaceDetailsScreen'> { };

const PlaceDetailsScreen = ({ navigation, route }: Props) => {

    const { place, search } = route.params;

    const width = Dimensions.get('window').width;
    const { top } = useSafeAreaInsets();

    const [newFavorite, setNewFavorite] = useState(false);

    const { user } = useContext(AuthContext);
    const { addFavorite, deleteFavorite, getFavorite } = useContext(PlacesContext);

    const handleFavorite = () => {
        setNewFavorite(!newFavorite);

        if (newFavorite === false) {
            addFavorite(user?._id!, place._id);
        }

        deleteFavorite(user?._id!, place._id);
    };

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

    useEffect(() => {
        let mounted = true;
        getFavorite(user?._id!, place._id).then((data) => {
            if (mounted) {
                setNewFavorite(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <View style={{ paddingTop: (Platform.OS === 'ios') ? top : top + 20, paddingHorizontal: 16, backgroundColor: 'rgba(104, 110, 222, 0.1)', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Back height={20} width={20} />
                </View>
                <View style={{ flex: 9, alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ color: '#1F273A', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20 }}>
                        {place.name}
                    </Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 35 }}>
                <View style={{ flex: 1 }}>
                    <Image
                        source={
                            (place.photo === '')
                                ? require('../../assets/FA_Color.png')
                                : { uri: place.photo }
                        }
                        style={styles.detailsIcon}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <View style={{ marginBottom: 12 }}>
                        <Text numberOfLines={1} style={{ color: '#081023', fontSize: 20, fontWeight: '700', letterSpacing: -0.4, lineHeight: 28 }}>{place.name}</Text>
                        <View style={{ marginTop: 6 }}>
                            <Text numberOfLines={2} style={{ color: '#081023', fontSize: 12, fontWeight: '400', letterSpacing: -0.24, lineHeight: 16 }}>{place.description}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={handleFavorite}
                        >
                            <View style={{ flexDirection: 'row', marginEnd: 12 }}>
                                {(newFavorite === true) ? <HeartFocused height={24} width={24} /> : <Heart height={24} width={24} />}
                                <View style={{ marginStart: 7 }}>
                                    <Text style={{ color: '#5A5A5A', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20, textAlign: 'center' }}>
                                        {(newFavorite === true) ? 'Guardado' : 'Guardar'} en Favoritos
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 16, flexDirection: 'row', maxWidth: 191 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Star height={21} width={21} />
                    <View style={{ marginHorizontal: 8 }}>
                        <Text style={{ color: '#0D0D0D', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22 }}>
                            {Number(place.rate.$numberDecimal).toFixed(1)}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.navigate('RateScreen', { item: { date: new Date().toString(), place, search, user: user?._id! } })}
                    >
                        <Text style={{ color: '#207CFD', fontSize: 13, fontWeight: '500', letterSpacing: -0.26, lineHeight: 15 }}>
                            Calificar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                <Instagram height={21} width={21} />
                <View style={{ marginHorizontal: 8 }}>
                    <Text style={{ color: '#0D0D0D', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22 }}>
                        {(place.instagram !== undefined) ? `@${place.instagram}` : 'Pronto'}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Location height={21} width={21} />
                    <View style={{ marginHorizontal: 8 }}>
                        <Text numberOfLines={1} style={{ color: '#0D0D0D', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22 }}>
                            {formatAddress(place.address)}
                        </Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { copyToClipboard(place.address); Toast.show('Dirección copiada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM }); }}
                    >
                        <Text style={{ color: '#207CFD', fontSize: 13, fontWeight: '500', letterSpacing: -0.26, lineHeight: 15 }} numberOfLines={1}>Copiar dirección</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {(place.pics?.length === 0)
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 2 }}>
                    <Text>No hay imágenes del lugar</Text>
                </View>
                :
                <View style={styles.detailsCarouselContainer}>
                    <Carousel
                        data={[...place.pics!]}
                        loop={false}
                        width={width}
                        renderItem={(data) => (
                            <View style={styles.detailsCarousel}>
                                <Image
                                    source={{ uri: data.item }}
                                    style={styles.detailsCarouselPicture}
                                />
                            </View>
                        )}
                    />
                </View>
            }
            <View style={{ flexDirection: 'row', marginTop: 24 }}>
                <PhoneOutgoing height={21} width={21} />
                <View style={{ marginHorizontal: 9 }}>
                    <Text>{place.phone}</Text>
                </View>
                <View style={{ alignContent: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { copyToClipboard(String(place.phone)); Toast.show('Número de teléfono copiado', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM }); }}
                    >
                        <Text style={{ color: '#207CFD', fontSize: 13, fontWeight: '500', letterSpacing: -0.26, lineHeight: 15 }} numberOfLines={1}>Copiar teléfono</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {(place.whatsapp) ?
                <View style={{ flexDirection: 'row', marginTop: 14 }}>
                    <Whatsapp height={21} width={21} />
                    <Text>{place.whatsapp}</Text>
                </View>
                : <View style={{ marginTop: 13 }} />
            }
            <View style={styles.detailsDropdownRateContainer}>
                <Dropdown
                    data={place.schedule.map(schedule => {
                        return { label: schedule };
                    })}
                    placeholder='Horario'
                    style={styles.detailsDropdown}
                    labelField={'label'} valueField={'label'} onChange={() => { }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', paddingHorizontal: 42 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={{ alignItems: 'center', backgroundColor: '#207CFD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10 }}
                        onPress={() => navigation.push('MapScreen', { place, search })}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#FAFAFA', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22 }}>
                                Iniciar Ruta
                            </Text>
                            <View style={{ marginStart: 10 }}>
                                <Left height={18} width={18} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PlaceDetailsScreen;