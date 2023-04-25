import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Rating } from 'react-native-ratings';
import { Dropdown } from 'react-native-element-dropdown';
import Carousel from 'react-native-reanimated-carousel';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from '../../navigation';

import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'PlaceDetailsScreen'> { };

const PlaceDetailsScreen = ({ navigation, route }: Props) => {

    const { place, search } = route.params;

    const { top } = useSafeAreaInsets();

    const width = Dimensions.get('window').width;

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const formatAddress = (address: string) => address.substring(0, address.indexOf(','));

    return (
        <View style={{ flex: 1, paddingTop: 15, paddingHorizontal: 30, marginTop: top }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <ScrollView style={{ flex: 1, maxHeight: 70, marginEnd: 10 }}>
                    <Text style={styles.blackPrimaryFontStyle}>{place.name}</Text>
                </ScrollView>
                <Image
                    source={
                        (place.photo === '')
                            ? require('../../assets/placeholder.png')
                            : { uri: place.photo }
                    }
                    style={{
                        borderRadius: 100,
                        height: 90,
                        width: 90
                    }}
                />
            </View>
            <View style={{ flex: 3, marginBottom: 20 }}>
                <Carousel
                    data={[...place.pics!]}
                    loop={false}
                    width={width}
                    renderItem={(data) => (
                        <View
                            style={{
                                flex: 1,
                                borderColor: '#4B4D4B',
                                borderWidth: 1,
                                borderRadius: 20,
                                justifyContent: 'center',
                                marginHorizontal: 10
                            }}
                            >
                            <Image
                                source={{ uri: data.item }}
                                style={{
                                    borderRadius: 5,
                                    height: '100%',
                                    width: '100%',
                                    resizeMode: 'contain'
                                }}
                            />
                        </View>
                    )}
                />
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 10, maxHeight: 70 }}>
                <Text style={styles.secondaryFontStyle}>{place.description}</Text>
            </ScrollView>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: 10,
                    maxHeight: 60
                }}
            >
                <Dropdown
                    data={place.schedule.map(schedule => {
                        return { label: schedule };
                    })}
                    placeholder='Horario'
                    style={{
                        flex: 2,
                        maxHeight: 50,
                        borderBottomColor: '#4B4D4B',
                        borderBottomWidth: 0.5,
                        marginEnd: 20
                    }}
                    labelField={'label'} valueField={'label'} onChange={() => { }}
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center'
                        }}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('ReviewsScreen', { place: place._id })}
                    >
                        <Text style={styles.linkStyle}>
                            {place.rate.$numberDecimal}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Icon
                        color='#000000'
                        name='business-outline'
                        size={30}
                    />
                    <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ maxHeight: 30, maxWidth: 150 }}>
                        <Text style={styles.secondaryFontStyle}>{formatAddress(place.address)}</Text>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => copyToClipboard(place.address)}
                    >
                        <Text style={styles.linkStyle}>Copiar dirección</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Icon
                        color='#000000'
                        name='call-outline'
                        size={30}
                    />
                    <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ maxHeight: 30, maxWidth: 150 }}>
                        <Text style={styles.secondaryFontStyle}>{place.phone}</Text>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => copyToClipboard(String(place.phone))}
                    >
                        <Text style={styles.linkStyle}>Copiar teléfono</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.largeButton}
                    onPress={() => navigation.push('MapScreen', { place, search })}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            name='arrow-forward-circle-outline'
                            size={25}
                            color={'#FFFFFF'}
                            style={styles.drawerIcon}
                        />
                        <Text
                            style={styles.largeButtonText}
                        >
                            IR
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PlaceDetailsScreen;