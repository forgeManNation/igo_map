import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Table from './features/table/Table';
import Penny from "./penny/Penny"

function App() {
  return (
    <div className="App">
      
        {/* <Penny></Penny> */}
        <Table></Table>
        <Counter />
      
    </div>
  );
}

export default App;
