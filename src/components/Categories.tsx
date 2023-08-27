import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParams } from '../navigation';
import { useIcons } from '../hooks/useIcons';

import { styles } from '../theme/AppTheme';

interface Props {
    name:  string;
    count: number;
}

const Categories = ({ name, count }: Props) => {
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    return (
        <>
            {name !== '' &&
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => navigator.navigate('PlacesScreen', { category: name })}
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
            }
        </>
    );
};

export default Categories;