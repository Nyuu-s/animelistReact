import React, {useMemo, useEffect, useState} from 'react'

import { useStateContext } from '../contexts/ContextProvider'
import { useParams } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'

import { Header, AnimesFilters } from '../components'
const inputstyle = "mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

const getAnimeInfo = (anime, mode=false) => {
  var res = []
  var isLinguaIta = anime['Lingua'] === 'Ita'
  var isSupportoOriginal = anime['Supporto'].toLowerCase().includes('originale')
  var isRezVisible = true
  var isGruppoVisible =true
  for(const key in anime){
    if(!anime[key] && anime[key] !== 0){
      anime[key] = ""
    }
    isGruppoVisible = !isLinguaIta || key !== 'Gruppo'
    isRezVisible = !isSupportoOriginal || key !== 'Risoluzione'
    if( (key !== 'id' && key !== 'Nome' && key !== 'image' && isGruppoVisible && isRezVisible) || mode)
    {    
        var value = anime[key].text !== undefined ? anime[key].text : anime[key]
        if(anime[key].hyperlink !== undefined)
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

const checkLink = (url) => {
  if(url.startsWith('http')){
    console.log('true');
    return true
  }
  console.log('false');
  return false
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
  const {activeMenu, AnimesData, currentColor} = useStateContext()
  const [currentAnimeImage, setCurrentAnimeImage ] = useState([])
  const [editMode, setEditMode ] = useState(false)
  const {id} = useParams()

   
  var curAnime =  useMemo(() => AnimesData.data ?  AnimesData.data[id] : {}, [AnimesData.data, id, AnimesData.data[id]])
  var headers = Object.keys(curAnime)

  useEffect(() => { 
    // curAnime = AnimesData.data[id]
   
    if((!curAnime.image && AnimesData.data) && curAnime.Nome.hyperlink){
      window.api.getImage(curAnime.Nome.hyperlink).then(result => {
        curAnime['image'] = result
        setCurrentAnimeImage(result)
      })
    }

  }, [AnimesData, curAnime])
  
  console.log(curAnime);
  
  return (
    <div>
      
      {AnimesData.data && <div className="flex w-full ">

        {!activeMenu && <div id='animeSidebar' className='w-1/3 bg-white dark:bg-secondary-dark-bg'>
        <AnimesFilters data={AnimesData.data} headers={headers}></AnimesFilters>
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
              {curAnime.image && <img className='h-full' src={curAnime.image || currentAnimeImage} alt="" />}
            </div>
            <div className='ml-5 h-screen' >
              
              <ul className={`flex flex-col flex-wrap h-3/4 `}>
                { !editMode ? getAnimeInfo(curAnime).map((item, i) => {
                 
                  return(
                    <li key={i} className={
                        `font-bold p-2 dark:text-gray-300`
                        } >
                      <p className={`text-slate-400 opacity-80 ${item.hyperlink ? 'cursor-pointer': '' }`}>{item.key}:</p> 
                      <p 
                        className={`${item.hyperlink ? 'cursor-pointer hover:text-slate-400 underline': '' }`}
                        onClick={() => {
                        if(item.hyperlink && checkLink(item.hyperlink) ) 
                          {window.api.window.openInBrowser(item.hyperlink )} }}
                      
                      >{item.value}</p>
                    </li>
                  )

                   }) 
                  : 
                  getAnimeInfo(curAnime, editMode).map((item, i) => 
                  {
                    console.log(item);
                    return(
                    <li  key={i} className='
                        font-bold p-2 dark:text-gray-300
                        ' >
                      
                      <p  className='text-slate-400 opacity-80'>{item.key }:</p>
                      <span id='inputs'>
                        <input type="text" name={item.key} disabled={item.key === 'id'} className={inputstyle} defaultValue={item.value} />
                        {item.hyperlink !== undefined && <input name={item.key} className={inputstyle} defaultValue={item.hyperlink}/> }
                      </span>
                    </li>
                    )
                  })
                  
                  
                  
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