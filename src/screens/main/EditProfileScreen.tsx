import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useForm } from '../../hooks/useForm';
import { AuthContext, UsersContext } from '../../context';
import { editStyles, loginStyles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<any, any> { }

const EditProfileScreen = ({ navigation }: Props) => {

    const [response, setResponse] = useState<any>(null);
    const { user, uploadImage } = useContext(AuthContext);
    const { loadUserByID, updateUser } = useContext(UsersContext);
    const { top } = useSafeAreaInsets();

    const { name, email, password, passwordRep, onChange } = useForm({
        name: user!.name,
        email: user!.email,
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

    const onUpdate = () => {
        Keyboard.dismiss();
        let photo

        if (response && response.assets[0].uri !== '') {
            uploadImage(response, user!._id!)
            .then(data => {
                console.log(data);
                photo = data;
            });
        }

        if (password !== passwordRep) {
            Alert.alert('Error', 'Contraseñas no coinciden', [
                { text: 'OK' }
            ]);
            return;
        }

        updateUser(user!._id!, name, email, password, photo as unknown as string);
        Alert.alert('', 'Información actualizada', [
            { text: 'OK', onPress: () => navigation.navigate('MainScreen') }
        ]);
    };

    const updateMainPhoto = () => {
        Alert.alert('Editar foto', '', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Galería',
                onPress: addGalleryImage
            },
            {
                text: 'Foto',
                onPress: addPhoto
            }
        ]);
    };

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                marginTop: top
            }}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <ScrollView
                style={loginStyles.formContainer}
                contentContainerStyle={{
                    justifyContent: 'center'
                }}>
                <Text style={editStyles.title}>
                    Editar perfil
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={updateMainPhoto}
                >
                    <Image
                        source={(!user || user.photo === '')
                            ? require('../../assets/placeholder.png')
                            : (response && response.assets[0].uri !== '')
                                ? { uri: response.assets[0].uri }
                                : { uri: user.photo }}
                        style={{
                            alignSelf: 'center',
                            marginTop: 25,
                            height: 170,
                            width: '40%'
                        }}
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
    );
};

export default EditProfileScreen;