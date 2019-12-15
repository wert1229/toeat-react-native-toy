import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import ItemScreen from './ItemScreen';

interface Props {
    clickedItem: {},
    categoryId: string,
    isAddMode: boolean,
    isEditMode: boolean,
    navigation: any
}

const mapStateToProps = (state) => ({
    clickedItem: state.category.get('clickedItem'),
    categoryId: state.category.get('clickedCategory'),
    isAddMode: state.category.get('ui').get('item').get('isAddMode'),
    isEditMode: state.category.get('ui').get('item').get('isEditMode')
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
        CategoryActions.addItem(item);
    }

    _toggleEdit = (id) => {
        CategoryActions.deleteCategory(id);
    }

    _clickPhoto = (id) => {
        CategoryActions.clickCategory(id);
    }
    
    render(){
        const { clickedItem, isAddMode, isEditMode } = this.props;
        const { _addItem, _editItem  } = this;

        return (
            <ItemScreen 
                item={clickedItem}
                isAddMode={isAddMode}
                isEditMode={isEditMode}
                addItem={_addItem}
                editItem={_editItem}/>
        )
    }
}

export default connect(mapStateToProps)(ItemScreenContainer);