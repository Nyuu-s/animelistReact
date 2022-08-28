import React , {useState} from 'react'
import debounce from 'lodash.debounce';

import { useStateContext } from '../contexts/ContextProvider'
import { NavLink } from 'react-router-dom';


function search(querry, data){
    var list = []
    data.map(item => {
        if(item.Nome.text.toLowerCase().includes(querry.toLowerCase())){
            
            list.push(item)
        }
    })
    return list
}

function AnimesFilters({data, headers}) {
    const [currentMenu, setCurrentMenu] = useState('animes')
    const [currentList, setCurrentList] = useState([...data])
    const {currentColor} = useStateContext()
    

  return (
    <div style={{height: '80vh'}}>
        <div id='categories' style={{borderBottom: 'solid 4px', borderColor: currentColor}} className='mb-5 p-5 dark:text-white'>
            <ul className='flex text-center font-bold  ' >
                <li style={{borderRight: 'solid 2px', borderColor: currentColor}} className='w-1/3 border-r-2 border-slate-800'><button onClick={() => setCurrentMenu('animes')}> Animes </button> </li>
                <li style={{borderRight: 'solid 2px', borderColor: currentColor}} className='w-1/3 border-r-2 border-slate-800'><button  onClick={() => setCurrentMenu('filters')}> Filters </button></li>
                <li className='w-1/3'><button> Other button </button></li>
            </ul>
        </div>
    
        { currentMenu === 'filters' ? (
          
            headers.map((item, i) => { 
                if(item != "id" && item != 'image'){
                    return(
                        
                        <p key={i} style={{borderBottom: 'solid 2px', borderColor: currentColor}} className=' mr-1   hover:shadow-lg dark:text-white mb-2 border-b-2 dark:hover:bg-slate-700 dark:bg-secondary-dark-bg'>
                            <button className='font-bold mb-3 pt-2 ml-3' >{item}</button>
                        </p>  
                    )
                }

            }) 
            ) : ''
        }

        { currentMenu === 'animes' ? <div className='w-full items-center h-10'>
            
            <input  className='ml-3 dark:text-white mb-3 p-1 dark:bg-main-dark-bg rounded-md w-5/6'  type="text" placeholder='Search'  onChange={debounce((arg) => {
                setCurrentList(search(arg.target.value, data))
            }, 300)} />
            
        </div> : '' }
        <div className='h-full' >
            <ul className='overflow-auto h-full'>

               
                { currentMenu === 'animes' ? (
        
                    currentList.map((item, i) => 
                    {
                        return(
                            
                                <li>

                                    <NavLink key={i} to={`/animesdetails/${item.id}`} >

                                    <p className='ml-3  rounded-md hover:shadow-lg dark:text-white pb-2 hover:cursor-pointer dark:hover:bg-slate-700 dark:bg-secondary-dark-bg' >{item.Nome.text}</p>
                                    </NavLink>
                                </li>
    
                        
                        )
                    })) : ''
                }
            </ul>
        </div>
        

        
    </div>
  )
}

export default AnimesFilters