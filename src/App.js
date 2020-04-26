import React from 'react';
import './App.css';
import WordBoard from './WordBoard';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducer from './BoardReducer';

function App() {
  const store = createStore(reducer);

  return (
    <div className="App">
      <Provider store={store}>
        <WordBoard />
      </Provider>
    </div>
  );
}

export default App;
