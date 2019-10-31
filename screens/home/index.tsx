import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as homeActions from '@/stores/home';
import HomeScreen from './HomeScreen';

const mapStateToProps = (state) => ({
    categoryList: state.category.get('categoryList')
});

const mapDispatchToProps = (dispatch) => bindActionCreators(homeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

