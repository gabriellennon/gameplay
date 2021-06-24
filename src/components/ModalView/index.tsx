import React from 'react';
import { ReactNode } from 'react';
import { Modal, View, ModalProps } from 'react-native';
import { Background } from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
    children: ReactNode
}

export function ModalView({ children ,...rest}: Props){
  return (
      <Modal
        transparent
        animationType="slide"
        {...rest}
      >
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Background>
                    <View style={styles.bar} />
                    {/* a interface que vamos embrulhar */}
                    {children}
                </Background>
            </View>
        </View>
      </Modal>
  );
}