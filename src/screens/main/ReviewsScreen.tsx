import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Rating } from 'react-native-ratings';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { RootStackParams } from '../../navigation';
import { PlacesContext, RatingContext } from '../../context';
import { IPlace } from '../../interfaces/app-interfaces';

import { styles } from '../../theme/AppTheme';
import LoadingScreen from '../LoadingScreen';

interface Props extends StackScreenProps<RootStackParams, 'ReviewsScreen'> { };

const ReviewsScreen = ({ route }: Props) => {

    const { top } = useSafeAreaInsets();

    const { place } = route.params;

    const { ratings, getRatings } = useContext(RatingContext);
    const { loadPlaceByID } = useContext(PlacesContext);

    const [placeInfo, setPlaceInfo] = useState<IPlace>();

    const getPlace = async () => {
        const data = await loadPlaceByID(place);
        setPlaceInfo(data);
    };

    useEffect(() => {
        getPlace();
        getRatings(place);
    }, [place]);

    return (
        <>
            {(place !== placeInfo?._id)
                ? <LoadingScreen />
                : <>
                    {(ratings.total === 0)
                        ?
                        <View style={{ marginTop: top, alignItems: 'center' }}>
                            <Text style={styles.blackTitle}>{placeInfo?.name}</Text>
                            <Text style={styles.secondaryFontStyle}>No hay opiniones</Text>
                        </View>
                        : <>
                            <View style={{ marginTop: top, alignItems: 'center' }}>
                                <Text style={styles.blackTitle}>{placeInfo?.name}</Text>
                                <Text style={styles.blackTitle}>{placeInfo.rate.$numberDecimal}</Text>
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
                    }
                </>
            }
        </>
    );
};

export default ReviewsScreen;