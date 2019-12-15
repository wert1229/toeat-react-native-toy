import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { fromJS } from 'immutable';
import { Ionicons } from '@expo/vector-icons'; 

import DimModal from '@/components/DimModal';

const { width, height } = Dimensions.get('window');
const CATEGORY_WIDTH = width * 0.45

const HomeScreen = ({ categories, clickCategory, addCategory, editCategory, deleteCategory }) => {
    
    const [isAddMode, setAddMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(fromJS({}));
    
    const _editCategory = (item) => {
        setEditingCategory(item);
        setEditMode(true)
    }

    const _confirmDelete = () => {
        Alert.alert(
            'Delete',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Delete', 
                    onPress: () => {
                        setEditMode(false);
                        deleteCategory(editingCategory.get('id'));
                    }
                },
            ]
          );
    }

    const _renderItem = ({ item: id, index }) => {
        const curItem = categories.get(id);
        
        return (
            <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => clickCategory(curItem)}
                onLongPress={() => _editCategory(curItem)}>
                
                <Text>{curItem.get('name')}</Text>

            </TouchableOpacity>
        );
    }
    
    const _extractKey = (item, index) => (item)
    
    return (
        <View style={styles.main}>
            <View style={styles.listContainer}>
                <FlatList
                    data={Object.keys(categories.filter(item => item.get('isDeleted') != true).toJS())}
                    renderItem={_renderItem}
                    keyExtractor={_extractKey}
                    numColumns={2} />
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setAddMode(true)}>

                    <Text style={styles.addButtonText}>{'Add'}</Text>
                </TouchableOpacity>
            </View>

            <View>
                <DimModal
                    visible={isAddMode}
                    setVisibleFunc={setAddMode}>
                        
                    <View style={styles.addPopup}>
                        <Text>{'추가'}</Text>
                        <TextInput
                            style={styles.addTextInput}
                            onChangeText={(text) => { setNewCategoryName(text) }} />
                        <TouchableOpacity
                            onPress={newCategoryName === '' ? 
                                () => {Alert.alert('alert', '빈칸불가')} :
                                () => {setAddMode(false); return addCategory(newCategoryName)} }>

                            <Text>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </DimModal>

                <DimModal
                    visible={isEditMode}
                    setVisibleFunc={setEditMode}>
                    
                    <TouchableOpacity
                        style={styles.editCategoryBtn}
                        activeOpacity={1}
                        onPress={() => {}}>
                    
                        <View style={{flex: 1}}/>
                        <View style={styles.editTextArea}>
                            <TextInput
                                style={styles.editTextInput}
                                value={editingCategory.get('name')}
                                onChangeText={text => setEditingCategory(editingCategory.set('name', text))} />
                        </View>

                        <View style={styles.editButtonArea}>
                            <TouchableOpacity
                                onPress={() => _confirmDelete()}>

                                <Ionicons 
                                    name="md-trash" 
                                    size={24} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={editingCategory.get('name') === '' ? 
                                    () => {Alert.alert('alert', '빈칸불가')} :
                                    () => {setEditMode(false); return editCategory(editingCategory)} }>

                                <Ionicons 
                                    name="md-checkmark" 
                                    size={24} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
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
        width: '100%',
        backgroundColor: '#fff'
    },
    categoryBtn: {
        flexDirection: 'column',
        width: CATEGORY_WIDTH,
        height: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black'
    },
    categoryText: {
        color: 'black',
        fontSize: 25,
        fontWeight: '300'
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    addPopup: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        minWidth: '60%',
        width: '60%',
        height: '30%'
    },
    addTextInput: {
        minWidth: '40%',
        fontSize: 15,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'gray'
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
    },
    editCategoryBtn: {
        flexDirection: 'column',
        width: CATEGORY_WIDTH * 1.5,
        height: 180,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 45,
        borderWidth: 1,
        borderColor: 'black'
    },
    editTextArea: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editTextInput: {
        minWidth: '40%',
        fontSize: 15,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'gray'
    },
    editButtonArea: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 36,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default HomeScreen;