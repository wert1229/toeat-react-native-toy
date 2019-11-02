import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const CategoryList = ({ categories, clickCategory }) => {
    console.log(categories);
    const _renderItem = ({ item: id, index }) => {
        const byId = categories.get('byId');
        const _item = byId.get(id);
        
        return (
            <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => clickCategory(_item.get('id'))}>

                <Text>{_item.get('name')} ({'todo'})</Text>
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
        flex: 1,
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