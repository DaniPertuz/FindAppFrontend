import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PermissionsContext } from '../context';
import { styles } from '../theme/AppTheme';

const PermissionsScreen = () => {

    const { askLocationPermission } = useContext(PermissionsContext);

    return (
        <View
            style={styles.center}
        >
            <Text style={styles.blackPrimaryFontStyle}>Es necesario el uso del GPS para usar esta aplicación</Text>
            <View style={{ ...styles.buttonContainer, backgroundColor: '#FFFFFF' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonSearch}
                    onPress={askLocationPermission}
                >
                    <Text style={styles.buttonSearchText}>Permisos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PermissionsScreen;