import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import HomeScreen from './HomeScreen';

interface Props {
    categories: {},
    isAddMode: boolean,
    navigation: any
}

const mapStateToProps = (state) => ({
    categories: state.category.get('categories'),
    isAddMode: state.category.get('ui').get('category').get('isAddMode')
});

class HomeScreenContainer extends Component<Props> {

    //Navigation Part
    static navigationOptions = ({ navigation }) => {
        return {
            title: '카테고리'
        };
    };

    //Body Part
    _setAddMode = (visible) => {
        CategoryActions.setCateAddmode(visible);
    }

    _addCategory = (name) => {
        CategoryActions.addCategory(name);
    }

    _deleteCategory = (id) => {
        CategoryActions.deleteCategory(id);
    }

    _clickCategory = (id, name) => {
        CategoryActions.clickCategory(id);
        this.props.navigation.navigate('Items', { title: name });
    }

    render(){
        const { categories, isAddMode } = this.props;
        const { _setAddMode, _addCategory, _deleteCategory, _clickCategory } = this;

        return (
            <HomeScreen 
                categories={categories}
                isAddMode={isAddMode}
                setAddMode={_setAddMode}
                addCategory={_addCategory}
                deleteCategory={_deleteCategory}
                clickCategory={_clickCategory} />
        )
    }
}

export default connect(mapStateToProps)(HomeScreenContainer);