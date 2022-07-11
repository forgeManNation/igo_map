import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/searchbar/SearchBar';
import Map from "./components/map/Map"
import "@material-tailwind/react/tailwind.css";
import IntroductionModal from './components/IntroductionModal';

function App() {

  const [curentOrg, setcurentOrg] = useState("")
  function changeCurrentOrg(org: string) {
   setcurentOrg(org)
  }

  console.log("just a small test");
  


  return (
    <div className="App ">
      
      <div className="flex gap-4 ">
        <SearchBar changeCurrentOrg={changeCurrentOrg}></SearchBar> 
        <Map organization={curentOrg}></Map>
        
      <IntroductionModal></IntroductionModal>
      
      </div>
    </div>
  );
}

export default App;