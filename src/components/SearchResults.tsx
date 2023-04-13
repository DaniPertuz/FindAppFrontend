import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import { styles } from '../theme/AppTheme';
import { IPlace } from '../interfaces/app-interfaces';
import { PlacesContext } from '../context/places/PlacesContext';

interface Props {
    item: IPlace;
    onPress: () => void;
}

const SearchResults = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

    const { getPlaceRating } = useContext(PlacesContext);

    const [placeRating, setPlaceRating] = useState<number>(0);

    const setRating = async () => {
        setPlaceRating(await getPlaceRating(item._id));
    }

    useEffect(() => {
      setRating();
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={styles.favoritesItemContainer}
            >
                <Image
                    source={{ uri: item.photo }}
                    style={styles.itemIcon}
                />
                <Text style={{
                    ...styles.blackPrimaryFontStyle,
                    flex: 4,
                    marginHorizontal: 10,
                    paddingEnd: 20
                }}>
                    {item.name}
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
                        onPress={() => navigator.navigate('ReviewsScreen', { place: item._id })}
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
        </TouchableWithoutFeedback>
    );
};

export default SearchResults;