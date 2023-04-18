import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

import { PlacesContext } from '../../../context/places/PlacesContext';
import { IPlace, IService } from '../../../interfaces/app-interfaces';
import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IService;
    onPress: () => void;
}

const HistoryItem = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

    const { getPlaceRating, loadPlaceByID } = useContext(PlacesContext);

    const [place, setPlace] = useState<IPlace>();
    const [placeRating, setPlaceRating] = useState<number>(0);

    const setRating = async () => {
        setPlaceRating(await getPlaceRating(item.place._id));
    };

    const setPlaceData = async () => {
        const data = await loadPlaceByID(item.place._id);
        setPlace(data);
    };

    useEffect(() => {
        setPlaceData();
        setRating();
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <>
                <Text>Buscaste: {item.search}</Text>
                <View
                    style={styles.listItemContainer}
                >
                    <Image
                        source={{ uri: place?.photo }}
                        style={styles.itemIcon}
                    />
                    <Text style={{
                        ...styles.blackPrimaryFontStyle,
                        flex: 4,
                        marginHorizontal: 10,
                        paddingEnd: 20
                    }}>
                        {place?.name}
                    </Text>
                    <View
                        style={{
                            flex: 2,
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center', flex: 1
                            }}
                            activeOpacity={0.9}
                            onPress={() => navigator.navigate('ReviewsScreen', { place: place?._id })}
                        >
                            <Text style={styles.linkStyle}>
                                {placeRating.toFixed(2)}
                            </Text>
                            <Rating
                                fractions={2}
                                imageSize={20}
                                minValue={1}
                                ratingBackgroundColor='#FFFFFF'
                                ratingCount={5}
                                ratingTextColor='#5856D6'
                                readonly
                                showReadOnlyText={false}
                                startingValue={placeRating}
                                style={{ flex: 2 }}
                                tintColor='#EBEBEB'
                                type='star'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        </TouchableWithoutFeedback>
    );
};

export default HistoryItem;