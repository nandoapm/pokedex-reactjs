import React from 'react';

import List from '../List'
import Pokedex from '../Pokedex'
import './styles.scss'

export default function Board() {
  return (
      <div className="container-board">
        <Pokedex />
        <List />
      </div>
  );
}
