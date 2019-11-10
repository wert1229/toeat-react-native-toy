import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import * as HeaderButtons from '@/components/HeaderButtons';

export const ItemsScreenHeader = ({ onClick }) => {
    
    return (
        <HeaderButtons.AddButton title={'추가버튼'} onClick={onClick} />
    );
};

const ItemsScreen = ({ categories, items, categoryId, clickItem, addItem, deleteItem }) => {
    
    const itemIds = categories.getIn(['byId', categoryId, 'items']);
    
    const _renderItem = ({ item: id, index }) => {
        const byId= items.get('byId');
        const _item = byId.get(id);
        const itemName = _item.get('name');

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => clickItem(id, itemName)}>

                <Text style={styles.itemText}>{itemName}</Text>
                <Ionicons 
                    style={styles.itemImage}
                    name="md-arrow-dropright" 
                    size={32} />
            </TouchableOpacity>
        );
    }

    const _extractKey = (item, index) => (item)

    return (
        <View style={styles.main}>
            <View style={styles.listContainer}>
                <FlatList 
                    data={itemIds.toJS()}
                    renderItem={_renderItem}
                    keyExtractor={_extractKey} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => addItem('test', categoryId)}>

                    <Text style={styles.addButtonText}>{'Add'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column'
    },
    listContainer: {
        flex: 5
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    itemText: {
        flex: 4,
        marginHorizontal: 50,
        fontSize: 18,
        fontWeight: '400'
    },
    itemImage: {
        flex: 1
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

export default ItemsScreen;