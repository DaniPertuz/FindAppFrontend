import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import { RootStackParams } from '../../../navigation';
import { useForm } from '../../../hooks/useForm';

import { styles } from '../../../theme/AppTheme';
import { UsersContext } from '../../../context';
import { IUser } from '../../../interfaces';

interface Props extends StackScreenProps<RootStackParams, 'UpdateProfileScreen'> { }

const UpdateProfileScreen = ({ navigation, route }: Props) => {

    const { user } = route.params;

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { loadUserByID, updateUser } = useContext(UsersContext);

    const [userDB, setUserDB] = useState<IUser>(user);
    const [display, setDisplay] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(true);
    const [eyeIcon] = useState('../../../assets/eye-closed.png');
    const [eyeIconConfirm] = useState('../../../assets/eye-closed.png');

    useEffect(() => {
        load();
    }, [user]);

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserDB(usr);
    };

    const { name, password, confirmPassword, onChange } = useForm({
        name: userDB.name,
        password: '',
        confirmPassword: ''
    });

    const handlePasswordVisibility = () => {
        if (eyeIcon === '../../../assets/eye-closed.png') {
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeIcon === '../../../assets/eye.png') {
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleConfirmPasswordVisibility = () => {
        if (eyeIconConfirm === '../../../assets/eye-closed.png') {
            setPasswordConfirmVisibility(!passwordConfirmVisibility);
        } else if (eyeIconConfirm === '../../../assets/eye.png') {
            setPasswordConfirmVisibility(!passwordConfirmVisibility);
        }
    };

    const onUpdate = async () => {
        if (password !== confirmPassword) {
            setDisplay(true);
            return;
        }

        setDisplay(false);
        updateUser(user?._id!, name, user.email, password);
        Toast.show((name === user.name) ? 'Tu información no fue modificada' : 'Información actualizada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
        navigation.pop();
    };

    return (
        <View style={{ backgroundColor: 'rgba(104, 110, 222, 0.1)', minHeight: '100%' }}>
            <View style={{ flexDirection: 'row', marginTop: 53 }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={{ flex: 1, marginStart: 15 }}
                    onPress={() => navigator.goBack()}
                >
                    <Image source={require('../../../assets/back.png')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flex: 10, marginEnd: 40, marginTop: 5 }}>
                    <Text style={{ color: '#1F273A', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Editar perfil</Text>
                </View>
            </View>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                    style={{ paddingHorizontal: 40 }}
                >
                    <View style={{ marginTop: 37 }}>
                        <Text style={{ color: '#081023', fontSize: 12, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Usuario</Text>
                        <View style={styles.updateInputFieldContainer}>
                            <Image
                                source={require('../../../assets/user.png')}
                                style={{ height: 25, width: 25, marginStart: 16, marginEnd: 10 }}
                            />
                            <TextInput
                                placeholder='Ingresa tu usuario o correo'
                                placeholderTextColor='#9A9A9A'
                                keyboardType='default'
                                style={[
                                    styles.inputField,
                                    (Platform.OS === 'ios') && styles.inputFieldIOS
                                ]}
                                selectionColor='#9A9A9A'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value, 'name')}
                                value={name}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#081023', fontSize: 12, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Email</Text>
                        <View style={styles.disabledInputFieldContainer}>
                            <Image
                                source={require('../../../assets/envelope.png')}
                                style={{ height: 25, width: 25, marginStart: 16, marginEnd: 10 }}
                            />
                            <TextInput
                                placeholder={user.email}
                                placeholderTextColor='#9A9A9A'
                                editable={false}
                                selectTextOnFocus={false}
                                style={[
                                    styles.inputField,
                                    (Platform.OS === 'ios') && styles.inputFieldIOS
                                ]}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#081023', fontSize: 12, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Contraseña</Text>
                        <View style={styles.updateInputFieldContainer}>
                            <Image
                                source={require('../../../assets/lock.png')}
                                style={{ flex: 0.4, height: 25, width: 25, marginStart: 16, marginEnd: 10 }}
                            />
                            <TextInput
                                placeholderTextColor='#9A9A9A'
                                secureTextEntry={passwordVisibility}
                                style={[
                                    styles.inputField,
                                    { flex: 3, marginHorizontal: 10 },
                                    (Platform.OS === 'ios') && styles.inputFieldIOS
                                ]}
                                selectionColor='#9A9A9A'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value, 'password')}
                                value={password}
                            />
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={handlePasswordVisibility}
                            >
                                <Image
                                    source={(passwordVisibility === false) ? require('../../../assets/eye.png') : require('../../../assets/eye-closed.png')}
                                    style={{ flex: 0.2, height: 20, width: 28, marginEnd: 16 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#081023', fontSize: 12, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}>Repetir contraseña</Text>
                        <View style={styles.updateInputFieldContainer}>
                            <Image
                                source={require('../../../assets/lock.png')}
                                style={{ flex: 0.4, height: 25, width: 25, marginStart: 16, marginEnd: 10 }}
                            />
                            <TextInput
                                placeholderTextColor='#9A9A9A'
                                secureTextEntry={passwordConfirmVisibility}
                                style={[
                                    styles.inputField,
                                    { flex: 3, marginHorizontal: 10 },
                                    (Platform.OS === 'ios') && styles.inputFieldIOS
                                ]}
                                selectionColor='#9A9A9A'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value, 'confirmPassword')}
                                value={confirmPassword}
                            />
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={handleConfirmPasswordVisibility}
                            >
                                <Image
                                    source={(passwordConfirmVisibility === false) ? require('../../../assets/eye.png') : require('../../../assets/eye-closed.png')}
                                    style={{ flex: 0.2, height: 20, width: 28, marginEnd: 16 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(display === true) &&
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Image
                                source={require('../../../assets/warning.png')}
                                style={{ height: 15, width: 15, marginTop: 4, marginEnd: 5 }}
                            />
                            <Text
                                style={{ color: '#D13232', fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: -0.24 }}
                            >
                                Contraseñas no coinciden
                            </Text>
                        </View>
                    }
                    <View style={{ marginTop: (display === true) ? 128 : 153 }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.button}
                            onPress={onUpdate}
                        >
                            <Text style={styles.buttonText}>Guardar cambios</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

export default UpdateProfileScreen;