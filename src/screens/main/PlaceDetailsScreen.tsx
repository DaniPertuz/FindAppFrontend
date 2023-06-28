import React from 'react';
import { Dimensions, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import { StackScreenProps } from '@react-navigation/stack';
import Carousel from 'react-native-reanimated-carousel';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';

import { RootStackParams } from '../../navigation';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'PlaceDetailsScreen'> { };

const PlaceDetailsScreen = ({ navigation, route }: Props) => {

    const { place, search } = route.params;

    const width = Dimensions.get('window').width;

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

    return (
        <View style={styles.detailsMainTopContainer}>
            <View style={styles.detailsTopContainer}>
                <ScrollView style={styles.detailsNameContainer}>
                    <Text style={styles.blackPrimaryFontStyle}>{place.name}</Text>
                </ScrollView>
                <Image
                    source={
                        (place.photo === '')
                            ? require('../../assets/placeholder.png')
                            : { uri: place.photo }
                    }
                    style={styles.detailsIcon}
                />
            </View>
            {(place.pics?.length === 0)
                ?
                <View style={{ ...styles.center, flex: 3 }}>
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
            <ScrollView style={styles.detailsDescription}>
                <Text style={styles.secondaryFontStyle}>{place.description}</Text>
            </ScrollView>
            <View style={styles.detailsDropdownRateContainer}
            >
                <Dropdown
                    data={place.schedule.map(schedule => {
                        return { label: schedule };
                    })}
                    placeholder='Horario'
                    style={styles.detailsDropdown}
                    labelField={'label'} valueField={'label'} onChange={() => { }}
                />
                <View style={styles.detailsContactEvenlyContainer}>
                    <TouchableOpacity
                        style={styles.alignItemsCenter}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('ReviewsScreen', { place: place._id })}
                    >
                        <Text style={styles.linkStyle}>
                            {place.rate.$numberDecimal}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <View style={styles.detailsContactContainer}>
                    <View style={styles.detailsContactBetweenContainer}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onLongPress={() => { copyToClipboard(place.address); Toast.show('Dirección copiada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM }); }}
                        >
                            <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter} style={{ maxWidth: 130 }}>
                                <Text style={styles.secondaryFontStyle} numberOfLines={1}>{formatAddress(place.address)}</Text>
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                    {(place.whatsapp) ?
                        <View style={{ ...styles.detailsContactBetweenContainer, marginEnd: 5 }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => Linking.openURL(`https://wa.me/+57${place.whatsapp}`)}
                            >
                                <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter}>
                                    <Text style={styles.linkStyle}>{place.whatsapp}</Text>
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                        : <View style={{ flex: 1 }} />
                    }
                </View>
                <View style={styles.detailsContactContainer}>
                    <View style={styles.detailsContactBetweenContainer}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => Linking.openURL(`tel:${place.phone}`)}
                        >
                            <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter}>
                                <Text style={styles.secondaryFontStyle}>{place.phone}</Text>
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                    {(place.instagram)
                        ?
                        <View style={{ ...styles.detailsContactBetweenContainer, marginStart: 5 }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => Linking.openURL(place.instagram!)}
                            >
                                <ScrollView horizontal contentContainerStyle={styles.justifyContentCenter}>
                                    <Text style={styles.linkStyle}>{place.instagram}</Text>
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                        : <View style={{ flex: 1 }} />
                    }
                </View>
                <View style={styles.detailsContactContainer}>
                    <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter}>
                        <Text style={styles.secondaryFontStyle}>{place.city}, {place.state}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.largeButton}
                    onPress={() => navigation.push('MapScreen', { place, search })}
                >
                    <View style={styles.rowJustifyCenter}>
                        <Text
                            style={styles.largeButtonText}
                        >
                            IR
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default PlaceDetailsScreen;