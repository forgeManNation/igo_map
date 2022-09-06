import React from 'react'
import { Popover } from '@headlessui/react'

interface MapTheme {
  name: string,
  color: string, 
  url: string,
  selected: boolean,
  memberCountriesColor: string,
  memberCountriesWithStatusColor: string
}
interface MapThemes extends Array<MapTheme>{}


interface Props {
  themes : MapThemes
}




const MapSettings = ({themes} : Props) => {

    const [mapSettingsOpen, setmapSettingsOpen] = React.useState(false)

    const mapIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>;   

  themes.map((theme: MapTheme) => {
    console.log(
    `outline outline-${theme.color}-500 hover:outline-${theme.color}-700 m-5 text-white font-bold py-2 px-4 rounded` + (theme.selected ? `bg-${theme.color}-500` : "")
    )
     })
  

    return (
    <div>
            
    <Popover  className="relative m-3 ">
      <Popover.Button><div  onClick={() => {setmapSettingsOpen(!mapSettingsOpen)}} className=' m-2 w-fit p-4 h-fit bg-blue-400 bg-opacity-80  hover:cursor-pointer hover:bg-opacity-100 rounded-full'>{mapIcon}</div></Popover.Button>

      <Popover.Panel className="absolute  -translate-x-1/3 z-10 bg-slate-700 ">
        <div className="flex flex-col">
          {themes.map((theme: MapTheme) => {
         return <button className= {`outline outline-${theme.color}-500 hover:outline-${theme.color}-700 m-5 text-white font-bold py-2 px-4 rounded ` + (theme.selected ? `bg-${theme.color}-500` : "") } >{theme.name}</button>
          })}
         <button className=  "outline outline-yellow-500 hover:outline-yellow-700 m-5 text-white font-bold py-2 px-4 rounded" >Railway theme</button>
         <button className='outline outline-blue-700 hover:outline-blue-800 m-5 text-white font-bold py-2 px-4 rounded'>Dark blue theme</button>
        </div>
      </Popover.Panel>
    </Popover>
    </div>
  )
}

export default MapSettings