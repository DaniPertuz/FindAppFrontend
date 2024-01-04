import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../context';
import { useFavoritesAndService, useIcons } from '../../hooks';
import { IService } from '../../interfaces';

import { styles } from '../../theme/AppTheme';

interface Props {
    item: IService;
}

const RateScreenSubheader = ({ item }: Props) => {

    const { user } = useContext(AuthContext);
    const { addFavorite, addService, deleteFavorite, deleteService, getFavorite, getHistoryItem } = useFavoritesAndService({ place: item.place });
    const [newFavorite, setNewFavorite] = useState(false);
    const [newService, setNewService] = useState(false);

    const handleFavorite = () => {
        setNewFavorite((prevNewFavorite) => {
            const updatedNewFavorite = !prevNewFavorite;

            if (updatedNewFavorite) {
                addFavorite(item.user, item.place._id);
            }

            deleteFavorite(item.user, item.place._id);

            return updatedNewFavorite;
        });
    };

    const handleService = () => {
        setNewService((prevNewService) => {
            const updatedNewService = !prevNewService;

            if (updatedNewService) {
                addService(item.place._id, item.search, item.user);
            }
            deleteService(item.user, item.place._id);

            return updatedNewService;
        });
    };

    useEffect(() => {
        let mounted = true;
        getHistoryItem(user?._id!, item.place._id).then((data) => {
            if (mounted && data) {
                setNewService(!data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        getFavorite(user?._id!, item.place._id).then((data) => {
            if (mounted && data) {
                setNewFavorite(!data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <View style={{ marginTop: 25, ...styles.flexDirectionRow }}>
            <TouchableOpacity
                activeOpacity={1.0}
                onPress={handleFavorite}
            >
                <View style={{ ...styles.flexDirectionRow, marginEnd: 12 }}>
                    {(newFavorite) ? useIcons('HeartFocused', 24, 24) : useIcons('Heart', 24, 24)}
                    <View style={styles.smallMarginStart}>
                        <Text style={styles.detailsCaptionGrayText}>{(newFavorite) ? 'Guardado' : 'Guardar'} en Favoritos</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1.0}
                onPress={handleService}
            >
                <View style={{ ...styles.flexDirectionRow, marginStart: 12 }}>
                    {(newService) ? useIcons('BookmarkFavorite', 24, 24) : useIcons('Bookmark', 24, 24)}
                    <View style={styles.smallMarginStart}>
                        <Text style={styles.detailsCaptionGrayText}>{(newService) ? 'Guardado' : 'Guardar'} en Historial</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default RateScreenSubheader;