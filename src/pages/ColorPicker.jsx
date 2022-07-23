import React , {useEffect}from 'react'
import {ColorPickerComponent, getValue} from '@syncfusion/ej2-react-inputs'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'

import { useStateContext } from '../contexts/ContextProvider'
var backgroundButton = localStorage.getItem('customTheme') ? localStorage.getItem('customTheme') : 'black'







const ColorPicker = () => {
  const {currentColor, setColor} = useStateContext()

  const change = (args) =>{
  
    var color = args.currentValue.hex
    document.getElementById('preview').style.backgroundColor = color
    localStorage.setItem('customTheme', color)
    backgroundButton = color
    setColor(color)
  
  }
  
  
  return (
    <div className='mt-4 bg-white rounded-3xl dark:bg-main-dark-bg'>  

      <button
                    id='preview'
                    className='mb-8 h-11 w-11 rounded-full cursor-pointer'
                    style={{backgroundColor: backgroundButton}}
                    onClick={() => {setColor(backgroundButton)}}
                  >
                    {backgroundButton === currentColor ?  <BsToggleOn className={`ml-14 text-2xl dark:text-white  `} />  : <BsToggleOff className={`ml-14 text-2xl dark:text-white  `}/>}
                    {backgroundButton === currentColor ?  <p className={`ml-14 text-lg dark:text-white  `} >ON</p>  : <p className={`ml-14 text-lg dark:text-white  `}>OFF</p> }
                    
      </button>
      <div className='text-center'>
          <div className='flex justify-center items-center gap-10 flex-wrap'>
            <div className='mb-4'>
              <p className='text-2xl font-semibold mt-2 mb-5'>Pick a color</p>
              
              <ColorPickerComponent 
                
                id='inline-pallete'
                mode='Palette'
                modeSwitcher={true}
                inline
                showButtons={false}
                change={change}

              /> 
      
            </div>
          </div>
      </div>
    </div>
  )
}

export default ColorPicker