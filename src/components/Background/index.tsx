import React, {ReactNode} from 'react';

import {} from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

type Props = {
    children: ReactNode;
}

export function Background({ children }: Props){
    const { secondary80, secondary100 } = theme.colors;
    return(
        <LinearGradient
            style={styles.container}
            //um array que eu especifico de qual cor até qual cor ele vai
            colors={[secondary80, secondary100]}
        >
            {/* passando um component filho que vai ser embrulhado pelo lineargradient */}
            {children}
        </LinearGradient>
    )
}