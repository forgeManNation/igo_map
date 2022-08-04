import organisations from "../../data/IGOs.json"

import {useState} from "react"

import React from 'react'

// icon to hide the sidebar
const arrowCircleLeft = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
</svg>;

// icon to show the sidebar
const arrowCircleRight = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
</svg>;

interface searchBarProps {
  changeCurrentOrg: (org: string) => void,
  triggerIntroductionModal: () => void
}
const SearchBar = (props : searchBarProps) => {

const [searchValue, setsearchValue] = useState("")
const [sideBarLarge, setsideBarLarge] = useState(false)

function changeSearchValue (e : React.FormEvent<HTMLInputElement>){
  setsearchValue(e.currentTarget.value)
}

function sideBarShow (){
  setsideBarLarge(!sideBarLarge)
}

let organisationsArray = [];

 for (const organisation in Object.keys(organisations)){
  organisationsArray.push(organisation)
 }

return (
  !sideBarLarge ?
  <div className= "bg-gray-800 text-white h-screen sticky top-0 overflow-hidden" style={{scrollbarColor: "#999 #333", display: "flex", flexFlow: "column"}} >
      {/* Searchbar and Title */}
      <div >
      <div className=" absolute  top-2 right-2" onClick={sideBarShow} >{arrowCircleLeft} </div>
      <h1 className=" text-4xl mb-4 mt-5 cursor-pointer" onClick={props.triggerIntroductionModal}>IGO Map</h1>
      <div className="flex justify-center m-4 ">
            <input type="search"
              className="form-control flex-auto min-w-0 block 
              text-lg font-normal text-gray-700 
              bg-white bg-clip-padding border border-solid 
              border-gray-300 rounded transition 
              ease-in-out m-0 focus:text-gray-700 
              focus:bg-white focus:border-blue-900
              focus:outline-none" placeholder="Search" 
              aria-label="Search" onChange={changeSearchValue}>
            </input>
      </div>
      </div>

      {/* IGO list */}
      <div className="overflow-y-auto  overflow-hidden" >
      {
          Object.keys(organisations)
          .filter(org => 
            org.match(new RegExp(searchValue, "i"))
          )
          .map((org: string, index) => {
            return(      
              <div className = {`hover:bg-blue-800 ${index % 2 ? "bg-gray-800": "bg-gray-600"}`}>
              <p onClick={() => props.changeCurrentOrg(org)} className="p-3 cursor-pointer">{org}</p>
              </div>
            )
          }
        )}
        
      </div>
  </div>
:
<div className= "bg-gray-800 text-white h-screen sticky top-0 overflow-hidden flex flex-col"  >
<div className=" m-3" onClick={sideBarShow} >{arrowCircleRight} </div>
</div>

)
}

export default SearchBar