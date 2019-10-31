import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const CategoryList = ({ categoryList, onCategoryClick }) => {
    
    const _renderItem = ({item, index}) => {

        return (
            <TouchableOpacity 
                onPress={() => onCategoryClick(index)}>

                <Text>{item.name} ({item.itemList.length})</Text>
            </TouchableOpacity>
        )
    }
    
    const _extractKey = ({item, index}) => index

    return (
        <FlatList
            data={categoryList.toJS()}
            renderItem={_renderItem}
            keyExtractor={_extractKey}
            numColumns={2} />

    );
}

const styles = StyleSheet.create({
    categoryBtn: {
        width: '45%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    categoryText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '300'
    }
});

export default CategoryList;