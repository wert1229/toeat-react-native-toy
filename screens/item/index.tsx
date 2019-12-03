import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import ItemScreen, { ItemScreenHeader} from './ItemScreen';

interface Props {
    item: {},
    categoryId: string,
    isAddMode: boolean,
    isEditMode: boolean,
    navigation: any
}

const mapStateToProps = (state) => ({
    item: state.category.get('items').get('byId').get(state.category.get('clickedItem')),
    categoryId: state.category.get('clickedCategory'),
    isAddMode: state.category.get('ui').get('item').get('isAddMode'),
    isEditMode: state.category.get('ui').get('item').get('isEditMode')
});

class ItemScreenContainer extends Component<Props> {
    
    //Navigation Part 
    componentDidMount() {
        const { categoryId, isAddMode, isEditMode } = this.props;
        this.props.navigation.setParams({ categoryId: categoryId});
    }

    static navigationOptions = ({ navigation }) => {
        
        const _clickHeader = () => {
            const categoryId = navigation.getParam('categoryId');
            const name = navigation.getParam('name');

            if(categoryId == '' || typeof categoryId != 'string') return;

            CategoryActions.addItem({ name: name, categoryId: categoryId });
            navigation.goBack();
        }

        return {
            title: navigation.state.params.title,
            headerRight: () => (
                <ItemScreenHeader onClick={_clickHeader} />
            )
        };
    };

    //Body Part 
    _setTempItem = (name) => {
        this.props.navigation.setParams({ name: name });
    }
    
    _saveItem = (name, categoryId) => {
        CategoryActions.addItem({ name, categoryId });
    }

    _toggleEdit = (id) => {
        CategoryActions.deleteCategory(id);
    }

    _searchMap = (id) => {
        CategoryActions.clickCategory(id);
    }

    _clickPhoto = (id) => {
        CategoryActions.clickCategory(id);
    }
    
    render(){
        const { item, isAddMode, isEditMode } = this.props;
        const { _setTempItem, _saveItem, _toggleEdit, _searchMap, _clickPhoto } = this;

        return (
            <ItemScreen 
                item={item}
                isAddMode={isAddMode}
                isEditMode={isEditMode}
                setTempItem={_setTempItem}/>
        )
    }
}

export default connect(mapStateToProps)(ItemScreenContainer);