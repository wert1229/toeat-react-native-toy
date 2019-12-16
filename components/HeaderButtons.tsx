import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export const AddButton = ({ title, onClick }) => {

    return (
        <View style={styles.button}>
            <Button 
                title={title + ' >'}
                onPress={onClick}/>
        </View>
    );
}

export const ConfirmButton = ({ title, onClick }) => {

    return (
        <View style={styles.button}>
            <Button 
                title={title}
                onPress={onClick}/>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {

    }
});