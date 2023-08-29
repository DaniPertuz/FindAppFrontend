import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, FlatList, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-root-toast';

import { AuthContext, PlacesContext, RatingContext } from '../../../context';
import { RootStackParams } from '../../../navigation';
import { useForm } from '../../../hooks/useForm';
import { useIcons } from '../../../hooks/useIcons';
import RateItem from './RateItem';

import { styles } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'RateScreen'> { };

const RateScreen = ({ navigation, route }: Props) => {

    const { item } = route.params;

    const { top } = useSafeAreaInsets();

    const { user } = useContext(AuthContext);
    const { addFavorite, addService, deleteFavorite, deleteService, getFavorite, getHistoryItem } = useContext(PlacesContext);
    const { addRating, getRatings, getPlaceRatingAverage, ratings } = useContext(RatingContext);
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
            Toast.show('No has ingresado la calificación', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
            return;
        }

        (user !== null) && addRating({ rate: selectedRate, comments, place: item.place._id, user: item.user });
        Toast.show('Calificación registrada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
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
            addService(item.place._id, item.search, item.user);
        }

        deleteService(item.user, item.place._id);
    };

    const backButtonHandler = () => {
        navigation.popToTop();
        return true;
    };

    useEffect(() => {
        getRatings(item.place._id);
        getPlaceRatingAverage(item.place._id);
    }, []);

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

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, []);

    return (
        <View style={styles.mainBackground}>
            <View style={{ marginTop: (Platform.OS === 'ios') ? top : top + 20, marginHorizontal: 16 }}>
                <View style={styles.flexDirectionRow}>
                    <View style={styles.flexOneAlignJustifyCenter}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => navigation.popToTop()}
                        >
                            {useIcons('Back', 25, 25)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 10, ...styles.justifyAlignItemsCenter }}>
                        <Text style={styles.stackScreenTitle}>
                            Calificar
                        </Text>
                    </View>
                    <View style={styles.flexOne} />
                </View>
                <View style={{ marginTop: 35 }}>
                    <View style={styles.flexDirectionRow}>
                        <View style={{ ...styles.flexOne, marginEnd: 10 }}>
                            <Image source={{ uri: item.place.photo }} style={{ borderRadius: 8, height: 102, width: 102 }} />
                        </View>
                        <View style={styles.flexTwo}>
                            <View style={styles.flexOne}>
                                <Text style={styles.detailsMainName}>
                                    {item.place.name}
                                </Text>
                            </View>
                            <View style={{ ...styles.flexTwo, marginVertical: 3 }}>
                                <Text numberOfLines={2} style={styles.description}>
                                    {item.place.description}
                                </Text>
                            </View>
                            <View style={styles.flexDirectionRowAlignItemsCenter}>
                                <View style={{ ...styles.flexDirectionRow, marginEnd: 8 }}>
                                    <View style={styles.alignItemsJustifyContentCenter}>
                                        {useIcons('Star', 21, 21)}
                                    </View>
                                    <View style={{ marginStart: 6 }}>
                                        <Text style={styles.detailsBodyText}>
                                            {Number(item.place.rate.$numberDecimal).toFixed(1)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ ...styles.flexDirectionRow, marginStart: 8 }}>
                                    <View style={styles.alignItemsJustifyContentCenter}>
                                        {useIcons('UserCircle', 21, 21)}
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <View style={styles.ratesReviewsTextContainer}>
                                            <Text style={styles.detailsCaptionText}>
                                                {ratings.total} {(ratings.total === 1) ? 'opinión' : 'opiniones'}
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
                            {(newFavorite === true) ? useIcons('HeartFocused', 24, 24) : useIcons('Heart', 24, 24)}
                            <View style={styles.smallMarginStart}>
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
                            {(newService === true) ? useIcons('BookmarkFavorite', 24, 24) : useIcons('Bookmark', 24, 24)}
                            <View style={styles.smallMarginStart}>
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
                        {useIcons('NumberOne', 36, 36)}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(2)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 2 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        {useIcons('NumberTwo', 36, 36)}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(3)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 3 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        {useIcons('NumberThree', 36, 36)}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(4)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 4 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        {useIcons('NumberFour', 36, 36)}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => handleRate(5)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === 5 ? '#DEDEDE' : '#FFFFFF' }
                        ]}
                    >
                        {useIcons('NumberFive', 36, 36)}
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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <View style={styles.reviewsModal}>
                        <View style={{ ...styles.mediumMarginTop, marginHorizontal: 21 }}>
                            <View style={styles.flexDirectionRow}>
                                <View style={styles.flexOne}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        {useIcons('Down', 24, 24)}
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
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default RateScreen;