import React, { useContext, useEffect, useRef, useState } from 'react';

import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BottomSheet from '@gorhom/bottom-sheet';

import { useForm } from '../../hooks/useForm';
import { AuthContext, UsersContext } from '../../context';
import { editStyles, loginStyles, styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<any, any> { }

const EditProfileScreen = ({ navigation }: Props) => {
    const { top } = useSafeAreaInsets();

    const [response, setResponse] = useState<any>(null);
    const [userDB, setUserDB] = useState<any>(null);
    const { user } = useContext(AuthContext);
    const { updateUser, updatePhoto, loadUserByID } = useContext(UsersContext);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const { name, email, password, passwordRep, onChange } = useForm({
        name: user?.name!,
        email: user?.email!,
        password: '',
        passwordRep: ''
    });

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserDB(usr);
    };

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
        Keyboard.dismiss();

        if (password !== passwordRep) {
            Alert.alert('Error', 'Contraseñas no coinciden', [
                { text: 'OK' }
            ]);
            return;
        }

        let photoURL;
        if (response && response.assets[0].uri !== '') {
            photoURL = await updatePhoto(response, user?._id!);
        }

        if (photoURL === null) {
            updateUser(user?._id!, name, email, password);
        }

        updateUser(user!._id!, name, email, password, photoURL);

        Alert.alert('', 'Información actualizada', [
            { text: 'OK', onPress: () => navigation.navigate('MainScreen') }
        ]);
    };

    const updateMainPhoto = () => {
        bottomSheetRef.current?.expand();
    };

    const handleBackButtonClick = () => {
        bottomSheetRef.current?.close();
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
                            source={(!userDB || userDB.photo === '')
                                ? require('../../assets/FA_Color.png')
                                : (response?.assets && response.assets[0].uri !== '')
                                    ? { uri: response.assets[0].uri }
                                    : { uri: userDB.photo }}
                            style={styles.profileAvatar}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={updateMainPhoto}
                            style={{ backgroundColor: '#FFFFFF', borderRadius: 30, marginStart: -40, marginTop: 125, maxHeight: 40, padding: 5 }}
                        >
                            <Image source={require('../../assets/camera.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#081023', fontSize: 24, fontWeight: '500', lineHeight: 28, letterSpacing: -0.48 }}>
                            {name}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ backgroundColor: '#FFFFFF', borderRadius: 30, padding: 5, marginStart: 6 }}
                        >
                            <Image source={require('../../assets/edit.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6 }}>
                        <Text style={{ color: '#858585', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>{email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 8, minWidth: 90, paddingHorizontal: 10, paddingVertical: 8 }}>
                            <View style={{ marginTop: 8 }}>
                                <Image source={require('../../assets/history.png')} style={{ minHeight: 33, minWidth: 33 }} />
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
                                <Image source={require('../../assets/heart-favorite.png')} style={{ minHeight: 33, minWidth: 33 }} />
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
                                <Image source={require('../../assets/star.png')} style={{ minHeight: 33, minWidth: 33 }} />
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
                            <Image source={require('../../assets/user.png')} style={{ height: 18, marginEnd: 6, marginTop: 2, width: 18 }} />
                            <Text style={{ color: '#081023', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>{name}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 23 }}>
                        <Text style={{ color: '#858585', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Email</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <Image source={require('../../assets/envelope.png')} style={{ height: 18, marginEnd: 6, marginTop: 2, width: 18 }} />
                            <Text style={{ color: '#081023', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.28 }}>{email}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 23 }}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                        >
                            <Text style={{ color: '#D13232', fontSize: 16, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={[1, 130]}
            >
                <View
                    style={styles.profileBottomSheet}
                >
                    <View
                        style={{ alignItems: 'flex-end' }}
                    >
                        <TouchableOpacity
                            onPress={() => bottomSheetRef.current?.close()}
                        >
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginHorizontal: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={() => { addPhoto(); bottomSheetRef.current?.close(); }}
                    >
                        <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>
                            Foto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { addGalleryImage(); bottomSheetRef.current?.close(); }}
                    >
                        <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>Galería</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </>
    );
};

export default EditProfileScreen;