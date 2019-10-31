import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const CategoryList = ({ categoryList, onCategoryClick }) => {
    
    const _renderItem = ({item, index}) => {

        return (
            <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => onCategoryClick(index)}>

                <Text>{item.name} ({item.itemList.length})</Text>
            </TouchableOpacity>
        );
    }
    
    const _extractKey = ({item, index}) => index

    return (
        <FlatList
            style={styles.list}
            data={categoryList.toJS()}
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