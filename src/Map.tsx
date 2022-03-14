import React from 'react'

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import countries from './countries.json';
// import countries from "./";
const Map = () => {

  // let d :any = countries;
  let b :any = countries.features[5];
  console.log(b, "BViedmaCky");
  
  
  return (
    <MapContainer style = {{width: "200vh", height: "100vh"}}center={[49.505, 25.09]} zoom={5}>
        <TileLayer
            attribution= {`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
            url='https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=3f19809ebd064b10a80b4ea7d2035c35'
        />
        
        <GeoJSON data={countries} />
        {/* <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
    </MapContainer>
  )
}

export default Map




 // let countriesParsed = JSON.parse(countries)
  
  // let d :any = countries;
  // let b = countries.features[5].geometry;
  
  // console.log(typeof countries.features[5].geometry);
  

  // let countriesTrying = countries;
//  countries.map(e => console.log(e, ' logujuuuuu'));
  // console.log("hereeee", JSON.stringify(countries));
  
  // var geojsonLayer = new L.GeoJSON.AJAX("foo.geojson");       
  // geojsonLayer.addTo(map);