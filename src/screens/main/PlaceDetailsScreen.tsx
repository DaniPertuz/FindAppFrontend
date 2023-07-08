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
        <View style={{ paddingTop: (Platform.OS === 'ios') ? top : top + 20, ...styles.stackScreenContainer }}>
            <View style={styles.flexDirectionRow}>
                <View style={styles.flexOneAlignItemsCenter}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.goBack()}
                    >
                        <Back height={20} width={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexNineAlignItemsCenter}>
                    <Text numberOfLines={1} style={styles.stackScreenTitle}>
                        {place.name}
                    </Text>
                </View>
                <View style={styles.flexOne} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 35 }}>
                <View style={styles.flexOne}>
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
                        <Text numberOfLines={1} style={styles.detailsMainName}>{place.name}</Text>
                        <View style={styles.tinyMarginTop}>
                            <Text numberOfLines={2} style={styles.description}>{place.description}</Text>
                        </View>
                    </View>
                    <View style={styles.flexDirectionRow}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={handleFavorite}
                        >
                            <View style={{ flexDirection: 'row', marginEnd: 12 }}>
                                {(newFavorite === true) ? <HeartFocused height={24} width={24} /> : <Heart height={24} width={24} />}
                                <View style={{ marginStart: 7 }}>
                                    <Text style={styles.detailsCaptionGrayText}>
                                        {(newFavorite === true) ? 'Guardado' : 'Guardar'} en Favoritos
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 16, flexDirection: 'row', maxWidth: 191 }}>
                <View style={styles.flexOneDirectionRow}>
                    <Star height={21} width={21} />
                    <View style={{ marginHorizontal: 8 }}>
                        <Text style={styles.detailsBodyText}>
                            {Number(place.rate.$numberDecimal).toFixed(1)}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.navigate('RateScreen', { item: { date: new Date().toString(), place, search, user: user?._id! } })}
                    >
                        <Text style={styles.detailsCaptionText}>
                            Calificar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                <Instagram height={21} width={21} />
                <View style={{ marginHorizontal: 8 }}>
                    <Text style={styles.detailsBodyText}>
                        {(place.instagram !== undefined) ? `@${place.instagram}` : 'Pronto'}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                <View style={styles.flexDirectionRow}>
                    <Location height={21} width={21} />
                    <View style={{ marginHorizontal: 8 }}>
                        <Text numberOfLines={1} style={styles.detailsBodyText}>
                            {formatAddress(place.address)}
                        </Text>
                    </View>
                </View>
                <View style={styles.justifyContentCenter}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { copyToClipboard(place.address); Toast.show('Dirección copiada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM }); }}
                    >
                        <Text style={styles.detailsCaptionText} numberOfLines={1}>Copiar dirección</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {(place.pics?.length === 0)
                ?
                <View style={{ ...styles.justifyAlignItemsCenter, flex: 2 }}>
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
            <View style={{ ...styles.flexDirectionRow, marginTop: 24 }}>
                <PhoneOutgoing height={21} width={21} />
                <View style={{ marginHorizontal: 9 }}>
                    <Text>{place.phone}</Text>
                </View>
                <View style={styles.alignContentCenter}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { copyToClipboard(String(place.phone)); Toast.show('Número de teléfono copiado', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM }); }}
                    >
                        <Text style={styles.detailsCaptionText} numberOfLines={1}>Copiar teléfono</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {(place.whatsapp) ?
                <View style={{ ...styles.flexDirectionRow, marginTop: 14 }}>
                    <Whatsapp height={21} width={21} />
                    <Text>{place.whatsapp}</Text>
                </View>
                : <View style={styles.smallMediumMarginTop} />
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
            <View style={styles.flexOne}>
                <View style={{ justifyContent: 'center', paddingHorizontal: 42 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.startNavigationButton}
                        onPress={() => navigation.push('MapScreen', { place, search })}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.startNavigationButtonText}>
                                Iniciar Ruta
                            </Text>
                            <View style={styles.mediumMarginStart}>
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