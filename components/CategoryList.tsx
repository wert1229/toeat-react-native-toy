import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const CategoryList = ({ categories, clickCategory }) => {
    
    const _renderItem = ({ item: id, index }) => {
        const byId = categories.get('byId');
        const _item = byId.get(id);
        
        return (
            <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => clickCategory(_item.get('id'), _item.get('name'))}>

                <Text>{_item.get('name')} ({_item.get('items').size})</Text>
            </TouchableOpacity>
        );
    }
    
    const _extractKey = (item, index) => (item)

    return (
        <FlatList
            style={styles.list}
            data={categories.get('allId').toJS()}
            renderItem={_renderItem}
            keyExtractor={_extractKey}
            numColumns={2} />

    );
}

const styles = StyleSheet.create({
    list: {
        width: "90%",
    },
    categoryBtn: {
        width: '45%',
        height: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black'
    },
    categoryText: {
        color: 'black',
        fontSize: 25,
        fontWeight: '300'
    }
});

export default CategoryList;