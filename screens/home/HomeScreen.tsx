import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CategoryList from '@/components/CategoryList';

const HomeScreen = ({ categoryList, onCategoryClick }) => {
    return (
        <View style={styles.container}>
            <Text>Main</Text>
            <CategoryList 
                categoryList={categoryList}
                onCategoryClick={onCategoryClick}/>
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
});

export default HomeScreen;