import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import v4 from 'uuid';

import firebase from '@/utils/firebase';

const initialState = fromJS({
    categories: {},

    items: {},

    currentCategory: {},
    
    currentItem: {},
    
    ui: {
        category: {
            mode: 0
        },
        items: {

        },
        item: {
            mode: 0
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
            name: name,
            isDeleted: false
        }

        return firebase.ref('categories').child(id).set(category).then(function(snapshot) {
            const data = {
                [id] : category
            }

            dispatch(addCategory(data));
        });
    }
}

export const firebase_editCategory = (category) => {
    return (dispatch) => {
        return firebase.ref('categories').child(category.id).set(category).then(function(snapshot) {
            dispatch(editCategory(category));
        });
    }
}

export const firebase_deleteCategory = (id) => {
    return (dispatch) => {
        return firebase.ref('categories/' + id).child('isDeleted').set(true).then(function(snapshot) {
            dispatch(deleteCategory(id));
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

        return firebase.ref("items").child(id).set(_item).then(function(snapshot) {
            const data = {
                [id] : _item
            }

            dispatch(addItem(data));
        });
    }
}

export const firebase_editItem = (item) => {
    return (dispatch) => {
        return firebase.ref('items').child(item.id).set(item).then(function(snapshot) {
            dispatch(editItem(item));
        });
    }
}

//Local Function
const LOAD_CATEGORIES = 'category/LOAD_CATEGORIES';
const ADD_CATEGORY = 'category/ADD_CATEGORY';
const EDIT_CATEGORY = 'category/EDIT_CATEGORY';
const DELETE_CATEGORY = 'category/DELETE_CATEGORY';
const SET_CURR_CATEGORY = 'category/SET_CURR_CATEGORY';

const LOAD_ITEMS = 'category/LOAD_ITEMS';
const ADD_ITEM = 'category/ADD_ITEM';
const EDIT_ITEM = 'category/EDIT_ITEM';
const DELETE_ITEM = 'category/DELETE_ITEM';
const SET_CURR_ITEM = 'category/SET_CURR_ITEM';

const SET_UI_MODE = 'category/SET_UI_MODE'

export const loadCategories = createAction(LOAD_CATEGORIES, categories => categories);
export const addCategory = createAction(ADD_CATEGORY, name => name);
export const editCategory = createAction(EDIT_CATEGORY, category => category);
export const deleteCategory = createAction(DELETE_CATEGORY, id => id);
export const setCurrentCategory = createAction(SET_CURR_CATEGORY, id => id);

export const loadItems = createAction(LOAD_ITEMS, items => items);
export const addItem = createAction(ADD_ITEM, name => name);
export const editItem = createAction(EDIT_ITEM, item => item);
export const deleteItem = createAction(DELETE_ITEM, id => id);
export const setCurrentItem = createAction(SET_CURR_ITEM, id => id);

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

    [EDIT_CATEGORY]: (state, action) => {
        const category = fromJS(action.payload);
        const id = category.get('id');

        return state.setIn(['categories', id], category);
    },

    [DELETE_CATEGORY]: (state, action) => {
        const id = action.payload;
      
        return state.setIn(['categories', id, 'isDeleted'], true);
    },

    [SET_CURR_CATEGORY]: (state, action) => {
        const category = action.payload;

        return state.set('currentCategory', category);
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

    [EDIT_ITEM]: (state, action) => {
        const item = fromJS(action.payload);
        const id = item.get('id');

        return state.setIn(['items', id], item).set('currentItem', item);
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

    [SET_CURR_ITEM]: (state, action) => {
        const item = action.payload;

        return state.set('currentItem', item);
    },

    [SET_UI_MODE]: (state, action) => {
        const sector = action.payload.sector;
        const mode = action.payload.mode;
        const value = action.payload.value;
        
        return state.setIn(['ui', sector, mode], value);
    },

}, initialState);