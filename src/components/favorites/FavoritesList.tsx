import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { IFavorites } from '../../interfaces';
import { FavoriteItem } from '../../screens';
import StatusBarComponent from '../StatusBarComponent';
import TopButtons from '../TopButtons';

import { styles } from '../../theme/AppTheme';

interface Props {
    favorites: IFavorites;
}

const FavoritesList = ({ favorites }: Props) => {
    return (
        <View style={styles.favoriteScreenContainer}>
            <StatusBarComponent color='rgba(104, 110, 222, 0)' theme='dark-content' />
            <TopButtons />
            <View style={styles.mediumMarginTop}>
                <Text style={styles.boldMediumText}>Mis Favoritos</Text>
            </View>
            <View style={styles.smallMarginTop}>
                {(favorites.total === 0)
                    ?
                    <View style={styles.alignItemsJustifyContentCenter}>
                        <Text style={styles.boldMediumText}>No hay favoritos aún</Text>
                    </View>
                    :
                    <FlatList
                        data={favorites.favorites}
                        keyExtractor={(item) => item.place._id}
                        renderItem={({ item }) => {
                            return (
                                <FavoriteItem item={item} />
                            );
                        }}
                    />
                }
            </View>
        </View>
    );
};

export default FavoritesList;