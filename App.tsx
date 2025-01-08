import React from 'react'
import { Provider } from 'react-redux';
import Store from './src/store/store'
import {NavigationContainer} from '@react-navigation/native';
import  StackNavigation  from './src/navigation/stacknavigation';

const App = () => {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
    </Provider>
  );
};

export default App;