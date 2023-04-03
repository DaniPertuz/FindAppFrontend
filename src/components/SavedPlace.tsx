import React from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import { styles } from '../theme/AppTheme';

interface Props {
    item: any;
    onPress: () => void;
}

const SavedPlace = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={styles.favoritesItemContainer}
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
                            {item.place.rate}
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
                        startingValue={item.place.rate}
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

export default SavedPlace;