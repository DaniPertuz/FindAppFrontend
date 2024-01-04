import React, { useContext, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { RatingContext } from '../../context';
import { useIcons } from '../../hooks';
import { IService } from '../../interfaces';

import { styles } from '../../theme/AppTheme';

interface Props {
    item: IService;
    handleModalVisible: (value: boolean) => void;
}

const RateScreenHeader = ({ item, handleModalVisible }: Props) => {
    const { getRatings, getPlaceRatingAverage, ratings, ratingAverage } = useContext(RatingContext);

    useEffect(() => {
        getRatings(item.place._id);
        getPlaceRatingAverage(item.place._id);
    }, []);

    return (
        <View style={{ marginTop: 35 }}>
            <View style={styles.flexDirectionRow}>
                <View style={styles.flexOne}>
                    <Image source={(item.place.photo) ? { uri: item.place.photo } : require('../assets/FA_Color.png')} style={styles.rateScreenPhoto} />
                </View>
                <View style={styles.flexTwo}>
                    <View style={styles.flexOne}>
                        <Text style={styles.detailsMainName}>{item.place.name}</Text>
                    </View>
                    <View style={styles.flexOne}>
                        <Text numberOfLines={2} style={styles.description}>{item.place.description}</Text>
                    </View>
                    <View style={styles.flexDirectionRow}>
                        <View style={styles.flexOneDirectionRow}>
                            <View style={styles.alignItemsJustifyContentCenter}>
                                {useIcons('Star', 21, 21)}
                            </View>
                            <View style={{ marginStart: 6 }}>
                                <Text style={styles.detailsBodyText}>{ratingAverage.toFixed(1)}</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.flexDirectionRow, ...styles.flexTwo }}>
                            <View style={styles.alignItemsJustifyContentCenter}>
                                {useIcons('UserCircle', 21, 21)}
                            </View>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={() => handleModalVisible(true)}
                            >
                                <View style={styles.ratesReviewsTextContainer}>
                                    <Text style={styles.detailsCaptionText}>
                                        {ratings.total} {(ratings.total === 1) ? 'opinión' : 'opiniones'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RateScreenHeader;