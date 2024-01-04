import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import RateScreenHeader from '../../../components/RateScreenHeader';
import RateScreenSubheader from '../../../components/RateScreenSubheader';
import RateScreenBody from '../../../components/RateScreenBody';
import StatusBarComponent from '../../../components/StatusBarComponent';
import { RatingContext } from '../../../context';
import { useIcons } from '../../../hooks';
import { RootStackParams } from '../../../navigation';
import RateItem from './RateItem';

import { styles } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'RateScreen'> { };

const RateScreen = ({ navigation, route }: Props) => {

    const { item } = route.params;

    const { ratings } = useContext(RatingContext);

    const [modalVisible, setModalVisible] = useState(false);

    const handleModalVisible = (visible: boolean) => {
        setModalVisible(visible);
    };

    const backButtonHandler = () => {
        navigation.popToTop();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, []);

    return (
        <View style={styles.mainBackground}>
            <StatusBarComponent color='rgba(104, 110, 222, 0)' theme='dark-content' />
            <View style={{ marginTop: 15, marginHorizontal: 16 }}>
                <View style={styles.flexDirectionRow}>
                    <View style={styles.flexOneAlignJustifyCenter}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => navigation.popToTop()}
                        >
                            {useIcons('Back', 25, 25)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 10, ...styles.justifyAlignItemsCenter }}>
                        <Text style={styles.stackScreenTitle}>Calificar</Text>
                    </View>
                    <View style={styles.flexOne} />
                </View>
                <RateScreenHeader item={item} handleModalVisible={handleModalVisible} />
                <RateScreenSubheader item={item} />
                <RateScreenBody navigation={navigation} item={item} />
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <View style={styles.reviewsModal}>
                        <View style={{ ...styles.mediumMarginTop, marginHorizontal: 21 }}>
                            <View style={styles.flexDirectionRow}>
                                <View style={styles.flexOne}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        {useIcons('Down', 24, 24)}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.flexOne}>
                                    <Text style={styles.reviewsModalTitle}>Opiniones</Text>
                                </View>
                                <View style={styles.flexOne} />
                            </View>
                            <View style={styles.mediumMarginTop}>
                                <FlatList
                                    data={ratings.rates}
                                    keyExtractor={m => m._id!}
                                    renderItem={({ item }) => (
                                        <RateItem item={item} />
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default RateScreen;