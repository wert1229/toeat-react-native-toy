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
                isDone: false,
                name: '신포만두',
                location: {
                    latitude: 37.604697,
                    longitude: 127.064956
                },
                images: {

                },
                address: '서울시 서대문구',
                menu: '만두',
                price: '8000',
                score: '3',
                desc: 'TEST__'
            },
            '2': {
                id: '2',
                isDone: false,
                name: '아오리라멘',
                location: {

                },
                images: {

                },
                address: '',
                menu: '',
                price: '',
                score: '',
                desc: ''
            },
            '3': {
                id: '3',
                isDone: false,
                name: '쟈니덤플링',
                location: {

                },
                images: {

                },
                address: '',
                menu: '',
                price: '',
                score: '',
                desc: ''
            }
        },
        allId: ['1', '2', '3']
    },

    clickedCategory: '',

    clickedItem: '',

    tempItem: {

    },
    
    ui: {
        category: {
            isAddMode: false,
            isEditMode: false
        },
        items: {

        },
        item: {
            isAddMode: false,
            isEditMode: false 
        }
    }
});

const LOAD_CATEGORY = 'category/LOAD_CATEGORY';
const ADD_CATEGORY = 'category/ADD_CATEGORY';
const DELETE_CATEGORY = 'category/DELETE_CATEGORY';
const CLICK_CATEGORY = 'category/CLICK_CATEGORY';

const SET_CATE_ADDMODE = 'category/SET_CATE_ADDMODE';

const ADD_ITEM = 'category/ADD_ITEM';
const DELETE_ITEM = 'category/DELETE_ITEM';
const CLICK_ITEM = 'category/CLICK_ITEM';

const SET_UI_MODE = 'category/SET_UI_MODE'

export const loadCategory = createAction(LOAD_CATEGORY, initData => initData);
export const addCategory = createAction(ADD_CATEGORY, name => name);
export const deleteCategory = createAction(DELETE_CATEGORY, id => id);
export const clickCategory = createAction(CLICK_CATEGORY, id => id);

export const setCateAddmode = createAction(SET_CATE_ADDMODE, visible => visible);

export const addItem = createAction(ADD_ITEM, name => name);
export const deleteItem = createAction(DELETE_ITEM, id => id);
export const clickItem = createAction(CLICK_ITEM, id => id);

export const setUiMode = createAction(SET_UI_MODE);

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

    [SET_CATE_ADDMODE]: (state, action) => {
        const visible = action.payload;

        return state.update('ui', (ui) => ui.update('category', (category) => category.set('isAddMode', visible)));
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

        return state.set('clickedItem', id);
    },

    [SET_UI_MODE]: (state, action) => {
        const sector = action.payload.sector;
        const mode = action.payload.mode;
        const value = action.payload.value;
        
        return state.setIn(['ui', sector, mode], value);
    },

}, initialState);