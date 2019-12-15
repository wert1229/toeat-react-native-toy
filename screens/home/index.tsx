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

    _addCategory = (name) => {
        CategoryActions.firebase_addCategory(name);
    }

    _editCategory = (category) => {
        CategoryActions.firebase_editCategory(category.toJS());
    }

    _deleteCategory = (id) => {
        CategoryActions.firebase_deleteCategory(id);
    }

    _clickCategory = (category) => {
        CategoryActions.clickCategory(category);
        this.props.navigation.navigate('Items', { title: category.get('name')});
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            CategoryActions.clickItem({});
            CategoryActions.firebase_loadCategories();
        });
    }

    render() {
        const { categories } = this.props;
        const { _addCategory, _editCategory, _deleteCategory, _clickCategory } = this;

        return (
            <HomeScreen 
                categories={categories}
                addCategory={_addCategory}
                editCategory={_editCategory}
                deleteCategory={_deleteCategory}
                clickCategory={_clickCategory} />
        )
    }
}

export default connect(mapStateToProps)(HomeScreenContainer);