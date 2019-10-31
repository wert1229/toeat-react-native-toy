import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import reducers from '@/stores'
import RootStack from '@/screens';

const store = createStore(reducers);

export default () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>   
  );
}