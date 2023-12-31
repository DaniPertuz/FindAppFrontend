import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-root-toast';

import { AuthContext, PlacesContext, UsersContext } from '../../../context';
import StatusBarComponent from '../../../components/StatusBarComponent';
import { useIcons } from '../../../hooks';
import { IRatingList, IUser, roles } from '../../../interfaces';
import { RootStackParams } from '../../../navigation';
import LoadingScreen from '../../LoadingScreen';

import { styles } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'EditProfileScreen'> { }

const EditProfileScreen = ({ navigation }: Props) => {
    const isFocused = useIsFocused();

    const [response, setResponse] = useState<ImagePickerResponse>();
    const [userDB, setUserDB] = useState<IUser>({
        role: roles.CLIENT,
        name: '',
        email: '',
        password: '',
        status: false,
        photo: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [totalHistory, setTotalHistory] = useState<number>(0);
    const [totalFavorites, setTotalFavorites] = useState<number>(0);
    const [userRatings, setUserRatings] = useState<IRatingList>({ total: 0, rates: [] });

    const { logOut, user } = useContext(AuthContext);
    const { getFavorites, getRatingsByUser, getHistorical } = useContext(PlacesContext);
    const { updateUser, updatePhoto, loadUserByID } = useContext(UsersContext);

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserDB(usr);
    };

    const addPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8
        }, (response) => {
            if (!response || response.didCancel || !response.assets) return;

            let imageUri = response.assets[0]?.uri || '';
            setSelectedImage(imageUri);
            setResponse(response);
        });
    };

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8
        }, (response) => {
            if (!response || response.didCancel || !response.assets) return;

            let imageUri = response.assets[0]?.uri || '';
            setSelectedImage(imageUri);
            setResponse(response);
        });
    };

    const onUpdate = async () => {
        if (response && selectedImage !== '') {
            const photoURL = await updatePhoto(response, userDB._id!);
            updateUser(userDB._id!, userDB.name!, photoURL);
            Toast.show('Foto actualizada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
        }
    };

    const handleBackButtonClick = () => {
        setModalVisible(false);
        return true;
    };

    useEffect(() => {
        if (isFocused) {
            load();
        }
    }, [isFocused, userDB]);

    useEffect(() => {
        let mounted = true;
        getHistorical(user?._id!).then((data) => {
            if (mounted) {
                setTotalHistory(data.total);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        getFavorites(user?._id!).then((data) => {
            if (mounted) {
                setTotalFavorites(data.total);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        getRatingsByUser(user?._id!).then((data) => {
            if (mounted) {
                setUserRatings(data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        const navFocusListener = navigation.addListener('blur', () => {
            handleBackButtonClick();
        });

        return navFocusListener;
    }, []);

    return (
        <View style={styles.mainBackground}>
            {(!totalHistory || !totalFavorites || !userRatings)
                ? <LoadingScreen />
                :
                <KeyboardAvoidingView style={{ ...styles.flexOne }} behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
                    <StatusBarComponent color='rgba(104, 110, 222, 0)' theme='dark-content' />
                    <ScrollView style={styles.editProfileScrollView} contentContainerStyle={styles.justifyContentCenter}>
                        <View style={styles.flexDirectionRowJustifyCenter}>
                            <Image
                                source={(!userDB || userDB.photo === '')
                                    ? require('../../../assets/FA_Color.png')
                                    : (response?.assets && response.assets[0].uri !== '')
                                        ? { uri: response.assets[0].uri }
                                        : { uri: userDB.photo }}
                                style={styles.profileAvatar}
                            />
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setModalVisible(true)}
                                style={styles.editProfilePhotoButton}
                            >
                                {useIcons('Camera', 30, 30)}
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
                                {useIcons('Edit', 20, 20)}
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
                                        <Text style={styles.largeItemText}>{totalFavorites} lugares</Text>
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
                                        <Text style={styles.largeItemText}>{userRatings.total} lugares</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.grayLabel}>Nombre de usuario</Text>
                            <View style={{ ...styles.flexDirectionRow, marginTop: 4 }}>
                                <View style={styles.editProfileIconMargins}>
                                    {useIcons('User', 18, 18)}
                                </View>
                                <Text style={styles.editProfileMediumText}>{userDB?.name}</Text>
                            </View>
                        </View>
                        <View style={styles.mediumLargeMarginTop}>
                            <Text style={styles.grayLabel}>Email</Text>
                            <View style={{ ...styles.flexDirectionRow, marginTop: 4 }}>
                                <View style={styles.editProfileIconMargins}>
                                    {useIcons('Envelope', 18, 18)}
                                </View>
                                <Text style={styles.editProfileMediumText}>{userDB?.email}</Text>
                            </View>
                        </View>
                        <View style={styles.mediumLargeMarginTop}>
                            <View style={styles.alignItemsBaseline}>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    style={styles.alignItemsBaseline}
                                    onPress={logOut}
                                >
                                    <Text style={styles.logOutText}>Cerrar sesión</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity style={styles.flexOne} activeOpacity={1.0} onPress={() => setModalVisible(false)}>
                    <View style={styles.editProfileModal}>
                        <View style={styles.editProfileModalBackButtonContainer}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                style={styles.modalBackButtonMargins}
                                onPress={() => setModalVisible(false)}
                            >
                                {useIcons('Down', 30, 30)}
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
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default EditProfileScreen;