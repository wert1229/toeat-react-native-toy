import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CategoryListContainer from '../containers/CategoryListContainer';

class Main extends Component {  
    render() {
        return (
            <View style={styles.container}>
                <Text>Main</Text>
                <CategoryListContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Main;