import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { styles } from '../theme/AppTheme';

interface Props {
    item: any;
    onPress: () => void;
}

const SavedPlace = ({item, onPress}: Props) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={styles.favoritesItemContainer}
            >
                <Image
                    source={{ uri: item.place.photo }}
                    style={styles.favoriteItemIcon}
                />
                <Text style={{
                    ...styles.blackPrimaryFontStyle,
                    flex: 3,
                    marginHorizontal: 10,
                    paddingEnd: 20
                }}>
                    {item.place.name}
                </Text>
                <Rating
                    fractions={2}
                    imageSize={20}
                    minValue={1}
                    ratingBackgroundColor='#FFFFFF'
                    ratingCount={5}
                    ratingTextColor='#5856D6'
                    showRating
                    startingValue={item.place.rate}
                    style={{ flex: 2 }}
                    tintColor='#EBEBEB'
                    type='star'
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SavedPlace;