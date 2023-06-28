import React from 'react';
import { Dimensions, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Dropdown } from 'react-native-element-dropdown';
import Clipboard from '@react-native-clipboard/clipboard';

import { RootStackParams } from '../../navigation';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'ProductDetailsScreen'> { };

const ProductDetailsScreen = ({ navigation, route }: Props) => {

    const { product, search } = route.params;

    const { height } = Dimensions.get('window');

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

    return (
        <View style={styles.detailsMainTopContainer}>
            <View style={styles.detailsTopContainer}>
                <ScrollView style={styles.detailsNameContainer}>
                    <Text style={styles.blackPrimaryFontStyle}>{product.name}</Text>
                </ScrollView>
                <Image
                    source={
                        (product.place[0].photo === '')
                            ? require('../../assets/placeholder.png')
                            : { uri: product.place[0].photo }
                    }
                    style={styles.detailsIcon}
                />
            </View>
            <View style={{ flex: 4 }}>
                <Image
                    source={
                        (!product.img || product.img === '')
                            ? require('../../assets/logo.png')
                            : { uri: product.img }
                    }
                    style={{
                        height: height / 3,
                        resizeMode: 'contain'
                    }}
                />
            </View>
            <ScrollView style={styles.detailsDescription}>
                <Text style={styles.secondaryFontStyle}>{product.description}</Text>
            </ScrollView>
            <View style={styles.detailsDropdownRateContainer}>
                <Dropdown
                    data={product.place[0].schedule.map(schedule => {
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
                        onPress={() => navigation.navigate('ProductReviewsScreen', { product: product._id })}
                    >
                        <Text style={styles.linkStyle}>
                            {product.rate.$numberDecimal}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <View style={styles.detailsContactContainer}>
                    <View style={styles.detailsContactBetweenContainer}>
                        <TouchableOpacity
                            onLongPress={() => copyToClipboard(product.place[0].address)}
                        >
                            <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter} style={{ maxWidth: 120 }}>
                                <Text style={styles.secondaryFontStyle} numberOfLines={1}>{formatAddress(product.place[0].address)}</Text>
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                    {(product.place[0].whatsapp) ?
                        <View style={{ ...styles.detailsContactBetweenContainer, marginEnd: 5 }}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL(`https://wa.me/+57${product.place[0].whatsapp}`)}
                            >
                                <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter}>
                                    <Text style={styles.linkStyle}>{product.place[0].whatsapp}</Text>
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
                            onPress={() => Linking.openURL(`tel:${product.place[0].phone}`)}
                        >
                            <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter}>
                                <Text style={styles.secondaryFontStyle}>{product.place[0].phone}</Text>
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                    {(product.place[0].instagram)
                        ?
                        <View style={{ ...styles.detailsContactBetweenContainer, marginStart: 5 }}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL(product.place[0].instagram!)}
                            >
                                <ScrollView horizontal contentContainerStyle={styles.justifyContentCenter}>
                                    <Text style={styles.linkStyle}>{product.place[0].instagram}</Text>
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                        : <View style={{ flex: 1 }} />
                    }
                </View>
                <View style={styles.detailsContactContainer}>
                    <ScrollView horizontal contentContainerStyle={styles.alignItemsCenter}>
                        <Text style={styles.secondaryFontStyle}>{product.place[0].city}, {product.place[0].state}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.largeButton}
                    onPress={() => navigation.push('MapScreen', { place: product.place[0], search })}
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

export default ProductDetailsScreen;