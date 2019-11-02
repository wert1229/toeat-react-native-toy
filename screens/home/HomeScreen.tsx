import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CategoryList from '@/components/CategoryList';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ categories, clickCategory, addCategory, deleteCategory }) => {
    return (
        <View style={styles.container}>
            <CategoryList 
                categories={categories}
                clickCategory={clickCategory} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => addCategory('test')}>

                    <Text style={styles.addButtonText}>{'Add'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
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