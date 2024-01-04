import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-root-toast';

import { UsersContext } from '../../../context';
import { ProfileBody, ProfileHeader, ProfileSubheader } from '../../../components/profile';
import StatusBarComponent from '../../../components/StatusBarComponent';
import { useIcons, useProfileData } from '../../../hooks';
import { RootStackParams } from '../../../navigation';
import LoadingScreen from '../../LoadingScreen';

import { styles } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'EditProfileScreen'> { }

const EditProfileScreen = ({ navigation }: Props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [response, setResponse] = useState<ImagePickerResponse>();
    const [selectedImage, setSelectedImage] = useState('');

    const { updateUser, updatePhoto } = useContext(UsersContext);

    const { totalFavorites, totalHistory, userDB, userRatings } = useProfileData();    

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

    const handleModalVisible = (visible: boolean) => {
        setModalVisible(visible);
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
        <View style={styles.mainBackground}>
            {(!totalHistory || !totalFavorites || !userRatings)
                ? <LoadingScreen />
                :
                <KeyboardAvoidingView style={{ ...styles.flexOne }} behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
                    <StatusBarComponent color='rgba(104, 110, 222, 0)' theme='dark-content' />
                    <View style={styles.editProfileContainer}>
                        <ProfileHeader userDB={userDB} response={response} navigation={navigation} handleModalVisible={handleModalVisible} />
                        <ProfileSubheader navigation={navigation} totalFavorites={totalFavorites} totalHistory={totalHistory} userRatings={userRatings} />
                        <ProfileBody userDB={userDB} />
                    </View>
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