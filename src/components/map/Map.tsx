import { Feature, FeatureCollection, Geometry, GeoJsonProperties} from 'geojson';

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




  let organizationMembersArray = organizations[props.currentOrganization  as keyof typeof organizations];

    const membersWithoutStatusStyle = {
      style:  {
        "color": "rgb(30 58 138)",
        "weight": 5,
        "opacity": 0.5
    }}

    const membersWithoutStatus = {...world_countries_featureCollection}.features
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



    // const [membersWithStatus, setmembersWithStatus] = useState<Feature[]>(membersWithStatusFirst)

 
  console.warn(membersWithStatus, membersWithoutStatus, ":))))))")

  return (
    <>
     <MapContainer  style = {{width: "100%", height: "80vh", zIndex: 5}} center={[49.505, 25.09]} zoom={5}>
  <TileLayer
      //this commented tile layer can be used for additional color theme
      // attribution= {`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
      //url='https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=3f19809ebd064b10a80b4ea7d2035c35'
      url ='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  />


  {
    membersWithoutStatus.map((e, index) => {
      console.log("Everbody wants to rule the world without status", membersWithoutStatus);


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
</MapContainer>  
    </>
  )
}

export default Map