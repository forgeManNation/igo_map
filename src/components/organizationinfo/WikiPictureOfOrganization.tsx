import React, {useState, useEffect} from 'react'

interface wikiPictureInterface {
  currentOrganizationWikiPageName: string
}
//gets Picture from wikipedia if there is one
const WikiPicture = (props : wikiPictureInterface) => {

  useEffect(() => {
    setimageUrl("")
  }, [props.currentOrganizationWikiPageName])
  
  //exact url to image in wikipedia
  const [imageUrl, setimageUrl] = useState("")

  const response = fetch("https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages&format=json&piprop=original&titles="
   + props.currentOrganizationWikiPageName)
  .then(response => response.json())
  .then(data => {
  
    //getting first an only key of wikipedia because of structure 
    let key = Object.keys(data.query.pages)[0]
  
    if(data.query.pages[key].original && data.query.pages[key].original.source){ 
      setimageUrl(data.query.pages[key].original.source)
    }
    
  });
  
  return (
    <>  
    {imageUrl ? <img alt='' src={imageUrl}  className = "w-full m-5 "></img> : ""}
    </>
  )
}

export default WikiPicture