import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

import Header from './components/Header';
import Board from './components/Board';

import store from './store'

import './global.scss'

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Header/>
        <Board/>
      </DndProvider>
    </Provider>
  );
}

export default App;
