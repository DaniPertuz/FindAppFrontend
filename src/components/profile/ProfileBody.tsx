import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context';
import { useIcons } from '../../hooks';
import { IUser } from '../../interfaces';
import { styles } from '../../theme/AppTheme';

interface Props {
    userDB: IUser;
}

const ProfileBody = ({ userDB }: Props) => {

    const { logOut } = useContext(AuthContext);

    return (
        <>
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
        </>
    );
};

export default ProfileBody;