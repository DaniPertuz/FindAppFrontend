import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { BackHandler, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AuthContext, RatingContext } from '../../../context';
import { useForm } from '../../../hooks/useForm';
import { IRate } from '../../../interfaces';
import { styles } from '../../../theme/AppTheme';
import { RootStackParams } from '../../../navigation';

interface Props extends StackScreenProps<RootStackParams, 'RateScreen'> { };

const RateScreen = ({ navigation, route }: Props) => {

    const numbers = [1, 2, 3, 4, 5];

    const { item } = route.params;
    const { user } = useContext(AuthContext);
    const { addRating, getPlaceRatingAverage, ratingAverage } = useContext(RatingContext);
    const { comments, onChange } = useForm<IRate>({
        _id: '',
        rate: 0,
        comments: '',
        user: ''
    });
    const [selectedRate, setSelectedRate] = useState(0);

    const handleRate = (num: number) => {
        setSelectedRate(num);
    };

    const onRate = () => {
        Keyboard.dismiss();
        addRating({ rate: selectedRate, comments, user, createdAt: new Date().toString() });
    };

    const backButtonHandler = () => {
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        getPlaceRatingAverage(item.place._id);
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.ratingsMainContainer}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View style={styles.grayContainer}>
                <Image
                    source={{ uri: item.place.photo }}
                    style={styles.ratingIcon}
                />
                <View style={styles.ratingTitleContainer}>
                    <View style={styles.center}>
                        <Text style={styles.blackPrimaryFontStyle}>{item.place.name}</Text>
                    </View>
                    <View style={styles.ratingSubtitleContainer}>
                        <View style={styles.ratingColumn}>
                            <Text style={styles.secondaryFontStyle}>Promedio</Text>
                            <Text style={styles.ratingText}>{item.place.rate}/5</Text>
                        </View>
                        <View style={styles.ratingColumn}>
                            <Text style={styles.secondaryFontStyle}>Total</Text>
                            <Text style={styles.ratingText}>{ratingAverage}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.ratingTextStart}>
                <Text style={styles.blackPrimaryFontStyle}>Calificación</Text>
            </View>
            <View style={styles.ratesContainer}>
                {numbers.map((num) =>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={num}
                        onPress={() => handleRate(num)}
                        style={[styles.ratesButton,
                        { backgroundColor: selectedRate === num ? '#8697A8' : '#F3F4F4' }]}
                    >
                        <Text style={styles.blackPrimaryFontStyle}>{num}</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.commentsContainer}>
                <TextInput
                    placeholder='Comentarios'
                    placeholderTextColor='#4B4D4B'
                    keyboardType='default'
                    multiline
                    underlineColorAndroid='#5856D6'
                    style={[
                        styles.commentsText,
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
            <View style={styles.ratingSaveButtonContainer}>
                <TouchableOpacity
                    style={styles.buttonSearch}
                    activeOpacity={0.8}
                    onPress={onRate}
                >
                    <Text style={styles.ratingSaveButtonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }} />
        </KeyboardAvoidingView>
    );
};

export default RateScreen;