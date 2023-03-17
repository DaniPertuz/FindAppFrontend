import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { styles } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';

interface Props {
    item?: any;
    bottomSheetRef: React.RefObject<BottomSheetMethods>;
    snapPoints: number[];
}

const BottomSheetComponent = ({ item, bottomSheetRef, snapPoints }: Props) => {

    const navigation = useNavigation();

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        bottomSheetRef.current?.close();
    };

    const formatDate = (item: any) => {
        return moment(item.date).format('MMMM DD, YYYY h:mm A').charAt(0).toUpperCase() + moment(item.date).format('MMMM DD, YYYY h:mm A').slice(1);
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
        >
            <View
                style={styles.bottomSheetMainContainer}
            >
                <View
                    style={styles.bottomSheetContainer}
                >
                    <View
                        style={styles.bottomSheetTopContainer}
                    >
                        <Image
                            source={{ uri: item.place.photo }}
                            style={styles.bottomSheetIcon}
                        />
                    </View>
                    <View style={{ width: 30 }}>
                        <TouchableOpacity
                            onPress={() => bottomSheetRef.current?.close()}
                        >
                            <Icon
                                color='#000000'
                                name='close-circle-outline'
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={styles.bottomSheetDetailsContainer}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '90%' }}>
                            <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>Lugar</Text>
                            <View style={styles.bottomSheetDetailsSecondaryContainer}>
                                <Text style={styles.bottomSheetDetailsSecondaryFontStyle}>{item.place.name}</Text>
                            </View>
                        </View>
                        <View style={{ width: '10%' }}>
                            <TouchableOpacity
                                onPress={() => {navigation.navigate('MapScreen', { place: item.place.address })}}
                            >
                                <Icon
                                    color='#000000'
                                    name='arrow-forward-circle-outline'
                                    size={30}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>Dirección</Text>
                    <View style={styles.bottomSheetDetailsSecondaryContainer}>
                        <Text style={styles.bottomSheetDetailsSecondaryFontStyle}>{item.place.address}</Text>
                        <TouchableOpacity
                            onPress={() => copyToClipboard(item.place.address)}
                        >
                            <Text style={{ ...styles.bottomSheetDetailsSecondaryFontStyle, marginEnd: 30 }}>Copiar dirección</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>Teléfono</Text>
                    <View style={styles.bottomSheetDetailsSecondaryContainer}>
                        <Text style={styles.bottomSheetDetailsSecondaryFontStyle}>{item.place.phone}</Text>
                        <TouchableOpacity
                            onPress={() => copyToClipboard(String(item.place.phone))}
                        >
                            <Text style={{ ...styles.bottomSheetDetailsSecondaryFontStyle, marginEnd: 30 }}>Copiar número</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>Fecha</Text>
                    <Text style={styles.bottomSheetDetailsSecondaryFontStyle}>{formatDate(item)}</Text>
                </View>
            </View>
        </BottomSheet>
    );
};

export default BottomSheetComponent;