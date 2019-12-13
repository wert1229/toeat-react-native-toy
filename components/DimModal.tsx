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
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalInner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    }
});

export default DimModal;