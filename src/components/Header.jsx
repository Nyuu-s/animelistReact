import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Header = ({category, title, link, button, buttonTitle, buttonIcon, buttonFunc}) => {
  const {currentColor, currentMode} = useStateContext()
  var linkclass = link ? 'cursor-pointer' : ''
  return (
    <div className='mb-10'>
      <p className='text-gray-400'>
        {category}
      </p>
      <div className='flex'>
        <p  style={{color: currentColor}} 
            className={`text-3xl font-extrabold tracking-tight text-slate-900 ${linkclass}`}
            onClick={(e) => {
              if(link){
                e.preventDefault()
                window.api.window.openInBrowser(link)
              }
            }}
        >
          
          {title}
          
        </p>
        {button && <button  
          style={{color: currentColor}} 
          className='flex text-2xl ml-10 mt-2'
          onClick={buttonFunc}
        
        
        >
          <p>{buttonTitle}</p>
          <p className='mt-1'>{buttonIcon}</p>
        </button>}
      </div>

    </div>
  )
}

export default Header