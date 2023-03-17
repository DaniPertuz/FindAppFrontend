import React, { useContext, useEffect, useRef, useState } from 'react';

import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

import { useForm } from '../../hooks/useForm';
import { AuthContext, UsersContext } from '../../context';
import { editStyles, loginStyles, styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<any, any> { }

const EditProfileScreen = ({ navigation }: Props) => {
    const { top } = useSafeAreaInsets();

    const [response, setResponse] = useState<any>(null);
    const { user } = useContext(AuthContext);
    const { updateUser, updatePhoto } = useContext(UsersContext);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const { name, email, password, passwordRep, onChange } = useForm({
        name: user?.name!,
        email: user?.email!,
        password: '',
        passwordRep: ''
    });

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
                style={{...styles.profileScreenContainer, marginTop: top }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <ScrollView
                    style={loginStyles.formContainer}
                    contentContainerStyle={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={updateMainPhoto}
                    >
                        <Image
                            source={(!user || user.photo === '')
                                ? require('../../assets/placeholder.png')
                                : (response?.assets && response.assets[0].uri !== '')
                                    ? { uri: response.assets[0].uri }
                                    : { uri: user.photo }}
                            style={styles.profileAvatar}
                        />
                    </TouchableOpacity>
                    <Text style={editStyles.label}>
                        Nombre:
                    </Text>
                    <TextInput
                        underlineColorAndroid='#5856D6'
                        style={[
                            editStyles.inputField,
                            (Platform.OS === 'ios') && editStyles.inputFieldIOS
                        ]}
                        selectionColor='#5856D6'
                        autoCapitalize='words'
                        autoCorrect={false}
                        onSubmitEditing={onUpdate}
                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                    />
                    <Text style={editStyles.label}>
                        Email:
                    </Text>
                    <TextInput
                        keyboardType='email-address'
                        underlineColorAndroid='#5856D6'
                        style={[
                            editStyles.inputField,
                            (Platform.OS === 'ios') && editStyles.inputFieldIOS
                        ]}
                        selectionColor='#5856D6'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onUpdate}
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                    />
                    <Text style={editStyles.label}>
                        Nueva contraseña:
                    </Text>
                    <TextInput
                        underlineColorAndroid='#5856D6'
                        secureTextEntry
                        style={[
                            editStyles.inputField,
                            (Platform.OS === 'ios') && editStyles.inputFieldIOS
                        ]}
                        selectionColor='#5856D6'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onUpdate}
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                    />
                    <Text style={editStyles.label}>
                        Repita contraseña:
                    </Text>
                    <TextInput
                        underlineColorAndroid='#5856D6'
                        secureTextEntry
                        style={[
                            editStyles.inputField,
                            (Platform.OS === 'ios') && editStyles.inputFieldIOS
                        ]}
                        selectionColor='#5856D6'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onUpdate}
                        onChangeText={(value) => onChange(value, 'passwordRep')}
                        value={passwordRep}
                    />

                    <View style={editStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={editStyles.button}
                            onPress={onUpdate}
                        >
                            <Text style={editStyles.buttonText}>Guardar</Text>
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
                            <Icon
                                color='#000000'
                                name='close-circle-outline'
                                size={30}
                            />
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
                        <Icon
                            color='#000000'
                            name='camera-outline'
                            size={30}
                            style={{ alignSelf: 'center' }}
                        />
                        <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>
                            Foto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { addGalleryImage(); bottomSheetRef.current?.close(); }}
                    >
                        <Icon
                            color='#000000'
                            name='image-outline'
                            size={30}
                            style={{ alignSelf: 'center' }}
                        />
                        <Text style={styles.bottomSheetDetailsPrimaryFontStyle}>Galería</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </>
    );
};

export default EditProfileScreen;