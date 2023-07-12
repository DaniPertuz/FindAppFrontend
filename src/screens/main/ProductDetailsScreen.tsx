import React, { useContext, useState } from 'react';
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

interface Props extends StackScreenProps<RootStackParams, 'ProductDetailsScreen'> { };

const ProductDetailsScreen = ({ navigation, route }: Props) => {

    const { product, search } = route.params;

    const { width } = Dimensions.get('window');
    const { top } = useSafeAreaInsets();

    const [newFavorite, setNewFavorite] = useState(false);

    const { user } = useContext(AuthContext);
    const { addFavorite, deleteFavorite, getFavorite } = useContext(PlacesContext);

    const handleFavorite = () => {
        setNewFavorite(!newFavorite);

        if (newFavorite === false) {
            addFavorite(user?._id!, product.place[0]._id);
        }

        deleteFavorite(user?._id!, product.place[0]._id);
    };

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

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
                        {product.name}
                    </Text>
                </View>
                <View style={styles.flexOne} />
            </View>
            <View style={{ ...styles.flexDirectionRow, paddingTop: 35 }}>
                <View style={styles.flexOne}>
                    <Image
                        source={
                            (product.place[0].photo === '')
                                ? require('../../assets/FA_Color.png')
                                : { uri: product.place[0].photo }
                        }
                        style={styles.detailsIcon}
                    />
                </View>
                <View style={styles.flexTwo}>
                    <View style={styles.smallMediumMarginBottom}>
                        <Text numberOfLines={1} style={styles.detailsMainName}>{product.name}</Text>
                        <View style={styles.tinyMarginTop}>
                            <Text numberOfLines={2} style={styles.productPlaceName}>{product.place[0].name}</Text>
                        </View>
                        <View style={styles.tinyMarginTop}>
                            <Text numberOfLines={2} style={styles.description}>{product.description}</Text>
                        </View>
                    </View>
                    <View style={styles.flexDirectionRow}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={handleFavorite}
                        >
                            <View style={{ ...styles.flexDirectionRow, marginEnd: 12 }}>
                                {(newFavorite === true) ? <HeartFocused height={24} width={24} /> : <Heart height={24} width={24} />}
                                <View style={styles.smallMarginStart}>
                                    <Text style={styles.detailsCaptionGrayText}>
                                        {(newFavorite === true) ? 'Lugar guardado' : 'Guardar lugar'} en Favoritos
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.flexDirectionRow, ...styles.alignItemsCenter, marginTop: 16, maxWidth: 191 }}>
                <View style={styles.flexOneDirectionRow}>
                    <Star height={21} width={21} />
                    <View style={styles.marginHorizontalSmall}>
                        <Text style={styles.detailsBodyText}>
                            {Number(product.place[0].rate.$numberDecimal).toFixed(1)}
                        </Text>
                    </View>
                </View>
                <View style={styles.flexTwo}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.navigate('RateScreen', { item: { date: new Date().toString(), place: product.place[0], search, user: user?._id! } })}
                    >
                        <Text style={styles.detailsCaptionText}>
                            Calificar lugar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ ...styles.flexDirectionRow, marginTop: 18 }}>
                <Instagram height={21} width={21} />
                <View style={styles.marginHorizontalSmall}>
                    <Text style={styles.detailsBodyText}>
                        {(product.place[0].instagram !== undefined) ? `@${product.place[0].instagram}` : 'Pronto'}
                    </Text>
                </View>
            </View>
            <View style={{ ...styles.flexDirectionRow, marginTop: 18 }}>
                <View style={styles.flexDirectionRow}>
                    <Location height={21} width={21} />
                    <View style={styles.marginHorizontalSmall}>
                        <Text numberOfLines={1} style={styles.detailsBodyText}>
                            {formatAddress(product.place[0].address)}
                        </Text>
                    </View>
                </View>
                <View style={styles.justifyContentCenter}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { copyToClipboard(product.place[0].address); Toast.show('Dirección copiada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM }); }}
                    >
                        <Text style={styles.detailsCaptionText} numberOfLines={1}>Copiar dirección</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {(product.place[0].pics?.length === 0)
                ?
                <View style={{ ...styles.justifyAlignItemsCenter, ...styles.flexTwo }}>
                    <Text>No hay imágenes del lugar</Text>
                </View>
                :
                <View style={styles.detailsCarouselContainer}>
                    <Carousel
                        data={[...product.place[0].pics!]}
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
                <View style={styles.marginHorizontalSmall}>
                    <Text>{product.place[0].phone}</Text>
                </View>
                <View style={styles.alignContentCenter}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { copyToClipboard(String(product.place[0].phone)); Toast.show('Número de teléfono copiado', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM }); }}
                    >
                        <Text style={styles.detailsCaptionText} numberOfLines={1}>Copiar teléfono</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {(product.place[0].whatsapp) ?
                <View style={{ ...styles.flexDirectionRow, marginTop: 14 }}>
                    <Whatsapp height={21} width={21} />
                    <Text>{product.place[0].whatsapp}</Text>
                </View>
                : <View style={styles.smallMediumMarginTop} />
            }
            <View style={styles.detailsDropdownRateContainer}>
                <Dropdown
                    data={product.place[0].schedule.map(schedule => {
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
                        onPress={() => navigation.push('MapScreen', { place: product.place[0], search })}
                    >
                        <View style={styles.flexDirectionRowAlignItemsCenter}>
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

export default ProductDetailsScreen;