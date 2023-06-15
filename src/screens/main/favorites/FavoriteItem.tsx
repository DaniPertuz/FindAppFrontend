import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

import { PlacesContext } from '../../../context/places/PlacesContext';
import { IFavorite } from '../../../interfaces/app-interfaces';
import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IFavorite;
    onPress: () => void;
}

const FavoriteItem = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

    const { getPlaceRating } = useContext(PlacesContext);

    const [placeRating, setPlaceRating] = useState<number>(0);

    const setRating = async () => {
        setPlaceRating(await getPlaceRating(item.place._id));
    };

    useEffect(() => {
        setRating();
    }, []);

    return (
        <>
            {(placeRating !== 0) &&
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPress}
                >
                    <View
                        style={styles.listItemContainer}
                    >
                        <Image
                            source={{ uri: item.place.photo }}
                            style={styles.itemIcon}
                        />
                        <Text style={{
                            ...styles.blackPrimaryFontStyle,
                            flex: 4,
                            marginHorizontal: 10,
                            paddingEnd: 20
                        }}>
                            {item.place.name}
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
                                onPress={() => navigator.navigate('ReviewsScreen', { place: item.place._id })}
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
                </TouchableOpacity>
            }
        </>
    );
};

export default FavoriteItem;