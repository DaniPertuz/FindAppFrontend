import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext, PermissionsContext } from '../context';

import Location from '../assets/location.svg';

import { styles } from '../theme/AppTheme';

const PermissionsScreen = () => {

    const { askLocationPermission } = useContext(PermissionsContext);
    const { logOut } = useContext(AuthContext);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 60 }}
        >
            <View style={{ alignItems: 'center', marginBottom: 23 }}>
                <Location height={73} width={73} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', letterSpacing: -0.36, textAlign: 'center' }}>Es necesario el acceso al GPS para utilizar esta aplicación</Text>
                </View>
            </View>
            <View style={{ marginTop: 23 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ backgroundColor: '#207CFD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }}
                    onPress={askLocationPermission}
                >
                    <Text style={{ color: 'rgba(250, 250, 250, 0.98)', fontSize: 16, fontWeight: '500', lineHeight: 22, letterSpacing: -0.32 }}>Administrar permisos</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, justifyContent: 'center' }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={logOut}
                >
                    <Text style={{ color: '#207CFD', fontSize: 13, fontWeight: '500', lineHeight: 15, letterSpacing: -0.26 }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PermissionsScreen;