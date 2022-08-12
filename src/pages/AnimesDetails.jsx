import React, {useEffect} from 'react'

import { useStateContext } from '../contexts/ContextProvider'

import { Header } from '../components'

const getAnimeInfo = (anime) => {
  var res = []
  for(const key in anime){
    if(key !== 'id' && key !== 'Nome')
   {    
    var value = anime[key].text ? anime[key].text : anime[key]
    res.push(`${key} : ${value}`)}
  }
  return res
}

const getAnimeImage = (anime) => {

  // const url = anime.Nome.hyperlink



  return 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
}

const AnimesDetails = () => {
  const {activeMenu, AnimesData, setAnimesData} = useStateContext()

  console.log(AnimesData);
  var testanime =  AnimesData.data ? AnimesData.data[1] : {Nome: {text: "rien"}}
  var imgurl = ''

  useEffect(() => {
    window.api.getImage(testanime.Nome.hyperlink).then(result => {
      var obj = {...testanime}
      var test = AnimesData
      obj['image'] = result
      test.data[1] = obj
      setAnimesData(test)
      console.log('Animesdata : ', AnimesData.data);
    })
  
  
  }, [])
  
 

  return (
    <div>

      <div className="flex w-full">

        {!activeMenu && <div id='animeSidebar' className='w-1/3 bg-white'>
          .
        </div>}

        <div id='animeInfos' className='ml-20' >
          <div >
            <Header title={testanime.Nome.text} link='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'/>
          </div>
          <div className='flex '>

            <div id='animeImage' className='w-1/3 h-60'>
              <img className='h-full' src={testanime.image} alt="" />
            </div>
            <div className='ml-5'>
              
              <ul className='flex flex-col flex-wrap h-3/4'>
                {getAnimeInfo(testanime).map((item, i) => (<li key={i} className='font-bold p-2 dark:text-gray-300'>{item}</li>))}

        
              </ul>
            </div>

          </div>
        </div>


      </div>




    </div>
  )
}

export default AnimesDetails