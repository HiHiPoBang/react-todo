import React from 'react';
import './App.scss';
import TodoView from './views/TodoView';

const App = function () {
  return (
    <div className="App" data-qa="App">
      <TodoView data-qa="App_todoView" />
    </div>
  );
};

export default App;
