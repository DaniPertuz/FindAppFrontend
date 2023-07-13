import React from 'react';
import { Text, View } from 'react-native';

import Restaurant from '../assets/restaurant.svg';

import { styles } from '../theme/AppTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    name:  string;
    count: number;
}

const Categories = ({ name, count }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={1.0}
        >
            <View style={styles.largeItem}>
                <View style={styles.extraSmallMarginTop}>
                    <Restaurant height={33} width={33} />
                </View>
                <View style={styles.smallMediumMarginTop}>
                    <Text style={styles.plainSmallText}>{name}</Text>
                </View>
                <View style={styles.tinyMarginTop}>
                    <Text style={styles.largeItemText}>{count} lugares</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Categories;