import React, { useContext, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { RatingContext } from '../../context';
import { RootStackParams } from '../../navigation';
import { styles } from '../../theme/AppTheme';
import { Rating } from 'react-native-ratings';

interface Props extends StackScreenProps<RootStackParams, 'ReviewsScreen'> { };

const ReviewsScreen = ({ route }: Props) => {

    const { top } = useSafeAreaInsets();

    const { place } = route.params;

    const { ratings, ratingAverage, getRatings, getPlaceRatingAverage } = useContext(RatingContext);

    useEffect(() => {
        getRatings(place);
        getPlaceRatingAverage(place);
    }, [place]);

    return (
        <>
            <View style={{ alignSelf: 'center', marginTop: top }}>
                <Text style={styles.blackTitle}>{ratingAverage.toFixed(2)}</Text>
                <Text style={styles.secondaryFontStyle}>{ratings.total} opiniones</Text>
            </View>
            <View style={{ flex: 10 }}>
                <FlatList
                    data={ratings.rates}
                    renderItem={({ item }) => (
                        <View
                            style={{ flex: 1, margin: 20 }}
                        >
                            <View
                                style={{ flexDirection: 'row' }}
                            >
                                <Image
                                    style={{
                                        borderRadius: 10,
                                        flex: 1,
                                        height: 60,
                                        width: 60
                                    }}
                                    source={(item.user?.photo === '')
                                        ? require('../../assets/placeholder.png')
                                        : { uri: item.user?.photo }}
                                />
                                <View style={{ flex: 5, paddingHorizontal: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.blackPrimaryFontStyle}>
                                            {((item.user?.name!).length > 18) ?
                                                (((item.user?.name!).substring(0, 18)) + '...') :
                                                item.user?.name}
                                        </Text>
                                        <Text style={styles.secondaryFontStyle}>
                                            {moment(item.createdAt, "YYYYMMDD").fromNow()}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Rating
                                            fractions={2}
                                            imageSize={20}
                                            minValue={1}
                                            ratingBackgroundColor='#FFFFFF'
                                            ratingCount={5}
                                            ratingTextColor='#5856D6'
                                            readonly
                                            showReadOnlyText={false}
                                            startingValue={item.rate}
                                            style={{ marginEnd: 5 }}
                                            tintColor='#FFFFFF'
                                            type='star'
                                        />
                                        <Text style={styles.secondaryFontStyle}>
                                            ({item.rate.toFixed(1)})
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {(item.comments !== '') &&
                                <View>
                                    <Text style={styles.secondaryFontStyle}>
                                        {item.comments}
                                    </Text>
                                </View>
                            }
                        </View>
                    )}
                />
            </View>
        </>
    );
};

export default ReviewsScreen;