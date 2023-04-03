import React, { useContext, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { AuthContext } from '../../context';
import { loginStyles, styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<any, any> { };

const MainPictureScreen = ({ navigation }: Props) => {

    const { uploadImage, user } = useContext(AuthContext);

    const [tempUri, setTempUri] = useState<string>('');

    const addPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            setTempUri(resp.assets![0].uri);
            uploadImage(resp, user?._id!);
        });
    };

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            setTempUri(resp.assets![0].uri);
            uploadImage(resp, user?._id!);
        });
    };

    return (
        <>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6'
                }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View
                    style={loginStyles.formContainer}
                >
                    <Text
                        style={styles.subtitle}
                    >
                        ¿Deseas agregar tu foto de perfil?
                    </Text>
                    {
                        (tempUri !== '') && (
                            <Image
                                source={{ uri: tempUri }}
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 25,
                                    height: 170,
                                    width: '40%'
                                }}
                            />
                        )
                    }
                    <View
                        style={loginStyles.buttonImagesContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={addPhoto}
                        >
                            <Text style={loginStyles.buttonText}>Tomar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={addGalleryImage}
                        >
                            <Text style={loginStyles.buttonText}>Galería</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={loginStyles.decisionContainer}
                >
                    <TouchableOpacity
                        onPress={() => navigation.replace('MainScreen')}
                        activeOpacity={0.8}
                        style={loginStyles.buttonSkip}
                    >
                        <Text style={loginStyles.buttonText}>
                            {(tempUri !== '')
                                ?
                                'Continuar'
                                :
                                'Omitir'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default MainPictureScreen;