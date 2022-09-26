import { Feature} from 'geojson';
import Control from 'react-leaflet-custom-control'
import { MapContainer, TileLayer, Popup, GeoJSON } from 'react-leaflet'
import {useState, useEffect} from 'react'
import MapSettings from "./MapSettings"

//leaflet coordinates for all states in the world
import world_countries_featureCollection  from '../../data/world_countries_featureCollection.json'

//object of inter governmental organisations (IGOs), each organisation is an array in the structure [ state, status in IGO]  
import organizations from "../../data/IGOs.json"

interface MapTheme {
  name: string,
  url: string,
  selected: boolean,
  memberCountriesColor: string,
  memberCountriesWithStatusColor: string
}

  interface mapProps {
    currentOrganization: string
  }
const Map = ({currentOrganization } : mapProps) => {

  const [mapHovered, setMapHovered] = useState(false)
  const [fullscreenOn, setfullscreenOn] = useState(true)




  const [themes, setthemes] = useState([
    {name: "railway theme", url: 'https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=3f19809ebd064b10a80b4ea7d2035c35',
     selected: false, memberCountriesColor: "red", memberCountriesWithStatusColor: "purple",
      },
    {name: "dark blue theme", url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", selected: true, memberCountriesColor: "rgb(30 58 138)", 
    memberCountriesWithStatusColor: "rgb(30 58 138)",
 },
  ])

  //icon to make map fullscreen
  const fullscreenIcon =   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
  </svg>


  function changeTheme(index: number) {
    let themeCopy = themes;
    themeCopy = themeCopy.map((theme : MapTheme) =>{ 
    theme.selected = false
      return theme
  })
  themes[index].selected = true
  setthemes(themeCopy)
  }


  //find selected theme by finding the one where selelcted property is true
  const selectedTheme = themes[(themes.findIndex((theme: MapTheme) => theme.selected === true))]

  let organizationMembersArray = organizations[currentOrganization  as keyof typeof organizations];

    const membersWithoutStatusStyle = {
      style:  {
        "color": selectedTheme.memberCountriesColor,
        "weight": 5,
        "opacity": 0.6
    }}

    const membersWithoutStatus : Feature[] = {...world_countries_featureCollection}.features
    //filter if the country of feature is in the IGOs list of members
    .filter(feature => organizationMembersArray.organizations
      //filter every feature which name is in the organisationsArray
      .some((org : Array<string>) => org[0] === feature.properties.name && org[1] === "")
    ) 
    .map(feature => feature as Feature)


    const membersWithStatusStyle = {
    style:  {
      "color":  selectedTheme.memberCountriesWithStatusColor,
      "weight": 5,
      "opacity": 0.15
    }}

     const membersWithStatus: Feature[] =  {...world_countries_featureCollection}.features
    //filter if the country of feature is in the IGOs list of members
    .filter(feature => organizationMembersArray.organizations
      //filter every feature which name is in the organisationsArray
      .some((organization : Array<string>) => organization[0] === feature.properties.name && organization[1] !== ""))
    //add status to feature properties
    .map(feature => {
      organizationMembersArray.organizations.forEach( organization => {
        if(organization[0] === feature.properties.name){
          let featuresPropertiestWithStatus = Object.assign({status: organization[1]}, feature.properties);
          feature = Object.assign(feature, {properties: featuresPropertiestWithStatus});
        }
      })
    return feature as Feature   
    }) 
 

  const fullScreenMapStyle = {top: 0, right: 0, bottom: 0, left: 0, width: "100%", height: "100%", zIndex: 5, position: "fixed", overflow: "hidden"}

  const basicMapStyle = {width: "100%", height:  "80vh", zIndex: 5}

    console.log(fullscreenOn);

  return (
    <div onMouseEnter = {() => {setMapHovered(true)}}  onMouseLeave = {() => {setMapHovered(false)}}>
     <MapContainer  key={currentOrganization + selectedTheme.name + String(fullscreenOn)}   style = {!fullscreenOn ?  basicMapStyle : fullScreenMapStyle}   center={[49.505, 25.09]} zoom={5}>
      <TileLayer  url ={selectedTheme.url}/>

  {
    membersWithoutStatus.map((e, index) => {
      return <GeoJSON  key = {'membersWithoutStatus' + currentOrganization + index} {...membersWithoutStatusStyle} data = {e} >
        <Popup>
        {e.properties ? ` ${e.properties.sovereignt} \n - full member` : "data of this country could not be loaded"}
        </Popup>
      </GeoJSON>
    })
  }
  {

    membersWithStatus.map((e, index) =>  <GeoJSON key = {'membersWithStatus' + currentOrganization + index} {...membersWithStatusStyle}  data = {e}>
        <Popup>
          {e.properties ? `${e.properties.sovereignt} \n has ${e.properties.status} status in the organisation ` : "data of this country could not be loaded"}
        </Popup>
      </GeoJSON>
    )
  }
    {/* the triggering icon */}
  <Control  prepend position='topright'>
    {mapHovered ? 
      <div className='flex flex-row relative  mr-5 mt-4 '>
          
          <MapSettings  changeTheme={changeTheme} themes={themes} ></MapSettings>
          &nbsp;
          &nbsp;
          <div onClick={() => {setfullscreenOn(!fullscreenOn)}}   className=' p-3 h-fit w-fit bg-blue-400 bg-opacity-50  hover:cursor-pointer hover:bg-opacity-100 rounded-full'>{fullscreenIcon}</div>

      </div> 
      : 
      <></>}
  </Control>

   
</MapContainer>  
    </div>
  )
}

export default Map