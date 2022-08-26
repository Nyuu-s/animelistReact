import React , {useState} from 'react'

import { useStateContext } from '../contexts/ContextProvider'

function AnimesFilters({data, headers}) {
    const [currentMenu, setCurrentMenu] = useState('filters')
    const {currentColor} = useStateContext()
    

  return (
    <div>
        <div id='categories' style={{borderBottom: 'solid 4px', borderColor: currentColor}} className='mb-5 p-5 dark:text-white'>
            <ul className='flex text-center font-bold  ' >
                <li style={{borderRight: 'solid 2px', borderColor: currentColor}} className='w-1/3 border-r-2 border-slate-800'><button onClick={() => setCurrentMenu('animes')}> Animes </button> </li>
                <li style={{borderRight: 'solid 2px', borderColor: currentColor}} className='w-1/3 border-r-2 border-slate-800'><button  onClick={() => setCurrentMenu('filters')}> Filters </button></li>
                <li className='w-1/3'><button> Test </button></li>
            </ul>
        </div>
    
        { currentMenu === 'filters' ? headers.map((item, i) => { 
            if(item != "id" && item != 'image'){
                return(
                    
                    <p key={i} style={{borderBottom: 'solid 2px', borderColor: currentColor}} className=' mr-1  rounded-md hover:shadow-lg dark:text-white mb-2 border-b-2 dark:hover:bg-slate-700 dark:bg-secondary-dark-bg'>
                        <button className='font-bold mb-3 pt-2 ml-3' >{item}</button>
                    </p>  
                )
            }
    
             }) : ''
        }


        { currentMenu === 'animes' ? data.map((item, i) => 
            {
                return(

                    <p className=' ml-3 rounded-md hover:shadow-lg dark:text-white pb-2 hover:cursor-pointer dark:hover:bg-slate-700 dark:bg-secondary-dark-bg'key={i} >{item.Nome.text}</p>
                )
            }) : ''
        }
        

        
    </div>
  )
}

export default AnimesFilters