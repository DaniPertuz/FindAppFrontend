import React from 'react';
import { Image, Text, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { useIcons } from '../../../hooks';
import { IRate } from '../../../interfaces/app-interfaces';

import { styles } from '../../../theme/AppTheme';

interface Props {
    item: IRate;
}

const RateItem = ({ item }: Props) => {
    return (
        <View style={styles.rateItemContainer}>
            <View style={styles.flexDirectionRow}>
                <View style={styles.flexOne}>
                    <Image source={{ uri: item.user?.photo }} style={styles.itemIcon} />
                </View>
                <View style={styles.flexThree}>
                    <Text numberOfLines={1} style={styles.rateItemUserName}>
                        {item.user?.name}
                    </Text>
                    <View style={{ ...styles.flexDirectionRow, marginVertical: 6 }}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <React.Fragment key={index}>
                                {index < item.rate
                                    ? useIcons('Star', 20, 20)
                                    : useIcons('StarOut', 20, 20)
                                }
                            </React.Fragment>
                        ))}
                        <View style={{ marginStart: 6, ...styles.justifyContentCenter }}>
                            <Text style={styles.rateItemAvg}>
                                {item.rate.toFixed(1)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexTwo}>
                    <Text style={styles.rateItemDate}>
                        {moment(item.createdAt, "YYYYMMDD").fromNow()}
                    </Text>
                </View>
            </View>
            <View style={{ marginStart: 45, paddingHorizontal: 10 }}>
                <Text style={styles.description}>
                    {item.comments}
                </Text>
            </View>
        </View>
    );
};

export default RateItem;