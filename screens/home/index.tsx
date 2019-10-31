import { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CategoryActions } from '@/stores/actionCreators';
import HomeScreen from './HomeScreen';

interface Props {
    categoryList: []
}

class HomeScreenContainer extends Component<Props> {

    _categoryClick = () => {
        CategoryActions.onCategoryClick();
    }

    render(){
        const { categoryList } = this.props;
        const { _categoryClick } = this;

        return (
            <HomeScreen 
                categoryList={categoryList}
                onCategoryClick={_categoryClick}/>
        )
    }
}

const mapStateToProps = (state) => ({
    categoryList: state.category.get('categoryList')
});

export default connect(mapStateToProps)(HomeScreenContainer);