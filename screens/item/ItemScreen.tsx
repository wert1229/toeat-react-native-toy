import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons'; 

import DimModal from '@/components/DimModal';

const ItemScreen = ({ item, isAddMode, isEditMode, addItem, editItem }) => {
    
    const [curItem, setCurItem] = useState(item.toJS());
    const [modalVisible, setModalVisible] = useState(false);

    const _setItem = (value) => {
        setCurItem({
            ...curItem,
            ...value
        });
    }

    const _makeStars = () => {
        const score = curItem.score;
        var starKind = '';
        var stars = [];

        for(let i = 2; i <= 10; i = i + 2) {
            if (i <= score) {               
                starKind = 'md-star';
            } else {
                starKind = (i - 1 == score) ? 'md-star-half': 'md-star-outline';
            }

            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => _setItem({score: score == i ? i - 1 : i})}>

                    <Ionicons 
                        name={starKind}
                        size={24} />
                </TouchableOpacity>)
        }
        
        return stars;
    }
          
    const region = {
        latitude: curItem.location.latitude,
        longitude: curItem.location.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
    }

    return (
        <View style={styles.main}>
            <View style={styles.mapContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}>

                    <Text style={styles.addButtonText}>{'search'}</Text>
                </TouchableOpacity>
                <MapView
                    style={{ flex: 5 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    region={region}>

                    <Marker
                        coordinate={region}
                        title={curItem.name}
                        description={curItem.desc} />
                </MapView>   
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
                            value={curItem.name}
                            placeholder={'상호명'}
                            onChangeText={ text => _setItem({ name: text }) }/>
                        :<Text>{curItem.name}</Text>}     
                    </TouchableOpacity>
                </View>
                <View style={styles.editItem}>
                    <Text>{'주소'}</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}>
                        {curItem.address == ''
                        ?<Text>{'검색'}</Text>
                        :<Text>{curItem.address}</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.editItem}>
                    <Text>{'메뉴'}</Text>
                    <TouchableOpacity>
                        {isAddMode
                        ?<TextInput 
                            value={curItem.menu}
                            placeholder={'메뉴'}
                            onChangeText={ text => _setItem({ menu: text }) }/>
                        :<Text>{curItem.menu}</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.editItem}>
                    <Text>{'가격(인당)'}</Text>
                    <TouchableOpacity>
                        {isAddMode
                        ?<TextInput 
                            value={curItem.price}
                            placeholder={'인당 가격'}
                            onChangeText={ text => _setItem({ price: text }) }/>
                        :<Text>{curItem.price}</Text>}
                    </TouchableOpacity>
                </View>
                {!isAddMode &&
                <View style={styles.editItem}>
                    <Text>{'평점'}</Text>
                    <View style={{flexDirection: 'row'}}>
                        {_makeStars()} 
                    </View>
                </View>}
                {!isAddMode &&
                <View style={styles.editItem}>
                    <Text>{'비고'}</Text>
                    <TouchableOpacity>
                        <Text>{curItem.desc}</Text>
                    </TouchableOpacity>
                </View>}
            </View>
            {isAddMode &&
            <View style={styles.addContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => addItem(curItem)}>

                    <Text style={styles.addButtonText}>{'Add'}</Text>
                </TouchableOpacity>
            </View>}
            {isEditMode &&
            <View style={styles.addContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => editItem(curItem)}>

                    <Text style={styles.addButtonText}>{'Edit'}</Text>
                </TouchableOpacity>
            </View>}

            <View>
                <DimModal
                    visible={modalVisible}
                    setVisibleFunc={setModalVisible}>

                    <View style={styles.searchPopup}>
                        <Text>{'검색'}</Text>
                        <GooglePlacesAutocomplete
                            placeholder={'검색'}
                            minLength={2}
                            autoFocus={true}
                            returnKeyType={'default'}
                            fetchDetails={true}
                            onPress={(data, details = null) => {
                                _setItem({ 
                                    address: details.formatted_address,
                                    location: {
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng
                                }});
                                setModalVisible(false);
                            }}
                            query={{
                                key: 'AIzaSyA161QN7SRZ7xO58JCmUW3GcqUJqsgA31Q',
                                language: 'ko'}} />
                    </View>
                </DimModal>
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
    addContainer: {
        flex: 1,
        alignItems: 'center'
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
    },
    searchPopup: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        minWidth: '100%', 
        height: '70%'  
    }
});

export default ItemScreen;