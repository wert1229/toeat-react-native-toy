import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import ItemScreen, { ItemScreenHeader} from './ItemScreen';

interface Props {
    item: {},
    categoryId: string,
    navigation: any
}

const mapStateToProps = (state) => ({
    item: state.category.get('items').get(state.category.get('clickedItem')),
    categoryId: state.category.get('clickedCategory')
});

class ItemScreenContainer extends Component<Props> {

    //Navigation Part 
    componentDidMount() {
        const { categoryId } = this.props;
        this.props.navigation.setParams({ categoryId: categoryId});
    }

    static navigationOptions = ({ navigation }) => {
        
        const _clickHeader = () => {
            const categoryId = navigation.getParam('categoryId');

            if(categoryId == '' || typeof categoryId != 'string') return;

            CategoryActions.addItem({ name: '제발되라', categoryId: categoryId });
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
        const { item } = this.props;
        const { _saveItem, _toggleEdit, _searchMap, _clickPhoto } = this;

        return (
            <ItemScreen 
                item={item}/>
        )
    }
}

export default connect(mapStateToProps)(ItemScreenContainer);