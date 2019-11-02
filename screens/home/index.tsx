import React, { Component } from 'react'
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import HomeScreen from './HomeScreen';

interface Props {
    categories: []
}

const mapStateToProps = (state) => ({
    categories: state.category.get('categories')
});

class HomeScreenContainer extends Component<Props> {

    _addCategory = (name) => {
        CategoryActions.addCategory(name);
    }

    _deleteCategory = (id) => {
        CategoryActions.deleteCategory(id);
    }

    _clickCategory = (id) => {
        CategoryActions.clickCategory(id);
    }

    render(){
        const { categories } = this.props;
        const { _addCategory, _deleteCategory, _clickCategory } = this;

        return (
            <HomeScreen 
                categories={categories}
                addCategory={_addCategory}
                deleteCategory={_deleteCategory}
                clickCategory={_clickCategory} />
        )
    }
}

export default connect(mapStateToProps)(HomeScreenContainer);