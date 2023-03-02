import React from 'react';
import { FlatList, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../../theme/AppTheme';

const mock = [
    {
        date: "2023-02-22T00:56:13.318Z",
        place: {
            _id: "63bdde4b949961872f0dc4e9",
            name: "Restaurante Las Rocas",
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg",
            rate: 5
        },
        search: "Rocas"
    },
    {
        date: "2023-09-22T00:56:13.318Z",
        place: {
            _id: "63bdde4b949961872f0dc4e8",
            name: "Las Rocas",
            photo: "https://res.cloudinary.com/dpertuzo/image/upload/v1673755699/mioqv1657x4edresteji.jpg",
            rate: 3.79
        },
        search: "Rocas"
    }
];

const FavoritesScreen = () => {

    const { top } = useSafeAreaInsets();

    return (
        <View
            style={{
                ...styles.topContainer,
                marginTop: top
            }}
        >
            <Text
                style={styles.blackTitle}
            >
                Lugares favoritos
            </Text>
            <FlatList
                data={mock}
                keyExtractor={(m) => m.place._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => { }}
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
                                    marginHorizontal: 10
                                }}>
                                    {item.place.name}
                                </Text>
                                <Rating
                                    fractions={2}
                                    imageSize={20}
                                    minValue={1}
                                    ratingBackgroundColor='#FFFFFF'
                                    ratingColor='#0dbd33'
                                    ratingCount={5}
                                    ratingTextColor='#5856D6'
                                    showRating
                                    startingValue={item.place.rate}
                                    style={{ flex: 2, width: '100%', overflow: 'hidden' }}
                                    tintColor='#EBEBEB'
                                    type='star'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
            />
        </View>
    );
};

export default FavoritesScreen;