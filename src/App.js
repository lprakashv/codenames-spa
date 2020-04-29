import React from 'react';
import './App.css';
import WordBoard from './components/WordBoard';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducer from './reducers/BoardReducer';

export const store = createStore(reducer);

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
