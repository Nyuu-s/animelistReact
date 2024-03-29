import React, {useEffect} from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {Navbar, Sidebar, ThemeSettings} from './components'
import {Landing, Animes, AnimesTest, AnimesDetails, Calendar, ColorPicker} from './pages'

import './App.css'

import { useStateContext } from './contexts/ContextProvider'
import LoadData from './pages/LoadData'

let {api} = window




const App = () => {

  
  const {activeMenu, setAnimesData, themeSettings, currentColor, currentMode, setVersion} = useStateContext();
 
  useEffect(() => {
    api.storageGet().then(data => {
      setAnimesData(data)
    }) 
    api.getVersion().then(result => {
      console.log(result);
      setVersion(result)  
    })
    
  }, [setAnimesData, setVersion])


  return (
    
   <div id='appbody' className={currentMode === 'Dark' ? 'dark' : '' }>

      <HashRouter>
        <div className="flex relative h-screen overflow-clip dark:bg-main-dark-bg">
          <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}>

            <TooltipComponent content={"Settings"} position="Top">
              <button type='button' className='
                text-3xl
                p-3
                hover:drop-shadow-xl
              hover:bg-light-gray
              text-white
                '
                style={{background: currentColor, borderRadius: "50%"}}
                onClick={async () => console.log(await window.api.storageGet())}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className='w-72 fixed  dark:bg-secondary-dark-bg bg-white z-10'>
              <Sidebar />
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <Sidebar />
            </div>
          )}
          <div className={
            `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full 
            ${activeMenu 
              ? 'md:ml-72'
              : 'flex-2'}`
            
          }>
            
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full z-10'>
              <Navbar />
            </div>
          

          <div className='overflow-hidden'>
            
            { themeSettings && <ThemeSettings /> }

            <Routes>
              {/* DASHBOARD */}
              <Route path="/" element={<Landing/>}/>
              <Route path="/main" element={<Landing/>}/>

              {/* PAGES */}
              <Route path="/animes" element={<Animes/>}/>
              <Route path="/animestest" element={<AnimesTest/>}/>
              <Route path="/animesdetails/:id" element={<AnimesDetails/>}/>
              <Route path="/themes" element={<ThemeSettings/>}/>
              

              {/* APPS */}

              <Route path="/color-picker" element={<ColorPicker/>}/>
              <Route path="/calendar" element={<Calendar/>}/> 
              <Route path="/load-data" element={<LoadData/>}/> 
            </Routes>
          </div>
        </div>
      </div>
      </HashRouter>
   </div>
  )
}

export default App
