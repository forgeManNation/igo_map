import { Feature, FeatureCollection, Geometry, GeoJsonProperties} from 'geojson';
import Control from 'react-leaflet-custom-control'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import {useEffect, createRef, useState} from 'react'

//leaflet coordinates for all states in the world
import world_countries_featureCollection  from '../../data/world_countries_featureCollection.json'

//object of inter governmental organisations (IGOs), each organisation is an array in the structure [ state, status in IGO]  
import organizations from "../../data/IGOs.json"

  interface mapProps {
    currentOrganization: string;
  }
const Map = (props : mapProps) => {


  const [mapHovered, setMapHovered] = useState(false)

  const mapIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>




  let organizationMembersArray = organizations[props.currentOrganization  as keyof typeof organizations];

    const membersWithoutStatusStyle = {
      style:  {
        "color": "rgb(30 58 138)",
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
      "color":  "rgb(30 58 138)",
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


    console.warn("WHATTTTTTTTTTTTTTTTTTTTTTTT");
    

  return (
    <div onMouseEnter = {() => {setMapHovered(true)}} onMouseLeave = {() => {setMapHovered(false)}}>
     <MapContainer   style = {{width: "100%", height: "80vh", zIndex: 5}} center={[49.505, 25.09]} zoom={5}>
      <TileLayer
          //this commented tile layer can be used for additional color theme
          // attribution= {`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
          //url='https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=3f19809ebd064b10a80b4ea7d2035c35'
          url ='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />


  {
    membersWithoutStatus.map((e, index) => {

      return <GeoJSON  key = {'membersWithoutStatus' + index + Math.random()} {...membersWithoutStatusStyle} data = {e} >
        <Popup>
        {e.properties ? ` ${e.properties.sovereignt} \n - full member` : "data of this country could not be loaded"}
        </Popup>
      </GeoJSON>
    })
  }
  {
    membersWithStatus.map((e, index) => {
      console.log("Everbody wants to rule the world with the freaking status", membersWithoutStatus);
      
      return <GeoJSON key = {'membersWithStatus' + index + Math.random()} {...membersWithStatusStyle}  data = {e}>
        <Popup>
          {e.properties ? `${e.properties.sovereignt} \n has ${e.properties.status} status in the organisation ` : "data of this country could not be loaded"}
        </Popup>
      </GeoJSON>
    })
  }
{/* onClick={() => setOpen(!open)} */}
{/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">  */}
    {/* the triggering icon */}
  <Control prepend position='topright'>

    {
    mapHovered ?
    <div  className=' m-2 w-fit p-4 h-fit bg-blue-400 bg-opacity-80  hover:cursor-pointer hover:bg-opacity-100 rounded-full'>{mapIcon}</div> 
    :
    <></>
    }
  </Control>



</MapContainer>  
    </div>
  )
}

export default Map