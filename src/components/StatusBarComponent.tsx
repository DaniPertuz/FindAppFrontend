import React from 'react';
import { Platform, StatusBar, View } from 'react-native';

interface Props {
  color: string;
  theme: 'default' | 'dark-content' | 'light-content';
}

const StatusBarComponent = ({ color, theme }: Props) => {

  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  return (
    <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: color }}>
      <StatusBar translucent backgroundColor={color} barStyle={theme} />
    </View>
  );
};

export default StatusBarComponent;