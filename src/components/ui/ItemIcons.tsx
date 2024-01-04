import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { PlacesContext } from '../../context';
import { useIcons } from '../../hooks';
import { IPlace } from '../../interfaces';
import LinearGradientComponent from '../LinearGradientComponent';

import { styles } from '../../theme/AppTheme';

interface Props {
    item: IPlace;
    distance: number;
}

const ItemIcons = ({ item, distance }: Props) => {
    const { getPlaceRating } = useContext(PlacesContext);

    const [placeRating, setPlaceRating] = useState<number>(0);

    const setRating = async () => {
        setPlaceRating(await getPlaceRating(item._id));
    };

    useEffect(() => {
        setRating();
    }, []);

    return (
        <View style={styles.justifyContentSpaceBetween}>
            <View style={{ marginHorizontal: 12 }}>
                <View style={styles.smallMarginBottom}>
                    <Text numberOfLines={1} style={styles.boldMediumText}>{item.name}</Text>
                </View>
                <View style={styles.flexDirectionRowJustifySpaceBetween}>
                    {useIcons(item.category, 15, 15)}
                    <View style={styles.flexDirectionRow}>
                        <View style={styles.itemDetailsIconMarginEnd}>
                            {useIcons('Location', 15, 15)}
                        </View>
                        <Text style={styles.smallPlainText}>{isNaN(distance) ? '0.0' : distance.toFixed(1)} Km</Text>
                    </View>
                    <View style={styles.flexDirectionRow}>
                        <View style={styles.itemDetailsIconMarginEnd}>
                            {useIcons('Star', 15, 15)}
                        </View>
                        <Text style={styles.smallPlainText}>{placeRating.toFixed(1)}</Text>
                    </View>
                    <LinearGradientComponent level={item.premium}>
                        <View style={styles.linearGradient} />
                    </LinearGradientComponent>
                </View>
            </View>
        </View>
    );
};

export default ItemIcons;