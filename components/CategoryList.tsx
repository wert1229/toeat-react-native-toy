import React from 'react';
import { Dimensions, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width * 0.45

const CategoryList = ({ categories, clickCategory }) => {
    
    const _renderItem = ({ item: id, index }) => {
        const curItem = categories.get(id);
        
        return (
            <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => clickCategory(curItem)}>

                <Text>{curItem.get('name')}</Text>
            </TouchableOpacity>
        );
    }
    
    const _extractKey = (item, index) => (item)
    
    return (
        <FlatList
            data={Object.keys(categories.toJS())}
            renderItem={_renderItem}
            keyExtractor={_extractKey}
            numColumns={2} />

    );
}

const styles = StyleSheet.create({
    categoryBtn: {
        width: SCREEN_WIDTH,
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