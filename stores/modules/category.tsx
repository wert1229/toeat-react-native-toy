import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import v4 from 'uuid';

import firebase from '@/utils/firebase';

const initialState = fromJS({
    categories: {},

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
                desc: 'TEST__',
                categoryId: ''
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

    tempItem: {},
    
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

//Firebase Function
export const firebase_loadCategories = () => {
    return (dispatch) => {
        return firebase.ref('categories').once('value').then(function(snapshot) {
            let data = snapshot.val();
            data = data ? data : {};
            dispatch(loadCategories(data));
        });
    }
}

export const firebase_addCategory = (name) => {
    return (dispatch) => {
        const id = v4();

        const category = {
            id: id,
            name: name
        }

        return firebase.ref('categories').child(id).set(category).then(function(snapshot) {
            const data = {
                [id] : category
            }

            dispatch(addCategory(data));
        });
    }
}

export const firebase_loadItems = (categoryId) => {
    return (dispatch) => {
        return firebase.ref('items').orderByChild('categoryId').equalTo(categoryId)
        .once("value").then(function(snapshot) {
            let data = snapshot.val();
            data = data ? data : {};
            dispatch(loadItems(data));
        });
    }
}

export const firebase_addItem = (item) => {
    return (dispatch) => {
        const id = v4();
        const _item = {
            id: id,
            ...item
        }
        console.log(_item)
        return firebase.ref("items").child(id).set(_item).then(function(snapshot) {
            const data = {
                [id] : _item
            }

            dispatch(addItem(data));
        });
    }
}

//Local Function
const LOAD_CATEGORIES = 'category/LOAD_CATEGORIES';
const ADD_CATEGORY = 'category/ADD_CATEGORY';
const DELETE_CATEGORY = 'category/DELETE_CATEGORY';
const CLICK_CATEGORY = 'category/CLICK_CATEGORY';

const SET_CATE_ADDMODE = 'category/SET_CATE_ADDMODE';

const LOAD_ITEMS = 'category/LOAD_ITEMS';
const ADD_ITEM = 'category/ADD_ITEM';
const DELETE_ITEM = 'category/DELETE_ITEM';
const CLICK_ITEM = 'category/CLICK_ITEM';

const SET_UI_MODE = 'category/SET_UI_MODE'

export const loadCategories = createAction(LOAD_CATEGORIES, categories => categories);
export const addCategory = createAction(ADD_CATEGORY, name => name);
export const deleteCategory = createAction(DELETE_CATEGORY, id => id);
export const clickCategory = createAction(CLICK_CATEGORY, id => id);

export const setCateAddmode = createAction(SET_CATE_ADDMODE, visible => visible);

export const loadItems = createAction(LOAD_ITEMS, items => items);
export const addItem = createAction(ADD_ITEM, name => name);
export const deleteItem = createAction(DELETE_ITEM, id => id);
export const clickItem = createAction(CLICK_ITEM, id => id);

export const setUiMode = createAction(SET_UI_MODE);

export default handleActions({
    [LOAD_CATEGORIES]: (state, action) => {
        const categories = fromJS(action.payload);

        return state.set("categories", categories);
    },

    [ADD_CATEGORY]: (state, action) => {
        const category = fromJS(action.payload);
        const categories = state.get('categories').merge(category);

        return state.set('categories', categories);
    },

    [DELETE_CATEGORY]: (state, action) => {
        const id = action.payload;
        const category = {}
        let categories = state.get('categories').merge(category);
        
        categories = categories.withMutatuibs((categories) => {
            const byId = categories.get('byId');
            const allId = categories.get('allId');

            return categories.set('byId', byId.delete(id))
                             .set('allId', allId.delete( allId.findIndex((_id) => (_id === id)) ));
        });
    },

    [CLICK_CATEGORY]: (state, action) => {
        const category = action.payload;

        return state.set('clickedCategory', category);
    },

    [SET_CATE_ADDMODE]: (state, action) => {
        const visible = action.payload;

        return state.update('ui', (ui) => ui.update('category', (category) => category.set('isAddMode', visible)));
    },

    [LOAD_ITEMS] : (state, action) => {
        const items = fromJS(action.payload);
        
        return state.set("items", items);
    },

    [ADD_ITEM]: (state, action) => {
        const item = fromJS(action.payload);
        const items = state.get('items').merge(item);

        return state.set('items', items);
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