import React, { useContext, useEffect, useState } from 'react';
import { Alert, BackHandler, FlatList, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext, PlacesContext, RatingContext } from '../../../context';
import { RootStackParams } from '../../../navigation';
import { useForm } from '../../../hooks/useForm';
import { IRate } from '../../../interfaces';

import Back from '../../../assets/back.svg';
import Bookmark from '../../../assets/bookmark.svg';
import BookmarkFavorite from '../../../assets/bookmark-favorite.svg';
import Down from '../../../assets/down.svg';
import Heart from '../../../assets/heart.svg';
import HeartFocused from '../../../assets/heart-focused.svg';
import NumberOne from '../../../assets/NumberOne.svg';
import NumberTwo from '../../../assets/NumberTwo.svg';
import NumberThree from '../../../assets/NumberThree.svg';
import NumberFour from '../../../assets/NumberFour.svg';
import NumberFive from '../../../assets/NumberFive.svg';
import Star from '../../../assets/star.svg';
import UserCircle from '../../../assets/user-circle-plain.svg';

import { styles } from '../../../theme/AppTheme';
import RateItem from './RateItem';

interface Props extends StackScreenProps<RootStackParams, 'RateScreen'> { };

const RateScreen = ({ navigation, route }: Props) => {

    const { item } = route.params;

    const { top } = useSafeAreaInsets();

    const { user } = useContext(AuthContext);
    const { addFavorite, addService, deleteFavorite, deleteService, getFavorite, getHistoryItem } = useContext(PlacesContext);
    const { addRating, getRatings, getPlaceRatingAverage, ratings, ratingAverage } = useContext(RatingContext);
    const { comments, onChange } = useForm({
        comments: '',
    });

    const [selectedRate, setSelectedRate] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [newFavorite, setNewFavorite] = useState(false);
    const [newService, setNewService] = useState(false);

    const handleRate = (num: number) => {
        setSelectedRate(num);
    };

    const onRate = () => {
        Keyboard.dismiss();
        if (selectedRate === 0) {
            Alert.alert('Falta información', 'No has ingresado la calificación', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ]);
            return;
        }
        console.log(selectedRate, comments, user, item.place._id);
        (user !== null) && addRating({ rate: selectedRate, comments, place: item.place._id, user: item.user });
        navigation.popToTop();
    };

    const handleFavorite = () => {
        setNewFavorite(!newFavorite);

        if (newFavorite === false) {
            addFavorite(item.user, item.place._id);
        }

        deleteFavorite(item.user, item.place._id);
    };

    const handleService = () => {
        setNewService(!newService);

        if (newService === false) {
            addService(new Date().toString(), item.place._id, item.search, item.user);
        }

        deleteService(item.user, item.place._id);
    };

    const backButtonHandler = () => {
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        getRatings(item.place._id);
        getPlaceRatingAverage(item.place._id);
    }, []);

    useEffect(() => {
        let mounted = true;
        getHistoryItem(user?._id!, item.place._id).then((data) => {
            if (mounted) {
                setNewService(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        getFavorite(user?._id!, item.place._id).then((data) => {
            if (mounted) {
                setNewFavorite(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, []);

    return (
        <View style={{ backgroundColor: 'rgba(104, 110, 222, 0.1)', flex: 1 }}>
            <View style={{ marginTop: (Platform.OS === 'ios') ? top : top + 23, marginHorizontal: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => navigation.goBack()}
                        >
                            <Back height={18} width={18} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#1F273A', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20 }}>
                            Calificar
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={{ marginTop: 35 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginEnd: 10 }}>
                            <Image source={{ uri: item.place.photo }} style={{ borderRadius: 8, height: 102, width: 102 }} />
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#081023', fontSize: 20, fontWeight: '700', letterSpacing: -0.4, lineHeight: 28 }}>
                                    {item.place.name}
                                </Text>
                            </View>
                            <View style={{ flex: 2, marginVertical: 3 }}>
                                <Text numberOfLines={2} style={{ color: '#081023', fontSize: 12, fontWeight: '400', letterSpacing: -0.24, lineHeight: 16 }}>
                                    {item.place.description}
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginEnd: 8 }}>
                                    <Star height={21} width={21} />
                                    <View style={{ marginStart: 6 }}>
                                        <Text style={{ color: '#0D0D0D', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22 }}>
                                            {Number(item.place.rate.$numberDecimal).toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginStart: 8 }}>
                                    <UserCircle height={21} width={21} />
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <View style={{ marginStart: 6, marginTop: 3, justifyContent: 'center' }}>
                                            <Text style={{ color: '#207CFD', fontSize: 13, fontWeight: '500', letterSpacing: -0.26, lineHeight: 15 }}>
                                                {ratings.total} opiniones
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 25, flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={handleFavorite}
                    >
                        <View style={{ flexDirection: 'row', marginEnd: 12 }}>
                            {(newFavorite === true) ? <HeartFocused height={24} width={24} /> : <Heart height={24} width={24} />}
                            <View style={{ marginStart: 7 }}>
                                <Text style={{ color: '#5A5A5A', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20, textAlign: 'center' }}>
                                    {(newFavorite === true) ? 'Guardado' : 'Guardar'} en Favoritos
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={handleService}
                    >
                        <View style={{ flexDirection: 'row', marginStart: 12 }}>
                            {(newService === true) ? <BookmarkFavorite height={24} width={24} /> : <Bookmark height={24} width={24} />}
                            <View style={{ marginStart: 7 }}>
                                <Text style={{ color: '#5A5A5A', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20, textAlign: 'center' }}>
                                    {(newService === true) ? 'Guardado' : 'Guardar'} en Historial
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 25, flexDirection: 'row' }}>
                    <Text style={{ color: '#081023', fontSize: 14, fontWeight: '700', lineHeight: 18 }}>
                        Calificar
                    </Text>
                </View>
                <View style={styles.ratesContainer}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(1)}
                        style={[
                            { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8.7, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 9 },
                            { backgroundColor: selectedRate === 1 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberOne height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(2)}
                        style={[
                            { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8.7, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 9 },
                            { backgroundColor: selectedRate === 2 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberTwo height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(3)}
                        style={[
                            { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8.7, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 9 },
                            { backgroundColor: selectedRate === 3 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberThree height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(4)}
                        style={[
                            { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8.7, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 9 },
                            { backgroundColor: selectedRate === 4 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberFour height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(5)}
                        style={[
                            { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8.7, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 9 },
                            { backgroundColor: selectedRate === 5 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberFive height={36} width={36} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: '#081023', fontSize: 12, fontWeight: '500', letterSpacing: -0.24, lineHeight: 20 }}>
                        Comentarios
                    </Text>
                    <View style={{ marginTop: 10 }}>
                        <KeyboardAvoidingView
                            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                        >
                            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 8, borderColor: '#081023', borderWidth: 1, padding: 16 }}>
                                <TextInput
                                    placeholder='Escribe tus comentarios'
                                    placeholderTextColor='#9A9A9A'
                                    keyboardType='default'
                                    style={[
                                        { fontSize: 12, fontWeight: '400', alignItems: 'center', letterSpacing: -0.24, lineHeight: 16 },
                                        (Platform.OS === 'ios') && { lineHeight: 12 }
                                    ]}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(value) => onChange(value, 'comments')}
                                    value={comments}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={{ marginHorizontal: 26, marginTop: 151 }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={onRate}
                        style={{ alignItems: 'center', backgroundColor: '#207CFD', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10 }}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22 }}>
                            Enviar Calificación
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ backgroundColor: 'rgba(31, 39, 58, 0.95)' }}>
                    <View
                        style={{
                            backgroundColor: 'rgba(250, 250, 250, 0.98)',
                            height: '95%',
                            top: '13%',
                            borderTopEndRadius: 20,
                            borderTopStartRadius: 20,
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
                        <View
                            style={{
                                marginTop: 20,
                                marginHorizontal: 21
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Down height={24} width={24} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#1F273A', fontSize: 16, fontWeight: '500', letterSpacing: -0.32, lineHeight: 22, textAlign: 'center' }}>Opiniones</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ marginTop: 21 }}>
                                <FlatList
                                    data={ratings.rates}
                                    keyExtractor={m => m._id!}
                                    renderItem={({ item }) => (
                                        <RateItem item={item} />
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default RateScreen;