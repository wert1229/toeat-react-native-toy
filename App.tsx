import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import reducers from './modules'
import Main from './components/Main';

const store = createStore(reducers);

export default () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>   
  );
}