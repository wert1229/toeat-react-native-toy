import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as homeActions from '@/stores/modules/category';
import IntroScreen from './IntroScreen';



const mapStateToProps = (state) => ({
    categoryList: state.category.get('categoryList')
});

const mapDispatchToProps = (dispatch) => bindActionCreators(homeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreenContainer);
