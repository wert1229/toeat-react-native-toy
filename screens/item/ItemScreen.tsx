import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as HeaderButtons from '@/components/HeaderButtons';

export const ItemScreenHeader = ({ onClick }) => {
    
    return (
        <HeaderButtons.ConfirmButton title={'생성버튼'} onClick={onClick} />
    );
};

const ItemScreen = ({ item }) => {
    
    return (
        <View style={styles.main}>
            <TouchableOpacity
                style={styles.mapContainer}>

                <Text>{'Map area'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.pictureContainer}>

                <Text>{'Picture area'}</Text>
            </TouchableOpacity>

            <View style={styles.editContainer}>
                <Text>{'Date'}</Text>
                <Text>{'Address'}</Text>
                <Text>{'Menu'}</Text>
                <Text>{'Price'}</Text>
                <Text>{'Score'}</Text>
                <Text>{'Description'}</Text>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column'
    },
    mapContainer: {
        flex: 3,
        backgroundColor: '#aaa',
    },
    pictureContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#bbb'
    },
    editContainer: {
        flex: 4
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '300',
        color: 'black'
    }
});

export default ItemScreen;