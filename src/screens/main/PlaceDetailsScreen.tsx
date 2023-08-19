import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';
import Carousel from 'react-native-reanimated-carousel';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';

import { AuthContext, PlacesContext } from '../../context';
import { RootStackParams } from '../../navigation';
import { useIcons } from '../../hooks/useIcons';

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
        switch (newFavorite) {
            case true:
                deleteFavorite(user?._id!, place._id);
                setNewFavorite(false);
                break;

            case false:
                addFavorite(user?._id!, place._id);
                setNewFavorite(true);
                break;
        }
    };

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

    useEffect(() => {
        let mounted = true;
        getFavorite(user?._id!, place._id).then((data) => {
            if (mounted) {
                setNewFavorite(data !== null);
            }
        });
        return () => {
            mounted = false;
        };
    }, [newFavorite]);

    return (
        <View style={{ paddingTop: (Platform.OS === 'ios') ? top : top + 20, ...styles.stackScreenContainer }}>
            <View style={styles.flexDirectionRow}>
                <View style={styles.flexOneAlignItemsCenter}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.goBack()}
                    >
                        {useIcons('Back', 25, 25)}
                    </TouchableOpacity>
                </View>
                <View style={styles.flexNineAlignItemsCenter}>
                    <Text numberOfLines={1} style={styles.stackScreenTitle}>
                        {place.name}
                    </Text>
                </View>
                <View style={styles.flexOne} />
            </View>
            <View style={{ ...styles.flexDirectionRow, paddingTop: 35 }}>
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
                <View style={styles.flexTwo}>
                    <View style={styles.smallMediumMarginBottom}>
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
                            <View style={{ ...styles.flexDirectionRow, marginEnd: 12 }}>
                                {(newFavorite === true) ? useIcons('HeartFocused', 24, 24) : useIcons('Heart', 24, 24)}
                                <View style={styles.smallMarginStart}>
                                    <Text style={styles.detailsCaptionGrayText}>
                                        {(newFavorite === true) ? 'Guardado' : 'Guardar'} en Favoritos
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.placeRateContainer}>
                <View style={styles.flexOneDirectionRow}>
                    {useIcons('Star', 21, 21)}
                    <View style={styles.marginHorizontalSmall}>
                        <Text style={styles.detailsBodyText}>
                            {Number(place.rate.$numberDecimal).toFixed(1)}
                        </Text>
                    </View>
                </View>
                <View style={styles.flexTwo}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.navigate('RateScreen', { item: { place, search, user: user?._id! } })}
                    >
                        <Text style={styles.detailsCaptionText}>
                            Calificar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.flexDirectionRowMarginTop}>
                {useIcons('Instagram', 21, 21)}
                <View style={styles.marginHorizontalSmall}>
                    {(place.instagram !== undefined)
                        ?
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => Linking.openURL(`https://www.instagram.com/${place.instagram}`)}
                        >
                            <Text numberOfLines={1} style={styles.detailsBodyLink}>@{place.instagram}</Text>
                        </TouchableOpacity>
                        :
                        <Text style={styles.detailsBodyText}>Pronto</Text>
                    }
                </View>
            </View>
            <View style={styles.flexDirectionRowMarginTop}>
                <View style={styles.flexDirectionRow}>
                    {useIcons('Location', 21, 21)}
                    <View style={styles.marginHorizontalSmall}>
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
                <View style={{ ...styles.justifyAlignItemsCenter, ...styles.flexTwo }}>
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
            <View style={{ ...styles.flexDirectionRowAlignItemsCenter, marginTop: 24 }}>
                {useIcons('PhoneOutgoing', 21, 21)}
                <View style={styles.marginHorizontalSmall}>
                    <Text style={styles.detailsBodyText}>{place.phone}</Text>
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
                    {useIcons('Whatsapp', 21, 21)}
                    <View style={styles.smallMarginStart}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => Linking.openURL(`https://wa.me/+57${place.whatsapp}`)}
                        >
                            <Text style={styles.detailsBodyLink}>{place.whatsapp}</Text>
                        </TouchableOpacity>
                    </View>
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
                <View style={{ ...styles.justifyContentCenter, paddingHorizontal: 42 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.startNavigationButton}
                        onPress={() => navigation.push('MapScreen', { place, search: '' })}
                    >
                        <View style={styles.flexDirectionRowAlignItemsCenter}>
                            <Text style={styles.startNavigationButtonText}>
                                Iniciar Ruta
                            </Text>
                            <View style={styles.mediumMarginStart}>
                                {useIcons('Left', 18, 18)}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PlaceDetailsScreen;