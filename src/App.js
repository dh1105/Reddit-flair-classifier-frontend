import React from 'react';
import Main from './MainComponent';
import './App.css';
import { store } from './_helpers';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Main />
      </div>
    </Provider>
  );
}

export default App;
