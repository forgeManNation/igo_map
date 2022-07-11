import { Feature, FeatureCollection, Geometry, GeoJsonProperties} from 'geojson';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'

//leaflet coordinates for all states in the world
import countries  from '../../data/world_countries_featureCollection.json'

//object of inter governmental organisations (IGOs), each organisation is an array in the structure [ state, status in IGO]  
import organizations from "../../data/IGOs.json"


  interface mapProps {
    organization: string;
  }
const Map = (props : mapProps) => {


    const membersWithoutStatusStyle = {
      style:  {
        "color": "red",
        "weight": 5,
        "opacity": 0.15
    }}
    let membersWithoutStatus :  Feature[]= {...countries}.features
    .filter(e => organizations[props.organization  as keyof typeof organizations].some((org : Array<string>) => org[0] === e.properties.name && org[1] === "")) 
    .map(e => {
      return e as Feature
    })
    

  
    const membersWithStatusStyle = {
    style:  {
      "color": "red",
      "weight": 5,
      "opacity": 1
    }}
    let membersWithStatus: Feature[] = {...countries}.features
    .filter(e => organizations[props.organization  as keyof typeof organizations]
      .some((org : Array<string>) => org[0] === e.properties.name && org[1] !== ""))
      .map(org => org as Feature)

 let membersWithStatusCopy = [...membersWithStatus]
 

 //   membersWithStatus = membersWithStatus.map((e, index) => {
    //   // let membersWithStatusCopy = [...membersWithStatus]
    //   console.info(organizations[props.organization  as keyof typeof organizations][index], "THIS SHIT HITS HOME");
    //   let propertiestWithStatus = Object.assign({status: "ss"}, e.properties);
    //   let eventWithStatus = Object.assign(e, {properties: propertiestWithStatus});
    //   console.warn("logging event with status", eventWithStatus);
      
    //   return eventWithStatus as Feature
    // })
    
   



  return (
    <>
    <MapContainer style = {{width: "200vh", height: "100vh"}} center={[49.505, 25.09]} zoom={5}>
        <TileLayer
            attribution= {`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
            url='https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=3f19809ebd064b10a80b4ea7d2035c35'
        />

        {
          membersWithoutStatus.map(e => {
            return <GeoJSON {...membersWithStatusStyle} data = {e} >
              <Popup>
              {e.properties ? e.properties.sovereignt : "data of this country could not be loaded"}
              </Popup>
            </GeoJSON>
          })
        }
        {
          membersWithStatus.map(e => {
            return <GeoJSON {...membersWithoutStatusStyle}  data = {e}>
              <Popup>
                {e.properties ? e.properties.status : "data of this country could not be loaded"}
              </Popup>
            </GeoJSON>
          })
        }        
    </MapContainer>   
    </>
  )
}

export default Map
