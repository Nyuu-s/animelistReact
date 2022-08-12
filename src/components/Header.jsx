import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Header = ({category, title, link}) => {
  const {currentColor, currentMode} = useStateContext()
  var linkclass = link ? 'cursor-pointer' : ''
  return (
    <div className='mb-10'>
      <p className='text-gray-400'>
        {category}
      </p>

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
    </div>
  )
}

export default Header