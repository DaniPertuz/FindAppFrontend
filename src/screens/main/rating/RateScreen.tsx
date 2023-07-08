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
                <View style={styles.flexDirectionRow}>
                    <View style={styles.flexOneAlignJustifyCenter}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => navigation.goBack()}
                        >
                            <Back height={18} width={18} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.stackScreenTitle}>
                            Calificar
                        </Text>
                    </View>
                    <View style={styles.flexOne} />
                </View>
                <View style={{ marginTop: 35 }}>
                    <View style={styles.flexDirectionRow}>
                        <View style={{ flex: 1, marginEnd: 10 }}>
                            <Image source={{ uri: item.place.photo }} style={{ borderRadius: 8, height: 102, width: 102 }} />
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={styles.flexOne}>
                                <Text style={styles.detailsMainName}>
                                    {item.place.name}
                                </Text>
                            </View>
                            <View style={{ flex: 2, marginVertical: 3 }}>
                                <Text numberOfLines={2} style={styles.description}>
                                    {item.place.description}
                                </Text>
                            </View>
                            <View style={styles.flexOneDirectionRow}>
                                <View style={{ ...styles.flexDirectionRow, marginEnd: 8 }}>
                                    <Star height={21} width={21} />
                                    <View style={{ marginStart: 6 }}>
                                        <Text style={styles.detailsBodyText}>
                                            {Number(item.place.rate.$numberDecimal).toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ ...styles.flexDirectionRow, marginStart: 8 }}>
                                    <UserCircle height={21} width={21} />
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <View style={styles.ratesReviewsTextContainer}>
                                            <Text style={styles.detailsCaptionText}>
                                                {ratings.total} opiniones
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 25, ...styles.flexDirectionRow }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={handleFavorite}
                    >
                        <View style={{ ...styles.flexDirectionRow, marginEnd: 12 }}>
                            {(newFavorite === true) ? <HeartFocused height={24} width={24} /> : <Heart height={24} width={24} />}
                            <View style={{ marginStart: 7 }}>
                                <Text style={styles.detailsCaptionGrayText}>
                                    {(newFavorite === true) ? 'Guardado' : 'Guardar'} en Favoritos
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={handleService}
                    >
                        <View style={{ ...styles.flexDirectionRow, marginStart: 12 }}>
                            {(newService === true) ? <BookmarkFavorite height={24} width={24} /> : <Bookmark height={24} width={24} />}
                            <View style={{ marginStart: 7 }}>
                                <Text style={styles.detailsCaptionGrayText}>
                                    {(newService === true) ? 'Guardado' : 'Guardar'} en Historial
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 25, ...styles.flexDirectionRow }}>
                    <Text style={styles.boldMediumText}>
                        Calificar
                    </Text>
                </View>
                <View style={styles.ratesContainer}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(1)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 1 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberOne height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(2)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 2 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberTwo height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(3)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 3 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberThree height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(4)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 4 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberFour height={36} width={36} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(5)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 5 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        <NumberFive height={36} width={36} />
                    </TouchableOpacity>
                </View>
                <View style={styles.mediumMarginTop}>
                    <Text style={styles.plainBodySmallText}>
                        Comentarios
                    </Text>
                    <View style={styles.smallMarginTop}>
                        <KeyboardAvoidingView
                            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                        >
                            <View style={styles.ratesCommentsContainer}>
                                <TextInput
                                    placeholder='Escribe tus comentarios'
                                    placeholderTextColor='#9A9A9A'
                                    keyboardType='default'
                                    style={[
                                        styles.ratesCommentsText,
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
                        style={styles.rateButton}
                    >
                        <Text style={styles.rateButtonText}>
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
                <View style={styles.reviewsModal}>
                    <View style={{ ...styles.mediumMarginTop, marginHorizontal: 21 }}>
                        <View style={styles.flexDirectionRow}>
                            <View style={styles.flexOne}>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Down height={24} width={24} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.flexOne}>
                                <Text style={styles.reviewsModalTitle}>Opiniones</Text>
                            </View>
                            <View style={styles.flexOne} />
                        </View>
                        <View style={styles.mediumMarginTop}>
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
            </Modal>
        </View>
    );
};

export default RateScreen;