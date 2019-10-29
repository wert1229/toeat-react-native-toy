import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const CATEGORY_CLICK = 'category/CATEGORY_CLICK';

const initialState = fromJS({
    categoryList: 
    [
        {
            name: '만두',
            itemList: 
            [
                {
                    name: '신포만두'
                }
            ]
        }
    ]    
});

export const onCategoryClick = createAction(CATEGORY_CLICK) //{index}

export default handleActions({
    [CATEGORY_CLICK]: (state, action) => {}
}, initialState);