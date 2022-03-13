import React, {useState} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import Map from "./Map"
import "@material-tailwind/react/tailwind.css";
function App() {


  

  const [input, setinput] = useState("");
  

  let appJsProps = {
    color: input
  }

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    let newInput : string = e.target.value;

    setinput(newInput)
    
  }


  return (
    <div className="App ">
      <div className="flex gap-4 ">
        <SearchBar ></SearchBar> 
        <Map></Map>
      </div>
      
    </div>
  );
}

export default App;
