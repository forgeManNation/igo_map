import React, {useState} from 'react'

interface wikiPictureInterface {
  orgName: string
}


const WikiPicture = (props : wikiPictureInterface) => {

  const [imageSrc, setimageSrc] = useState("")
  const response = fetch("https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages&format=json&piprop=original&titles=" + props.orgName)
  .then(response => response.json())
  .then(data => {
    let key = Object.keys(data.query.pages)[0]
   
    if(data.query.pages[key].original && data.query.pages[key].original.source){ 
      setimageSrc(data.query.pages[key].original.source)
    }
    
  });
  
  return (
    <>
    {imageSrc ? <img src={imageSrc} className = " w-10  h-10"></img> : ""}
    </>
  )
}

export default WikiPicture