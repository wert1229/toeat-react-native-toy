import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Ionicons } from '@expo/vector-icons'; 

const ItemScreen = ({ item, isAddMode, isEditMode, setTempItem, addItem }) => {
    
    const region = {
        latitude: item.get('location').get('latitude'),
        longitude: item.get('location').get('longitude'),
        latitudeDelta: 0.01,
        longitudeDelta: 0.005
    }
    
    return (
        <View style={styles.main}>
            <View style={styles.mapContainer}>

                <GooglePlacesAutocomplete
                    style={{ flex: 1 }}
                    placeholder={'검색'}
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    query={{
                        key: {PROVIDER_GOOGLE},
                        language: 'kor'}} />

                {isAddMode ?
                <MapView
                    style={{ flex: 4 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}>

                </MapView> :

                <MapView
                    style={{ flex: 4 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}>

                    <Marker
                        coordinate={region}
                        title={item.get('name')}
                        description={item.get('desc')} />
                </MapView>       
            }
            </View>

            <View style={styles.pictureContainer}>
                <ScrollView
                    horizontal={true}>

                    <Image
                        style={styles.pictureItem}
                        source={require('@/assets/icon.png')}
                        resizeMode={'stretch'} />
                    <Image
                        style={styles.pictureItem}
                        source={require('@/assets/icon.png')}
                        resizeMode={'stretch'} />
                    <Image
                        style={styles.pictureItem}
                        source={require('@/assets/icon.png')}
                        resizeMode={'stretch'} />
                    <Image
                        style={styles.pictureItem}
                        source={require('@/assets/icon.png')}
                        resizeMode={'stretch'} />
                    <Ionicons
                        style={styles.pictureItem}
                        name="md-add-circle-outline" 
                        size={32} />
                </ScrollView>
            </View>

            <View style={styles.editContainer}>
                <View style={styles.editItem}>
                    <Text>{'상호명'}</Text>
                    <TouchableOpacity>
                        {isAddMode 
                        ?<TextInput 
                            placeholder={'상호명'}
                            onChangeText={ text => setTempItem(text) }/>
                        :<Text>{item.get('name')}</Text>}     
                    </TouchableOpacity>
                </View>
                <View style={styles.editItem}>
                    <Text>{'주소'}</Text>
                    <TouchableOpacity>
                    {isAddMode 
                        ?<Text>{'지도 길게 클릭'}</Text>
                        :<Text>{item.get('address')}</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.editItem}>
                    <Text>{'메뉴'}</Text>
                    <TouchableOpacity>
                        {isAddMode 
                        ?<TextInput placeholder={'메뉴'}/>
                        :<Text>{item.get('menu')}</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.editItem}>
                    <Text>{'가격(인당)'}</Text>
                    <TouchableOpacity>
                        {isAddMode 
                        ?<TextInput placeholder={'인당 가격'}/>
                        :<Text>{item.get('price')}</Text>}
                    </TouchableOpacity>
                </View>
                {!isAddMode &&
                <View style={styles.editItem}>
                    <Text>{'평점'}</Text>
                    <TouchableOpacity>
                        <Text>{item.get('score')}</Text>
                    </TouchableOpacity>
                </View>}
                {!isAddMode &&
                <View style={styles.editItem}>
                    <Text>{'비고'}</Text>
                    <TouchableOpacity>
                        <Text>{item.get('desc')}</Text>
                    </TouchableOpacity>
                </View>}
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => addItem(item.toJS())}>

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
    mapContainer: {
        flex: 3,
        backgroundColor: '#aaa',
    },
    pictureContainer: {
        flex: 1,
        backgroundColor: '#bbb'
    },
    pictureItem: {
        flex: 1,
        width: 90
    },
    editContainer: {
        flex: 4
    },
    editItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '300',
        color: 'black'
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

export default ItemScreen;