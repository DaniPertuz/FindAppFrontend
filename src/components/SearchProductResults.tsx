import React from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Rating } from 'react-native-ratings';
import { IProduct } from '../interfaces/app-interfaces';

import { styles } from '../theme/AppTheme';

interface Props {
    item: IProduct;
    onPress: () => void;
}

const SearchProductResults = ({ item, onPress }: Props) => {

    const navigator = useNavigation();

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={styles.listItemContainer}
            >
                <Image
                    source={(item.img === '') ? require('../assets/placeholder.png') : { uri: item.img }}
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
                            {item.rate.$numberDecimal}
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
                            startingValue={parseFloat(item.rate.$numberDecimal)}
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

export default SearchProductResults;