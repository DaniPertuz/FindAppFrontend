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
        setPlaceRating(await getPlaceRating(item.place));
    };

    useEffect(() => {
        setRating();
    }, []);

    return (
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 8, marginBottom: 24, paddingHorizontal: 10, paddingVertical: 8 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: item.user?.photo }} style={{ borderRadius: 8, height: 42, width: 42 }} />
                </View>
                <View style={{ flex: 3 }}>
                    <Text numberOfLines={1} style={{ color: '#0D0D0D', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>
                        {item.user?.name}
                    </Text>
                    <View style={{ flexDirection: 'row', marginVertical: 6 }}>
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
                            style={{ justifyContent: 'flex-start' }}
                            tintColor='#FFFFFF'
                            type='custom'
                        />
                        <View style={{ marginStart: 6, justifyContent: 'center' }}>
                            <Text style={{ color: '#0D0D0D', fontSize: 13, fontWeight: '500', letterSpacing: -0.26, lineHeight: 18 }}>
                                {item.rate.toFixed(1)}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ color: '#081023', fontSize: 12, fontWeight: '400', letterSpacing: -0.24, lineHeight: 16 }}>
                        {item.comments}
                    </Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={{ color: '#858585', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20, textAlign: 'right' }}>
                        {moment(item.createdAt, "YYYYMMDD").fromNow()}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RateItem;