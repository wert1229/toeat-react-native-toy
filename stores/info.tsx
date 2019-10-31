import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const URL_CLICK = 'info/URL_CLICK';

const initialState = fromJS({
    
});

export const onCategoryClick = createAction(URL_CLICK)

export default handleActions({
    [URL_CLICK]: (state, action) => {}
}, initialState);