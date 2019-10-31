import React from 'react';
import { Provider } from 'react-redux'

import store from '@/stores';
import RootStack from '@/screens';

export default () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>   
  );
}