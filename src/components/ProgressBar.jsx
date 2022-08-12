import React from 'react'

const ProgressBar = ({color, bgcolor, thickness, completed, lenght}) => {
    
    
  return (
    
    <div style={{width: `${lenght}%`, height: `${thickness}px`, backgroundColor: bgcolor}} className='rounded-lg dark:bg-white bg-main-dark-bg '>

 
        <div style={{backgroundColor: color,  height: `${thickness}px`,width: `${completed}%`}}
         className='rounded-lg p-1 sm:show' >

            

        </div>

    </div>


  )
}

export default ProgressBar