import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as categoryActions from '../modules/category';
import CategoryList from '../components/CategoryList';

const mapStateToProps = (state) => ({
    categoryList: state.category.get('categoryList')
});

const mapDispatchToProps = (dispatch) => bindActionCreators(categoryActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

