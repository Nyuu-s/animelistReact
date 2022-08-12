import React from 'react'
import ProgressBar from '../components/ProgressBar'


import { useStateContext } from '../contexts/ContextProvider'

var path = ''
const setFileFeedBack = (text) => {
  const element = document.getElementById('fileFeedBack')
  path = text
  var name = text.split('\\')
  element.value = name[name.length -1];
                  

}

const LoadData = () => {
  const {currentColor} = useStateContext() 


  return (
    <div>
      <div className='ml-6' >
        <p className='dark:text-white p-2  text-2xl font-semibold'>
          .XLSX File
        </p>

        <input type="text" name="feedback" id="fileFeedBack"  />
        <button className='p-1 mb-5 ml-3 rounded-lg' style={{backgroundColor: currentColor}}
        
        onClick={async () => {
          const path = await window.api.openFile()
          setFileFeedBack(path)
          var test = await window.api.parseAnimes(path)
          localStorage.setItem('data', test )

        
        } }
        >
          Add
        </button>


        <div className=''>
          <ProgressBar color={currentColor} bgcolor="black" lenght="50" thickness="10" completed={"50"}>

          </ProgressBar>

        </div>
      </div>
      
    </div>
  )
}

export default LoadData