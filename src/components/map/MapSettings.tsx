import React from 'react'
import { Popover } from '@headlessui/react'

interface MapTheme {
  name: string,
  url: string,
  selected: boolean,
  memberCountriesColor: string,
  memberCountriesWithStatusColor: string
}
interface MapThemes extends Array<MapTheme>{}


interface Props {
  themes : MapThemes,
  changeTheme: (index: number) => void
}




const MapSettings = ({themes, changeTheme} : Props) => {

  
    const [mapSettingsOpen, setmapSettingsOpen] = React.useState(true)

    const mapIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>;   


 

    return (
    <Popover  className="relative  mr-6 mt-2 ">
      <Popover.Button><div  onClick={() => {setmapSettingsOpen(!mapSettingsOpen)}} className='   p-3 h-fit bg-blue-400 bg-opacity-50  hover:cursor-pointer hover:bg-opacity-100 rounded-full'>{mapIcon}</div></Popover.Button>

      <Popover.Panel  className="-translate-x-1/3 border-slate-600 border-2 rounded absolute  overflow-y-auto overflow-x-visible   z-50 bg-slate-700">
        <ul className="max-h-44 ">
          {themes.map((theme: MapTheme, index) => <li onClick={() => {changeTheme(index)}} key = {"mapThemeButton" + index} className= {`cursor-pointer border-slate-600 border-2 text-slate-100 text-center  py-2 px-5  z-50 overflow-x-visible hover:bg-slate-500  ${theme.selected ? `border-blue-500  bg-slate-500 border ` : ""}`} >{theme.name}</li >)}
        </ul>
      </Popover.Panel>
    </Popover>
    
  )
}

export default MapSettings