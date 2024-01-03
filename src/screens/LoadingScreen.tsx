import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import { styles } from '../theme/AppTheme';

const LoadingScreen = () => {
  return (
    <View style={{ ...styles.flexOneAlignJustifyCenter, backgroundColor: 'rgba(104, 110, 222, 0.1)' }}>
      <StatusBarComponent color='rgba(104, 110, 222, 0)' theme='dark-content' />
      <ActivityIndicator size={50} color='#000000' />
    </View>
  );
};

export default LoadingScreen;