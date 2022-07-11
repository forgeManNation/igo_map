import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/searchbar/SearchBar';
import Map from "./components/map/Map"
import "@material-tailwind/react/tailwind.css";

function App() {

  const [curentOrg, setcurentOrg] = useState("")
  function changeCurrentOrg(org: string) {
   setcurentOrg(org)
  }

  return (
    <div className="App ">
      <div className="flex gap-4 ">
        <SearchBar changeCurrentOrg={changeCurrentOrg}></SearchBar> 
        <Map organization={curentOrg}></Map>
      </div>
    </div>
  );
}

export default App;