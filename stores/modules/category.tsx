import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const initialState = fromJS({
    categoryList: 
    [
        {
            name: '만두',
        },
        {
            name: '돈까스',
        },
        {
            name: '냉면',
        }
    ],
    itemList: 
    [   //TODO
        {
            name: '만두',
        },
        {
            name: '돈까스',
        },
        {
            name: '냉면',
        }
    ],

});

const LOAD_DATA = 'home/LOAD_DATA';

export const onCategoryClick = createAction(LOAD_DATA) //{index}

export default handleActions({
    [LOAD_DATA]: (state, action) => {}
}, initialState);