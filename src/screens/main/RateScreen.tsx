import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { BackHandler, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { IRating } from '../../interfaces';
import { useForm } from '../../hooks/useForm';
import { styles } from '../../theme/AppTheme';
import { AuthContext, RatingContext } from '../../context';

interface Props extends StackScreenProps<any, any> { };

const RateScreen = ({ navigation, route }: Props) => {

    const numbers = [1, 2, 3, 4, 5];

    const { item } = route.params!;
    const { user } = useContext(AuthContext);
    const { addRating } = useContext(RatingContext);
    const { comments, onChange } = useForm<IRating>({
        rate: 0,
        comments: '',
        place: '',
        user: ''
    });
    const [selectedRate, setSelectedRate] = useState(0);

    const handleRate = (num: number) => {
        setSelectedRate(num);
    };

    const onRate = () => {
        Keyboard.dismiss();
        addRating({ rate: selectedRate, comments, place: item.place._id, user: user?._id! });
    };

    const backButtonHandler = () => {
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ display: 'flex', flexDirection: 'column', marginHorizontal: 20, flex: 1 }}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#F3F4F4',
                    marginTop: 30,
                    marginBottom: 20,
                    padding: 20,
                    borderRadius: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={{ uri: item.place.photo }}
                    style={{
                        borderRadius: 50,
                        flex: 1,
                        height: 100,
                        width: 100
                    }}
                />
                <View
                    style={{
                        flex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        marginHorizontal: 15
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={styles.blackPrimaryFontStyle}>{item.place.name}</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column'
                            }}
                        >
                            <Text style={styles.bottomSheetDetailsSecondaryFontStyle}>
                                Promedio
                            </Text>
                            <Text
                                style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    color: '#000000',
                                    fontFamily: 'Nunito-Regular',
                                    fontSize: 18
                                }}
                            >
                                {item.place.rate}/5
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column'
                            }}
                        >
                            <Text style={styles.bottomSheetDetailsSecondaryFontStyle}>
                                Total
                            </Text>
                            <Text
                                style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    color: '#000000',
                                    fontFamily: 'Nunito-Regular',
                                    fontSize: 18
                                }}
                            >
                                {item.place.total}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{ flex: 0.3, alignSelf: 'flex-start' }}
            >
                <Text style={styles.blackPrimaryFontStyle}>
                    Calificación
                </Text>
            </View>
            <View
                style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 30 }}
            >
                {numbers.map((num) =>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={num}
                        onPress={() => handleRate(num)}
                        style={[{
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignContent: 'center',
                            paddingHorizontal: 20
                        }, { backgroundColor: selectedRate === num ? '#8697A8' : '#F3F4F4' }]}
                    >
                        <Text style={styles.blackPrimaryFontStyle}>{num}</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View
                style={{ flex: 0.5, width: '100%' }}
            >
                <TextInput
                    placeholder='Comentarios'
                    placeholderTextColor='#CBCBCB'
                    keyboardType='default'
                    multiline
                    underlineColorAndroid='#5856D6'
                    style={[
                        {
                            color: '#5856D6',
                            fontFamily: 'Nunito-Regular',
                            fontSize: 15,
                        },
                        (Platform.OS === 'ios') && styles.inputFieldIOS
                    ]}
                    selectionColor='#5856D6'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onSubmitEditing={onRate}
                    onChangeText={(value) => onChange(value, 'comments')}
                    value={comments}
                />
            </View>
            <View
                style={{
                    flex: 0.5, justifyContent: 'center', alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    style={styles.buttonSearch}
                    activeOpacity={0.8}
                    onPress={onRate}
                >
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontFamily: 'Nunito-Regular',
                        fontWeight: '700'
                    }}>
                        Guardar
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }} />
        </KeyboardAvoidingView>
    );
};

export default RateScreen;