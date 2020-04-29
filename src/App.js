import React from 'react';
import './App.css';
import WordBoard from './components/WordBoard';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { devToolsEnhancer } from 'redux-devtools-extension';


import reducer from './reducers/BoardReducer';

export const store = (process.env.NODE_ENV === 'production') ? createStore(reducer) : createStore(reducer, devToolsEnhancer({}));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <WordBoard />
      </Provider>
    </div>
  );
}

export default App;
