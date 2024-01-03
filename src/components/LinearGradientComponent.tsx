import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../theme/AppTheme';

interface Props {
    level: number;
    children: JSX.Element | JSX.Element[];
}

const LinearGradientComponent = ({ level, children }: Props) => {
    return (
        <LinearGradient
            colors={(level === 3) ? ['#D6B238', '#F6E074'] : (level === 2) ? ['#B8B8B8', '#E2E2E2'] : ['#C08E5E', '#FAC294']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradient}
        >
            {children}
        </LinearGradient>
    );
};

export default LinearGradientComponent;