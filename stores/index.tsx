import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';

export default createStore(reducers, applyMiddleware(thunk));
