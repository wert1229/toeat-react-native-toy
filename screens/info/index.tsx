import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as infoActions from '@/stores/info';
import InfoScreen from './InfoScreen';

const mapStateToProps = (state) => ({
    categoryList: state.category.get('categoryList')
});

const mapDispatchToProps = (dispatch) => bindActionCreators(infoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);