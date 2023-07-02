import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext, PlacesContext } from '../../../context';
import FavoriteItem from './FavoriteItem';
import LoadingScreen from '../../LoadingScreen';
import { IFavorites } from '../../../interfaces';

import { styles } from '../../../theme/AppTheme';

const FavoritesScreen = () => {

    const navigation = useNavigation();

    const init = { total: 0, favorites: [] };

    const [favorites, setFavorites] = useState<IFavorites>(init);
    const [display, setDisplay] = useState(false);

    const { user } = useContext(AuthContext);
    const { getFavorites } = useContext(PlacesContext);

    useEffect(() => {
        let mounted = true;
        getFavorites(user?._id!).then((data) => {
            if (mounted) {
                setFavorites(data);
                setDisplay(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, [favorites]);

    return (
        <>
            {(display === false) && <LoadingScreen />}

            {(display === true) &&
                <View
                    style={{
                        backgroundColor: 'rgba(104, 110, 222, 0.1)',
                        flex: 1,
                        paddingHorizontal: 22,
                        paddingTop: 70
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            style={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(250, 250, 250, 0.98)',
                                borderRadius: 8,
                                flex: 5,
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                marginEnd: 20,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                elevation: 3
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={() => { }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../../assets/search.png')}
                                        style={{ height: 16, width: 16 }}
                                    />
                                    <View style={{ marginHorizontal: 10 }}>
                                        <Text style={{ color: '#858585', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>
                                            Escribe una palabra o frase
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => navigation.navigate('EditProfileScreen')}
                            style={user?.photo !== '' ? { backgroundColor: 'rgba(250, 250, 250, 0.98)', borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center' } : { backgroundColor: 'rgba(250, 250, 250, 0.98)', borderColor: '#081023', borderWidth: 1, borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Image source={(user?.photo === '' ? require('../../../assets/FA_Color.png') : { uri: user?.photo })} style={user?.photo !== '' ? { height: 50, width: 50, borderRadius: 50, borderColor: '#081023', borderWidth: 1 } : { height: 50, width: 50, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>Favoritos</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            data={favorites.favorites}
                            keyExtractor={(item) => item.place._id}
                            renderItem={({ item }) => {
                                return (
                                    <FavoriteItem
                                        item={item}
                                        onPress={() => navigation.navigate('MapScreen', { place: item.place, search: item.place.name })}
                                    />
                                );
                            }}
                        />
                    </View>
                </View>
            }
        </>
    );
};

export default FavoritesScreen;