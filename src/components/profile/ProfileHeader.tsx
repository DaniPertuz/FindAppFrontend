import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';

import { useIcons } from '../../hooks';
import { IUser } from '../../interfaces';
import { RootStackParams } from '../../navigation';

import { styles } from '../../theme/AppTheme';

interface Props {
    userDB: IUser;
    response?: ImagePickerResponse;
    navigation: StackNavigationProp<RootStackParams, "EditProfileScreen">;
    handleModalVisible: (value: boolean) => void;
}

const ProfileHeader = ({ userDB, response, navigation, handleModalVisible }: Props) => {
  return (
    <>
      <View style={styles.flexDirectionRowJustifyCenter}>
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
          onPress={() => handleModalVisible(true)}
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
    </>
  );
};

export default ProfileHeader;