import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import ItemScreen from './ItemScreen';

interface Props {
    currentItem: {},
    categoryId: string,
    UIMode: number,
    navigation: any
}

const mapStateToProps = (state) => ({
    currentItem: state.category.get('currentItem'),
    categoryId: state.category.get('currentCategory'),
    UIMode: state.category.get('ui').get('item').get('mode')
});

class ItemScreenContainer extends Component<Props> {
    
    //Navigation Part 
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
        };
    };

    //Body Part 
    _addItem = (item) => {
        CategoryActions.firebase_addItem(item);
        this.props.navigation.goBack();
    }

    _editItem = (item) => {
        item = {
            ...item,
            isDone: true
        }
        
        CategoryActions.firebase_editItem(item);
    }

    _setUIMode = (value) => {
        CategoryActions.setUiMode({ sector: 'item', mode: 'mode', value: value});
    }
    
    render(){
        const { currentItem, UIMode } = this.props;
        const { _addItem, _editItem, _setUIMode } = this;

        return (
            <ItemScreen 
                item={currentItem}
                UIMode={UIMode}
                setUIMode={_setUIMode}
                addItem={_addItem}
                editItem={_editItem}/>
        )
    }
}

export default connect(mapStateToProps)(ItemScreenContainer);