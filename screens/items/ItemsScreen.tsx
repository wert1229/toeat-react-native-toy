import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const ItemsScreen = ({ items, currentCategory, clickItem, clickAddBtn, deleteItem }) => {

    const _getSectionData = () => {
        var _items = items.toJS();
        var section = [
            {
                title: 'ToEat',
                data: []
            },
            {
                title: 'Done',
                data: []
            }
        ];
        
        for(const key in _items) {
            var _item = _items[key];
            
            if (_item.isDone) {
                section[1].data.push(_item.id);
            } else {
                section[0].data.push(_item.id);
            }
        }

        return section;
    }

    const _renderHeader = ({ section }) => {
        return (
            <Text>{section.title}</Text>
        );
    }

    const _renderItem = ({ item: id, index }) => {
        const curItem = items.get(id);

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => clickItem(curItem)}>

                <Text style={styles.itemText}>{curItem.get('name')}</Text>
                <Ionicons 
                    style={styles.itemImage}
                    name="md-arrow-dropright" 
                    size={32} />
            </TouchableOpacity>
        );
    }

    const _extractKey = (item, index) => (item)

    return (
        <View style={styles.main}>
            <View style={styles.listContainer}>
                <SectionList
                    sections={_getSectionData()}
                    renderSectionHeader={_renderHeader}
                    // data={Object.keys(items.toJS())}
                    renderItem={_renderItem}
                    keyExtractor={_extractKey} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => clickAddBtn()}>

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
    listContainer: {
        flex: 5
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    itemText: {
        flex: 4,
        marginHorizontal: 50,
        fontSize: 18,
        fontWeight: '400'
    },
    itemImage: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
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

export default ItemsScreen;