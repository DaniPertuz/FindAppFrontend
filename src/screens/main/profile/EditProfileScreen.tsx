import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-root-toast';

import { AuthContext, UsersContext } from '../../../context';
import { RootStackParams } from '../../../navigation';

import { loginStyles, styles } from '../../../theme/AppTheme';

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
                style={{ ...styles.profileScreenContainer, marginTop: top }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <ScrollView
                    style={loginStyles.formContainer}
                    contentContainerStyle={{ justifyContent: 'center' }}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center' }}
                    >
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
                            style={{ backgroundColor: '#FFFFFF', borderRadius: 30, marginStart: -40, marginTop: 125, maxHeight: 40, padding: 5 }}
                        >
                            <Image source={require('../../../assets/camera.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#081023', fontSize: 24, fontWeight: '500', lineHeight: 28, letterSpacing: -0.48 }}>
                            {userDB?.name}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.navigate('UpdateProfileScreen', { user: userDB }); }}
                            style={{ backgroundColor: '#FFFFFF', borderRadius: 30, padding: 5, marginStart: 6 }}
                        >
                            <Image source={require('../../../assets/edit.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6 }}>
                        <Text style={{ color: '#858585', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>{userDB?.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 8, minWidth: 90, paddingHorizontal: 10, paddingVertical: 8 }}>
                            <View style={{ marginTop: 8 }}>
                                <Image source={require('../../../assets/history.png')} style={{ minHeight: 33, minWidth: 33 }} />
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Historial</Text>
                            </View>
                            <View style={{ marginTop: 6 }}>
                                <Text style={{ color: '#0D0D0D', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>23 viajes</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 8, minWidth: 90, paddingHorizontal: 10, paddingVertical: 8 }}>
                            <View style={{ marginTop: 8 }}>
                                <Image source={require('../../../assets/heart-favorite.png')} style={{ minHeight: 33, minWidth: 33 }} />
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Favoritos</Text>
                            </View>
                            <View style={{ marginTop: 6 }}>
                                <Text style={{ color: '#0D0D0D', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>12 lugares</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 8, minWidth: 90, paddingHorizontal: 10, paddingVertical: 8 }}>
                            <View style={{ marginTop: 8 }}>
                                <Image source={require('../../../assets/star.png')} style={{ minHeight: 33, minWidth: 33 }} />
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ color: '#081023', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>Calificaciones</Text>
                            </View>
                            <View style={{ marginTop: 6 }}>
                                <Text style={{ color: '#0D0D0D', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>6 lugares</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#858585', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Nombre de usuario</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <Image source={require('../../../assets/user.png')} style={{ height: 18, marginEnd: 6, marginTop: 2, width: 18 }} />
                            <Text style={{ color: '#081023', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>{userDB?.name}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 23 }}>
                        <Text style={{ color: '#858585', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Email</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <Image source={require('../../../assets/envelope.png')} style={{ height: 18, marginEnd: 6, marginTop: 2, width: 18 }} />
                            <Text style={{ color: '#081023', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>{userDB?.email}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 23 }}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={logOut}
                        >
                            <Text style={{ color: '#D13232', fontSize: 16, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>Cerrar sesión</Text>
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
                <View
                    style={{
                        backgroundColor: 'rgba(250, 250, 250, 0.98)',
                        height: '20%',
                        top: '80%',
                        borderTopEndRadius: 10,
                        borderTopStartRadius: 10,
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
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginBottom: 10
                    }}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            style={{ marginEnd: 10, marginTop: 10 }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Image source={require('../../../assets/close.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginHorizontal: 10
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => { addGalleryImage(); setModalVisible(false); onUpdate(); }}
                                style={{ borderColor: 'rgba(133, 133, 133, 0.25)', borderRadius: 30, borderWidth: 1, padding: 10 }}
                            >
                                <Image source={require('../../../assets/gallery.png')} style={{ height: 25, width: 25 }} />
                            </TouchableOpacity>
                            <Text>Galería</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => { addPhoto(); setModalVisible(false); onUpdate(); }}
                                style={{ borderColor: 'rgba(133, 133, 133, 0.25)', borderRadius: 30, borderWidth: 1, padding: 10 }}
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