import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import { RootStackParams } from '../../../navigation';
import { useForm } from '../../../hooks/useForm';
import { useIcons } from '../../../hooks/useIcons';

import { UsersContext } from '../../../context';
import { IUser } from '../../../interfaces';

import { styles } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'UpdateProfileScreen'> { }

const UpdateProfileScreen = ({ route }: Props) => {

    const { user } = route.params;

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { loadUserByID, updateUser, updateUserPassword } = useContext(UsersContext);

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

        if (password === confirmPassword && (password.length !== 0 && confirmPassword.length !== 0)) {
            setDisplay(false);
            updateUserPassword(user.email, password);
            Toast.show('Contraseña actualizada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
            navigator.goBack();
        }

        setDisplay(false);
        updateUser(user?._id!, name);
        Toast.show((name === user.name) ? 'Tu información no fue modificada' : 'Información actualizada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
        navigator.goBack();
    };

    return (
        <View style={styles.updateProfileBackground}>
            <View style={{ ...styles.flexDirectionRow, marginTop: 53 }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={{ ...styles.flexOne, marginStart: 15, marginTop: 5 }}
                    onPress={() => navigator.goBack()}
                >
                    {useIcons('Back', 20, 20)}
                </TouchableOpacity>
                <View style={{ ...styles.alignItemsCenter, flex: 10, marginEnd: 40, marginTop: 5 }}>
                    <Text style={styles.stackScreenTitle}>Editar perfil</Text>
                </View>
            </View>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.largePaddingBottom}
            >
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                    style={styles.largePaddingHorizontal}
                >
                    <View style={styles.updateProfileLargeMarginTop}>
                        <Text style={styles.updateProfileLabel}>Usuario</Text>
                        <View style={styles.updateInputFieldContainer}>
                            {useIcons('Back', 25, 25)}
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
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.updateProfileLabel}>Email</Text>
                        <View style={styles.disabledInputFieldContainer}>
                            {useIcons('Envelope', 25, 25)}
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
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.updateProfileLabel}>Contraseña</Text>
                        <View style={styles.updateInputFieldContainer}>
                            {useIcons('Lock', 25, 25)}
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
                                {(passwordVisibility === false)
                                    ? useIcons('Eye', 28, 28)
                                    : useIcons('EyeClosed', 28, 28)
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.updateProfileLabel}>Repetir contraseña</Text>
                        <View style={styles.updateInputFieldContainer}>
                            {useIcons('Lock', 25, 25)}
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
                                {(passwordConfirmVisibility === false)
                                    ? useIcons('Eye', 28, 28)
                                    : useIcons('EyeClosed', 28, 28)
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(display === true) &&
                        <View style={styles.flexDirectionRowTinyMarginTop}>
                            <View style={styles.warningTopMargin}>
                                {useIcons('Warning', 15, 15)}
                            </View>
                            <Text style={styles.warningText}>Contraseñas no coinciden</Text>
                        </View>
                    }
                    <View style={{ marginTop: (display === true) ? 118 : 143 }}>
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