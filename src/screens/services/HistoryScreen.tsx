import React, { useEffect, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { BackHandler, FlatList, Image, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import BottomSheetComponent from '../../components/BottomSheetComponent';
import { ISearch } from '../../interfaces';
import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<any, any> { };

const mock = [
    {
        date: "2023-02-22T00:56:13.318Z",
        place: {
            _id: "63bdde4b949961872f0dc4e9",
            name: "Las Rocas",
            description: "Lo mejor de la cocina colombiana",
            address: "Cl. 82 #45 - 13",
            phone: 3043782846,
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg"
        },
        search: "Rocas"
    },
    {
        date: "2023-09-22T00:56:13.318Z",
        place: {
            _id: "63bdde4b949961872f0dc4e8",
            name: "Las Rocas",
            description: "Lo mejor de la cocina colombiana",
            address: "Cl. 82 #45 - 13",
            phone: 3043782846,
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg"
        },
        search: "Rocas"
    }
];

const HistoryScreen = ({ navigation }: Props) => {
    const { top } = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [itemObject, setItemObject] = useState<ISearch>();

    const handleBackButtonClick = () => {
        navigation.goBack();
        bottomSheetRef.current?.close();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    return (
        <View
            style={{
                ...styles.topContainer,
                paddingTop: (Platform.OS === 'ios') ? top : top + 20
            }}
        >
            <FlatList
                data={mock}
                keyExtractor={(m) => m.place._id}
                renderItem={({ item }) => {
                    setItemObject(item);
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => bottomSheetRef.current?.expand()}
                        >
                            <View
                                style={styles.searchListItemContainer}
                            >
                                <View
                                    style={styles.searchListItem}
                                >
                                    <Image
                                        source={{ uri: item.place.photo }}
                                        style={styles.searchListItemIcon}
                                    />
                                    <Text style={{
                                        ...styles.blackPrimaryFontStyle,
                                        marginTop: 4
                                    }}>
                                        {item.search}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
            />
            {itemObject &&
                <BottomSheetComponent
                    item={itemObject}
                    bottomSheetRef={bottomSheetRef}
                />
            }
        </View>
    );
};

export default HistoryScreen;