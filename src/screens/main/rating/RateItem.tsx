import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { IRate } from '../../../interfaces/app-interfaces';
import { PlacesContext } from '../../../context/places/PlacesContext';


import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IRate;
}

const RateItem = ({ item }: Props) => {

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
        <View style={styles.rateItemContainer}>
            <View style={styles.flexDirectionRow}>
                <View style={styles.flexOne}>
                    <Image source={{ uri: item.user?.photo }} style={styles.itemIcon} />
                </View>
                <View style={styles.flexThree}>
                    <Text numberOfLines={1} style={styles.rateItemUserName}>
                        {item.user?.name}
                    </Text>
                    <View style={{ ...styles.flexDirectionRow, marginVertical: 6 }}>
                        <Rating
                            fractions={1}
                            imageSize={25}
                            minValue={1}
                            ratingColor='#207CFD'
                            ratingCount={5}
                            ratingBackgroundColor='#858585'
                            readonly
                            showReadOnlyText={false}
                            startingValue={item.rate}
                            style={styles.justifyContentFlexStart}
                            tintColor='#FFFFFF'
                            type='custom'
                        />
                        <View style={{ marginStart: 6, ...styles.justifyContentCenter }}>
                            <Text style={styles.rateItemAvg}>
                                {item.rate.toFixed(1)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexTwo}>
                    <Text style={styles.rateItemDate}>
                        {moment(item.createdAt, "YYYYMMDD").fromNow()}
                    </Text>
                </View>
            </View>
            <View style={{ marginStart: 45, paddingHorizontal: 10 }}>
                <Text style={styles.description}>
                    {item.comments}
                </Text>
            </View>
        </View>
    );
};

export default RateItem;