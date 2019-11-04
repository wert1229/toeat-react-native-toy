import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { v4 } from 'uuid';

const initialState = fromJS({
    categories: {
        byId: {
            '1': {
                id: '1',
                name: '만두',
                items: ['1', '3']
            },
            '2': {
                id: '2',
                name: '라멘',
                items: ['2']
            }
        },
        allId: ['1', '2']
    },

    items: {
        byId: {
            '1': {
                id: '1',
                name: '신포만두'
            },
            '2': {
                id: '2',
                name: '아오리라멘'
            },
            '3': {
                id: '3',
                name: '쟈니덤플링'
            }
        },
        allId: ['1', '2', '3']
    },

    clickedCategory: ''
});

const LOAD_CATEGORY = 'category/LOAD_CATEGORY';
const ADD_CATEGORY = 'category/ADD_CATEGORY';
const DELETE_CATEGORY = 'category/DELETE_CATEGORY';
const CLICK_CATEGORY = 'category/CLICK_CATEGORY';

const ADD_ITEM = 'category/ADD_ITEM';
const DELETE_ITEM = 'category/DELETE_ITEM';
const CLICK_ITEM = 'category/CLICK_ITEM';

export const loadCategory = createAction(LOAD_CATEGORY, initData => initData);
export const addCategory = createAction(ADD_CATEGORY, name => name);
export const deleteCategory = createAction(DELETE_CATEGORY, id => id);
export const clickCategory = createAction(CLICK_CATEGORY, id => id);

export const addItem = createAction(ADD_ITEM, name => name);
export const deleteItem = createAction(DELETE_ITEM, id => id);
export const clickItem = createAction(CLICK_ITEM, id => id);

export default handleActions({
    [LOAD_CATEGORY]: (state, action) => {
        
    },

    [ADD_CATEGORY]: (state, action) => {
        const id = v4();
        const name = action.payload;

        let categories = state.get('categories');
        
        categories = categories.withMutations((categories) => {
            const byId = categories.get('byId');
            const allId = categories.get('allId');
            const object = fromJS({
                id: id,
                name: name,
                items: []
            });

            return categories.set('byId', byId.set(id, object)).set('allId', allId.push(id));
        });

        return state.set('categories', categories);
    },

    [DELETE_CATEGORY]: (state, action) => {
        const id = action.payload;

        let categories = state.get('categories');
        
        categories = categories.withMutatuibs((categories) => {
            const byId = categories.get('byId');
            const allId = categories.get('allId');

            return categories.set('byId', byId.delete(id))
                             .set('allId', allId.delete( allId.findIndex((_id) => (_id === id)) ));
        });
    },

    [CLICK_CATEGORY]: (state, action) => {
        const id = action.payload;

        return state.set('clickedCategory', id);
    },

    [ADD_ITEM]: (state, action) => {
        const id = v4();
        const name = action.payload.name;
        const categoryId = action.payload.categoryId;

        let categoryItems = state.getIn(['categories', 'byId', categoryId, 'items']);
        let items = state.get('items');

        items = items.withMutations((items) => {
            const byId = items.get('byId');
            const allId = items.get('allId');
            const object = fromJS({
                id: id,
                name: name
            });

            return items.set('byId', byId.set(id, object)).set('allId', allId.push(id));
        });

        return state.withMutations((state) => {
            return state.setIn(['categories', 'byId', categoryId, 'items'], categoryItems.push(id)).set('items', items);
        });
    },

    [DELETE_ITEM]: (state, action) => {
        const id = action.payload;

        let categories = state.get('categories');
        
        categories = categories.withMutatuibs((categories) => {
            const byId = categories.get('byId');
            const allId = categories.get('allId');

            return categories.set('byId', byId.delete(id))
                             .set('allId', allId.delete( allId.findIndex((_id) => (_id === id)) ));
        });
    },

    [CLICK_ITEM]: (state, action) => {
        const id = action.payload;

        return state.set('clickedCategory', id);
    },
}, initialState);