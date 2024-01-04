import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-root-toast';

import { AuthContext, RatingContext } from '../../context';
import { useForm, useIcons } from '../../hooks';
import { IService } from '../../interfaces';
import { RootStackParams } from '../../navigation';

import { styles } from '../../theme/AppTheme';

interface Props {
    navigation: StackNavigationProp<RootStackParams, "RateScreen">;
    item: IService;
}

const RateScreenBody = ({ navigation, item }: Props) => {

    const [selectedRate, setSelectedRate] = useState(0);

    const { user } = useContext(AuthContext);
    const { addRating } = useContext(RatingContext);

    const { comments, onChange } = useForm({
        comments: '',
    });

    const toWords = (number: number): string => {
        const words: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
        return words[number - 1] || '';
    };

    const onRate = () => {
        Keyboard.dismiss();
        if (selectedRate === 0) {
            Toast.show('No has ingresado la calificación', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
            return;
        }

        (user) && addRating({ rate: selectedRate, comments, place: item.place._id, user: item.user });
        Toast.show('Calificación registrada', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
        navigation.popToTop();
    };

    return (
        <>
            <View style={{ marginTop: 25, ...styles.flexDirectionRow }}>
                <Text style={styles.boldMediumText}>Calificar</Text>
            </View>
            <View style={styles.ratesContainer}>
                {[1, 2, 3, 4, 5].map((rateNumber) => (
                    <TouchableOpacity
                        key={rateNumber}
                        activeOpacity={1.0}
                        onPress={() => setSelectedRate(rateNumber)}
                        style={[
                            styles.rateNumber,
                            { backgroundColor: selectedRate === rateNumber ? '#DEDEDE' : '#FFFFFF' },
                        ]}
                    >
                        {useIcons(`Number${toWords(rateNumber)}`, 36, 36)}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.mediumMarginTop}>
                <Text style={styles.plainBodySmallText}>Comentarios</Text>
                <View style={styles.smallMarginTop}>
                    <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
                        <View style={styles.ratesCommentsContainer}>
                            <TextInput
                                placeholder='Escribe tus comentarios'
                                placeholderTextColor='#9A9A9A'
                                keyboardType='default'
                                style={[styles.ratesCommentsText, (Platform.OS === 'ios') && { lineHeight: 12 }]}
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value, 'comments')}
                                value={comments}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
            <View style={{ marginHorizontal: 26, marginTop: 151 }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={onRate}
                    style={styles.rateButton}
                >
                    <Text style={styles.rateButtonText}>Enviar Calificación</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default RateScreenBody;