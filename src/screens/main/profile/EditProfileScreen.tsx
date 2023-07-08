import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-root-toast';

import { AuthContext, UsersContext } from '../../../context';
import { RootStackParams } from '../../../navigation';

import Camera from '../../../assets/camera.svg';
import Down from '../../../assets/down.svg';
import Edit from '../../../assets/edit.svg';
import Envelope from '../../../assets/envelope.svg';
import HeartFavorite from '../../../assets/heart-favorite.svg';
import History from '../../../assets/history.svg';
import Star from '../../../assets/star.svg';
import User from '../../../assets/user.svg';

import { styles } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'EditProfileScreen'> { }

const EditProfileScreen = ({ navigation }: Props) => {
    const { top } = useSafeAreaInsets();
    const isFocused = useIsFocused();

    const [response, setResponse] = useState<any>(null);
    const [userDB, setUserDB] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { logOut, user } = useContext(AuthContext);
    const { updateUser, updatePhoto, loadUserByID } = useContext(UsersContext);

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserDB(usr);
    };

    useEffect(() => {
        if (isFocused === true) {
            load();
        }
    }, [isFocused, userDB]);

    const addPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8
        }, setResponse);
    };

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8
        }, setResponse);
    };

    const onUpdate = async () => {
        if (response && response.assets[0].uri !== '') {
            const photoURL = await updatePhoto(response, user?._id!);
            updateUser(user?._id!, user?.name!, photoURL);
            Toast.show('Foto actualizada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
        }
    };

    const updateMainPhoto = () => {
        setModalVisible(true);
    };

    const handleBackButtonClick = () => {
        setModalVisible(false);
        return true;
    };

    useEffect(() => {
        const navFocusListener = navigation.addListener('blur', () => {
            handleBackButtonClick();
        });

        return navFocusListener;
    }, []);

    return (
        <>
            <KeyboardAvoidingView
                style={{ ...styles.flexOne, paddingTop: (Platform.OS === 'ios') ? top : top + 20 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.editProfileScrollView}
                    contentContainerStyle={styles.justifyContentCenter}>
                    <View style={styles.flexDirectionRowJustifyCenter}>
                        <Image
                            source={(!user || user.photo === '')
                                ? require('../../../assets/FA_Color.png')
                                : (response?.assets && response.assets[0].uri !== '')
                                    ? { uri: response.assets[0].uri }
                                    : { uri: user.photo }}
                            style={styles.profileAvatar}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={updateMainPhoto}
                            style={styles.editProfilePhotoButton}
                        >
                            <Camera height={30} width={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.flexDirectionRowJustifyCenter, ...styles.mediumMarginTop }}>
                        <Text style={styles.editProfileUserNameText}>
                            {userDB?.name}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.navigate('UpdateProfileScreen', { user: userDB }); }}
                            style={styles.editProfileButton}
                        >
                            <Edit height={20} width={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.flexDirectionRowJustifyCenter, ...styles.tinyMarginTop }}>
                        <Text style={styles.placeholderText}>{userDB?.email}</Text>
                    </View>
                    <View style={{ ...styles.flexDirectionRowJustifyAround, ...styles.mediumMarginTop }}>
                        <View style={styles.largeItem}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                style={{ ...styles.alignItemsCenter, ...styles.extraSmallMarginTop }}
                                onPress={() => navigation.navigate('HistoryScreen')}
                            >
                                <History height={33} width={33} />
                                <View style={styles.smallMediumMarginTop}>
                                    <Text style={styles.plainSmallText}>Historial</Text>
                                </View>
                                <View style={styles.tinyMarginTop}>
                                    <Text style={styles.largeItemText}>23 viajes</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.largeItem}>
                            <View style={styles.extraSmallMarginTop}>
                                <HeartFavorite height={33} width={33} />
                            </View>
                            <View style={styles.smallMediumMarginTop}>
                                <Text style={styles.plainSmallText}>Favoritos</Text>
                            </View>
                            <View style={styles.tinyMarginTop}>
                                <Text style={styles.largeItemText}>12 lugares</Text>
                            </View>
                        </View>
                        <View style={styles.largeItem}>
                            <View style={styles.extraSmallMarginTop}>
                                <Star height={33} width={33} />
                            </View>
                            <View style={styles.smallMediumMarginTop}>
                                <Text style={styles.plainSmallText}>Calificaciones</Text>
                            </View>
                            <View style={styles.tinyMarginTop}>
                                <Text style={styles.largeItemText}>6 lugares</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.grayLabel}>Nombre de usuario</Text>
                        <View style={{ ...styles.flexDirectionRow, marginTop: 4 }}>
                            <User height={18} width={18} style={styles.editProfileIconMargins} />
                            <Text style={styles.editProfileMediumText}>{userDB?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.mediumLargeMarginTop}>
                        <Text style={styles.grayLabel}>Email</Text>
                        <View style={{ ...styles.flexDirectionRow, marginTop: 4 }}>
                            <Envelope height={18} width={18} style={styles.editProfileIconMargins} />
                            <Text style={styles.editProfileMediumText}>{userDB?.email}</Text>
                        </View>
                    </View>
                    <View style={styles.mediumLargeMarginTop}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={logOut}
                        >
                            <Text style={styles.logOutText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.editProfileModal}>
                    <View style={styles.editProfileModalBackButtonContainer}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            style={styles.modalBackButtonMargins}
                            onPress={() => setModalVisible(false)}
                        >
                            <Down height={30} width={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.flexDirectionRowJustifyAround, marginHorizontal: 10 }}>
                        <View style={styles.alignItemsCenter}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => { addGalleryImage(); setModalVisible(false); onUpdate(); }}
                                style={styles.editProfileGalleryButton}
                            >
                                <Image source={require('../../../assets/gallery.png')} style={{ height: 25, width: 25 }} />
                            </TouchableOpacity>
                            <Text>Galería</Text>
                        </View>
                        <View style={styles.alignItemsCenter}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => { addPhoto(); setModalVisible(false); onUpdate(); }}
                                style={styles.editProfileGalleryButton}
                            >
                                <Image source={require('../../../assets/camera.png')} style={{ height: 25, width: 25 }} />
                            </TouchableOpacity>
                            <Text>Cámara</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default EditProfileScreen;