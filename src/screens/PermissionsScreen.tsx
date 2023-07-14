import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext, PermissionsContext } from '../context';

import { useIcons } from '../hooks/useIcons';

import { styles } from '../theme/AppTheme';

const PermissionsScreen = () => {

    const { askLocationPermission } = useContext(PermissionsContext);
    const { logOut } = useContext(AuthContext);

    return (
        <View
            style={{ ...styles.flexOneAlignJustifyCenter, paddingHorizontal: 60 }}
        >
            <View style={{ ...styles.alignItemsCenter, marginBottom: 23 }}>
                {useIcons('Location', 73, 73)}
                <View style={styles.alignItemsJustifyContentCenter}>
                    <Text style={styles.infoText}>Es necesario el acceso al GPS para utilizar esta aplicación</Text>
                </View>
            </View>
            <View style={styles.mediumLargeMarginTop}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.askLocationButtonContainer}
                    onPress={askLocationPermission}
                >
                    <Text style={styles.buttonText}>Administrar permisos</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, ...styles.justifyContentCenter }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={logOut}
                >
                    <Text style={styles.detailsCaptionText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PermissionsScreen;