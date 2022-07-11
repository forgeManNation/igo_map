import organisations from "../../data/IGOs.json"
import worldCountriesInformation from "../../data/world_countries_information.json"
import WikiPicture from "./wikipicture/WikiPicture"



interface searchBarProps {
  changeCurrentOrg: (org: string) => void
}

const SearchBar = (props : searchBarProps) => {


  let europeanCountries = worldCountriesInformation.filter(countryData => {
    if(countryData.continent === "Asia"){
      return true;
    }
    return false
  })

//   interface country {
//     myString: string;
//     myNumber: number;
// }

  
// let organisations2 : { [key: string]: string[][] }  = organizations

let organisationsArray = [];


// for (var key in organisations) {
//   if (organisations.hasOwnProperty(key)) {
//     organisationsArray.push(organisations[key])
    
//   }
// }

 for (const organisation in Object.keys(organisations)){
  organisationsArray.push(organisation)
 }



 
 


  return (
    <div className= "bg-gray-800 h-screen overflow-scroll" style={{scrollbarColor: "#999 #333"}} >
        <div >SearchBar</div>
        
        <div className="flex justify-center ">
              <input type="search"
               className="form-control flex-auto min-w-0 block 
               px-3 py-1.5 text-base font-normal text-gray-700 
               bg-white bg-clip-padding border border-solid 
               border-gray-300 rounded transition 
               ease-in-out m-0 focus:text-gray-700 
               focus:bg-white focus:border-blue-600
                focus:outline-none" placeholder="Search" 
                aria-label="Search">
              </input>
              <button className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
                
              </button>
            
        
        </div>

        <div>
         
        </div>


        <div>


        {
            Object.keys(organisations)
            .map((org: string) => {
              return(
                <div onClick={() => props.changeCurrentOrg(org)}>
                {/* <a href = {"https://en.wikipedia.org/wiki/" + org}> */}
                <WikiPicture orgName = {org}></WikiPicture>
                <span>{org}</span>
                {/* </a> */}
                <br></br>
                </div>
              )
            }
          )}
          
          {/* THERE SHALL GO ORGANISATIONS REFORMED */}
          {
          
          }
          {/* {organizations.map(organization : { [key: string]: string[][] }  => {

            return <span>{"sdcoksadcdok"}</span>
          })} */}
          

          {/* {} */}



          {europeanCountries.map((element, index) => {

          // let populationInMillions = element.population;
          // populationInMillions = populationInMillions * 2;
          // console.log(typeof populationInMillions, "novy clovek!");
          


          return <span key = {"country-" + index}>
            <h1 className='text-lg text-blue-800'>{element.country}</h1>
            <p data-tooltip-target="tooltip-continent">{element.continent}</p>
            <div id="tooltip-continent" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Continent
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <p data-tooltip-target="tooltip-city" className='flex justify-center gap-2 text-amber-900 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
              {element.city}
            </p>
            <div id="tooltip-city" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Capital city
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
           

            <p data-tooltip-target="tooltip-population" className=' text-green-800 flex justify-center gap-2 ' >
            <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
              {element.population}
              </p>

              <div id="tooltip-population" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Population
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

             

              <img style={{display: "block",
              marginLeft: "auto",
              marginRight: "auto" }}
              className = "w-28" src={element.flag_base64!}  />
              <div className="py-4">
                  <div className="w-full border-t border-gray-300"></div>
              </div>
          </span>
        })}</div>
  
    </div>
  )
}

export default SearchBar