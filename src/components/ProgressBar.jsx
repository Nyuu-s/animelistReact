
import React from 'react'


const ProgressBar = (props) => {

  const {color, bgcolor, thickness, completed, lenght} = props
  return (
    <div >
        <div style={{width: `${lenght}%`, height: `${thickness}px`, backgroundColor: bgcolor}} className='rounded-lg dark:bg-white bg-main-dark-bg '>

          <div  style={{backgroundColor: color,  height: `100%`,width: `${completed <= 100 ? completed : '100'}%`, borderRadius: 'inherit', transition: 'width 0.5s ease-in-out' }}
                
          >
          </div> 

        </div>
        <div className='text-white text-center font-extrabold' style={{width: `${lenght}%`}} >{completed}%</div>
    </div>
    



  )
}

export default ProgressBar