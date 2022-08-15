import React, {useState} from 'react'
import Draggable from 'react-draggable'

const Penny = () => {

//the most random thing i have ever done
            
        const maleNames = [ 'Jiří', 'Jan','Petr' ,'Josef','Pavel','Martin','Tomáš','Jaroslav', 'Miroslav', 'Zdeněk', 'Václav', 'Michal', 'František', 'Jakub', 'Milan']
        const femaleNames = ['Jana','Marie', 'Eva','Hana', 'Anna','Lenka', 'Kateřina', 'Lucie','Věra', 'Alena']

    const [listOfAngryMalePeoplePhotosUrl, setlistOfAngryMalePeoplePhotosUrl] = useState([])
    const [listOfAngryFemalePeoplePhotosUrl, setlistOfAngryFemalePeoplePhotosUrl] = useState([])

    function showAngryPeople(){
        setlistOfAngryMalePeoplePhotosUrl([...listOfAngryMalePeoplePhotosUrl, "./angrym.jpg"])
    }

    

  return (
    <div style={{backgroundColor: "#1f154b", height: "100vh"} } >Penny
        <img onClick={showAngryPeople} className='m-5' src='./pennyjpg.jpg'></img>
        {
           
            Math.floor(Math.random() * 2) === 1 ?
            [...listOfAngryMalePeoplePhotosUrl].map((angryPersonUrl, index) => {
                console.log("jsem tutok");
                return <Draggable><div className='position-absolute h-25 draggable-element w-25  key={index}' ><h3 className='text-light'>Agresisvní důchodce {maleNames[Math.floor(Math.random() * maleNames.length)]}</h3><img   src= {angryPersonUrl} ></img></div></Draggable>
            })
       :
            [...listOfAngryFemalePeoplePhotosUrl].map((angryPersonUrl, index) => {
                return <Draggable><div className='position-absolute h-25 draggable-element w-25  key={index}' ><h3 className='text-light'>Agresisvní důchodce {femaleNames[Math.floor(Math.random() * maleNames.length)]}</h3><img   src= {angryPersonUrl} ></img></div></Draggable>
            })
        
        }
    </div>
  )
}

export default Penny