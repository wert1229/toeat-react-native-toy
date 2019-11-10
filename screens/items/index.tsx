import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import ItemsScreen, { ItemsScreenHeader } from './ItemsScreen';

interface Props {
    categories: {},
    items: {},
    categoryId: string,
    navigation: any
}

const mapStateToProps = (state) => ({
    categories: state.category.get('categories'),
    items: state.category.get('items'),
    categoryId: state.category.get('clickedCategory')
});

class ItemsScreenContainer extends Component<Props> {

    //Navigation Part
    static navigationOptions = ({ navigation }) => {

        const _clickHeader = () => {           
            navigation.navigate('Item', { title: '추가' });
        }

        return {
            title: navigation.state.params.title,
            headerRight: () => (
                <ItemsScreenHeader onClick={_clickHeader} />
            )
        };
    };

     //Body Part
    _addItem = (name, categoryId) => {
        CategoryActions.addItem({ name, categoryId });
    }

    _deleteItem = (id) => {
        CategoryActions.deleteItem(id);
    }

    _clickItem = (id, name) => {
        CategoryActions.clickItem(id);
        this.props.navigation.navigate('Item', { title: name });
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
                clickItem={_clickItem}/>
        )
    }
}

export default connect(mapStateToProps)(ItemsScreenContainer);