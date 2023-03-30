import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../../navigation';
import SavedPlace from '../../components/SavedPlace';
import { styles } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'PlacesListScreen'> { };

const PlacesListScreen = ({ navigation, route }: Props) => {

    const { top } = useSafeAreaInsets();

    const { places } = route.params;

    return (
        <View
            style={{
                ...styles.topContainer,
                paddingTop: (Platform.OS === 'ios') ? top : top + 20
            }}
        >
            <FlatList
                data={places}
                keyExtractor={(m) => m.place._id}
                renderItem={({ item }) => {
                    return (
                        <SavedPlace
                            item={item}
                            onPress={() => navigation.navigate('MapScreen', { place: item.place.address })}
                        />
                    );
                }}
            />
        </View>
    );
};

export default PlacesListScreen;