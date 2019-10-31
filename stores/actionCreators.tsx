import { bindActionCreators } from 'redux';

import store from './index';
import * as categoryActions from './modules/category';

const { dispatch } = store;

export const CategoryActions = bindActionCreators(categoryActions, dispatch);