import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';

import CategoryList from '@/components/CategoryList';
import DimModal from '@/components/DimModal';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ categories, isAddMode, setAddMode, clickCategory, addCategory, deleteCategory }) => {
    
    const [ value, setValue ] = useState('');

    return (
        <View style={styles.main}>
            <View style={styles.listContainer}>
                <CategoryList
                    categories={categories}
                    clickCategory={clickCategory} />
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setAddMode(true)}>

                    <Text style={styles.addButtonText}>{'Add'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.modalContainer}>
                <DimModal
                    visible={isAddMode}
                    setVisibleFunc={setAddMode}>
                        
                    <View>
                        <Text>{'추가'}</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(text) => { setValue(text) }} />
                        <TouchableOpacity
                            onPress={value === '' ? 
                                () => {Alert.alert('alert', '빈칸불가')} :
                                () => {setAddMode(false); return addCategory(value)} }>

                            <Text>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </DimModal>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 5,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    addButton: {
        width: 350,
        height: 50,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 20,
        fontWeight: '300',
        color: 'black'
    }
});

export default HomeScreen;