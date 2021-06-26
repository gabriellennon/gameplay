import React from 'react';
import { ReactNode } from 'react';
import { 
  Modal, 
  View, 
  ModalProps, 
  //pra fazer o modal fechar caso o usuario clique em qualquer lugar que nao seja o item
  TouchableWithoutFeedback 
} from 'react-native';
import { Background } from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
    children: ReactNode;
    closeModal: () => void;
}

export function ModalView({ 
  children ,
  closeModal,
  ...rest}: Props){
  return (
      <Modal
        transparent
        animationType="slide"
        //modal passa por cima da area de widgets do celular, tipo deixa mais escurinho
        statusBarTranslucent
        {...rest}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
              <View style={styles.container}>
                  <Background>
                      <View style={styles.bar} />
                      {/* a interface que vamos embrulhar */}
                      {children}
                  </Background>
              </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
}