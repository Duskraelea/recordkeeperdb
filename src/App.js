import React, { Component } from 'react';
import './App.css';
import Ability from './ability';
import Character from './character';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Character />
      </div>
    );
  }
}

export default App;