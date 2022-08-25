import React, {Suspense, useEffect, useState} from 'react'

import { useStateContext } from '../contexts/ContextProvider'
import { useParams } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'

import { Header, EditComponent } from '../components'
const inputstyle = "mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

const getAnimeInfo = (anime, mode=false) => {
  var res = []
  for(const key in anime){
    if(!anime[key] && anime[key] !== 0){
      anime[key] = ""
    }
    if( (key !== 'id' && key !== 'Nome' && key !== 'image') || mode)
   {    
      var value = anime[key].text ? anime[key].text : anime[key]
      if(anime[key].hyperlink)
      {
        res.push( {key, value, hyperlink: anime[key].hyperlink} )
      }else
      {
        res.push( {key, value} )
      }
    
    }
  }
  
  return res
}

const saveEdit = () => {
  console.log('SAVING');
  var spans = document.querySelectorAll('#inputs')
  var editObj = {}
  spans.forEach(span => {
    var inputs = span.childNodes
    inputs.forEach((item, i) => {
      editObj[item.name] = i > 0 ? {text:editObj[item.name], hyperlink: item.value} :  editObj[item.name] = item.value
    })
  })
  
  return editObj
}
  
const handleEditMode = (anime, mode) => {
   
  console.log(anime, mode);
  return !mode
}

const AnimesDetails = () => {
  const {activeMenu, AnimesData, setAnimesData, currentColor} = useStateContext()
  const [currentAnimeImage, setCurrentAnimeImage ] = useState([])
  const [editMode, setEditMode ] = useState(false)
  const {id} = useParams()

 
  var curAnime = AnimesData.data ?  AnimesData.data[id] : {}

  useEffect(() => {
    // curAnime = AnimesData.data[id]
    if(!curAnime.image && AnimesData.data){
      window.api.getImage(curAnime.Nome.hyperlink).then(result => {
        curAnime['image'] = result
        setCurrentAnimeImage(result)
      })
    }

  }, [AnimesData])
  
 
  
  return (
    <div className='h-full overflow-hidden'>
      
      {AnimesData.data && <div className="flex w-full h-full">

        {!activeMenu && <div id='animeSidebar' className='w-1/3 bg-white'>
          {
          AnimesData.data.map(item => {
            
             return (
              <p key={item.id}>{item.Nome.text}</p>
             )
            
            
             
          })
          
          
          }
      </div>}

        <div id='animeInfos' className='ml-20'  >
          <div className='flex' >
            {curAnime.Nome && <Header title={curAnime.Nome.text} link={curAnime.Nome.hyperlink} button={!editMode} buttonTitle={''} buttonFunc={() => setEditMode(handleEditMode(curAnime, editMode))} buttonIcon={<AiOutlineEdit/>}/>}
            { editMode && <div style={{color: currentColor}} className='text-xl mt-2  ml-10'>
                <button className='mr-4 hover:bg-red-900 p-1 rounded-md' onClick={() => setEditMode(!editMode)}>Cancel</button>
                <button className='mr-4 hover:bg-green-700 p-1 rounded-md' onClick={() =>{
                  AnimesData.data[id] = saveEdit()
                  setEditMode(!editMode)
                  }}>
                Save
                </button>
              </div>
            }
            
          </div>
          <div className='flex h-fit'>

            <div id='animeImage' className='w-2/3 h-3/4'>
              <img className='h-full' src={curAnime.image || currentAnimeImage} alt="" />
            </div>
            <div className='ml-5'>
              
              <ul className='flex flex-col flex-wrap h-3/4'>
                { !editMode ? getAnimeInfo(curAnime).map((item, i) => 
                  (<li key={i} className='
                      font-bold p-2 dark:text-gray-300
                      ' >
                    <p className={`text-slate-400 opacity-80 ${item.hyperlink ? 'cursor-pointer': '' }`}>{item.key}:</p> 
                    <p 
                      className={`${item.hyperlink ? 'cursor-pointer hover:text-slate-400 underline': '' }`}
                      onClick={() => {
                      if(item.hyperlink) 
                        {window.api.window.openInBrowser(item.hyperlink)} }}
                    
                    >{item.value}</p>
                  </li>)) 
                  : 
                  getAnimeInfo(curAnime, editMode).map((item, i) => 
                  (<li  key={i} className='
                      font-bold p-2 dark:text-gray-300
                      ' >
                    
                    <p  className='text-slate-400 opacity-80'>{item.key}:</p>
                    <span id='inputs'>
                      <input type="text" name={item.key} disabled={item.key === 'id'} className={inputstyle} defaultValue={item.value} />
                      {item.hyperlink && <input name={item.key} className={inputstyle} defaultValue={item.hyperlink}/> }
                    </span>
                  </li>)) 
                  
                  
                  }

        
              </ul>
            </div>

          </div>
        </div>


      </div>}




    </div>
  )
}

export default AnimesDetails