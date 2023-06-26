import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Fab = () => {
    return (
        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { }}
                style={{
                    zIndex: 999,
                    height: 50,
                    width: 50,
                    backgroundColor: '#000000',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6
                }}
            >
                <Icon
                    name={'brush-outline'}
                    color={'#FFFFFF'}
                    size={35}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Fab;