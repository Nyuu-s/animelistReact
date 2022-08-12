import React, {useEffect} from 'react'


import { Header } from '../components'
import { CustomDataGrid } from '../components'
import { useStateContext } from '../contexts/ContextProvider'





const AnimesTest = () => {
  const {AnimesData, setAnimesData, activeMenu} = useStateContext()
 

  useEffect(() => {
    console.log("loading...");
    window.api.storageGet().then(data => {
    
      setAnimesData(data)
    })   
  }, [])
  

  return (

  <div>
    <CustomDataGrid>
      
    </CustomDataGrid>

  </div>  


  )
}

export default AnimesTest