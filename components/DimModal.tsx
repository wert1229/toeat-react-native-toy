import React from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native';

const DimModal = ({ children, visible, setVisibleFunc }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}>
        
            <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
                onPress={() => setVisibleFunc(false)}>

                <TouchableOpacity 
                    style={styles.modalInner}
                    activeOpacity={1}
                    onPress={() => {}}>
                    
                    {children}
                    
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    ); 
}

const styles = StyleSheet.create({
    modalBackground: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalInner: {
        width: '60%',
        height: '30%',
        backgroundColor: '#ffffff'
    }
});

export default DimModal;