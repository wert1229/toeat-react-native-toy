import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import ItemsScreen from './ItemsScreen';

interface Props {
    categories: {},
    items: {},
    categoryId: string
}

const mapStateToProps = (state) => ({
    categories: state.category.get('categories'),
    items: state.category.get('items'),
    categoryId: state.category.get('clickedCategory')
});

class ItemsScreenContainer extends Component<Props> {

    _addItem = (name, categoryId) => {
        CategoryActions.addItem({ name, categoryId });
    }

    _deleteItem = (id) => {
        CategoryActions.deleteCategory(id);
    }

    _clickItem = (id) => {
        CategoryActions.clickCategory(id);
    }

    render(){
        const { categories, items, categoryId } = this.props;
        const { _addItem, _deleteItem, _clickItem } = this;

        return (
            <ItemsScreen 
                categories={categories}
                items={items}
                categoryId={categoryId}
                addItem={_addItem}
                deleteItem={_deleteItem}
                clickItems={_clickItem}/>
        )
    }
}

export default connect(mapStateToProps)(ItemsScreenContainer);