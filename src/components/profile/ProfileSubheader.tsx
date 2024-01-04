import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useIcons } from '../../hooks';
import { IRatingList } from '../../interfaces';
import { RootStackParams } from '../../navigation';

import { styles } from '../../theme/AppTheme';

interface Props {
    totalFavorites: number;
    totalHistory: number;
    userRatings: IRatingList;
    navigation: StackNavigationProp<RootStackParams, "EditProfileScreen">
}

const ProfileSubheader = ({ totalFavorites, totalHistory, userRatings, navigation }: Props) => {
    return (
        <View style={{ ...styles.flexDirectionRowJustifyAround, ...styles.mediumMarginTop }}>
            <View style={styles.largeItem}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={{ ...styles.alignItemsCenter, ...styles.extraSmallMarginTop }}
                    onPress={() => navigation.navigate('HistoryScreen')}
                >
                    {useIcons('History', 33, 33)}
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.plainSmallText}>Historial</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.largeItemText}>{totalHistory} viajes</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.largeItem}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={{ ...styles.alignItemsCenter, ...styles.extraSmallMarginTop }}
                    onPress={() => navigation.navigate('FavoritesNavigator')}
                >
                    {useIcons('HeartFavorite', 33, 33)}
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.plainSmallText}>Favoritos</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.largeItemText}>{totalFavorites} {(totalFavorites === 1) ? 'lugar' : 'lugares'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.largeItem}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={{ ...styles.alignItemsCenter, ...styles.extraSmallMarginTop }}
                    onPress={() => navigation.navigate('RatingsScreen')}
                >
                    {useIcons('Star', 33, 33)}
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.plainSmallText}>Calificaciones</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.largeItemText}>{userRatings.total} {(userRatings.total === 1) ? 'lugar' : 'lugares'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileSubheader;