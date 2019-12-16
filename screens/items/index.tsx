import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import * as UI from '@/utils/ui';
import { CategoryActions } from '@/stores/actionCreators';
import ItemsScreen from './ItemsScreen';

interface Props {
    items: {},
    currentCategory: any,
    navigation: any
}

const mapStateToProps = (state) => ({
    items: state.category.get('items'),
    currentCategory: state.category.get('currentCategory')
});

class ItemsScreenContainer extends Component<Props> {

    //Navigation Part
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title
        };
    };

     //Body Part
    _addItem = (item) => {
        CategoryActions.firebase_addItem(item);
    }

    _deleteItem = (id) => {
        CategoryActions.deleteItem(id);
    }

    _clickItem = (item) => {
        const mode = item.get('isDone') ? UI.NORMAL_MODE : UI.EDIT_MODE;

        CategoryActions.setCurrentItem(item);
        CategoryActions.setUiMode({ sector: 'item', mode: 'mode', value: mode });      
        this.props.navigation.navigate('Item', { title: item.get('name') });
    }

    _clickAddBtn = () => {
        const item = fromJS({ 
            isDone: false,
            name: '',
            location: {
                latitude: 37.589996,
                longitude: 127.057987
            },
            images: {},
            address: '',
            menu: '',
            price: '',
            score: 0,
            desc: '',
            categoryId: this.props.currentCategory.get('id')
        });

        CategoryActions.setCurrentItem(item);
        CategoryActions.setUiMode({ sector: 'item', mode: 'mode', value: UI.ADD_MODE});      
        this.props.navigation.navigate('Item', { title: '추가' });
    }

    componentDidMount() {
        const categoryId = this.props.currentCategory.get('id');
        CategoryActions.firebase_loadItems(categoryId);
    }

    render(){
        const { items, currentCategory } = this.props;
        const { _deleteItem, _clickItem, _clickAddBtn } = this;

        return (
            <ItemsScreen 
                items={items}
                currentCategory={currentCategory}
                clickAddBtn={_clickAddBtn}
                deleteItem={_deleteItem}
                clickItem={_clickItem}/>
        )
    }
}

export default connect(mapStateToProps)(ItemsScreenContainer);