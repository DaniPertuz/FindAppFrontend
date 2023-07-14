import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useIcons } from '../hooks/useIcons';
import { styles } from '../theme/AppTheme';

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
                    {useIcons(name, 33, 33)}
                </View>
                <View style={styles.smallMediumMarginTop}>
                    <Text style={styles.plainSmallText}>{name}</Text>
                </View>
                <View style={styles.tinyMarginTop}>
                    <Text style={styles.largeItemText}>{count} {(count === 1) ? 'lugar' : 'lugares'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Categories;