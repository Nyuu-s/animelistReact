
import React, {useEffect, useState} from 'react'
import ProgressBar from '../components/ProgressBar'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStateContext } from '../contexts/ContextProvider'
const {api} = window


const setFileFeedBack = (text) => {
  const element = document.getElementById('fileFeedBack')
  if(text){
    var name = text.split('\\')
    element.value = name[name.length -1];
  }
                  
} 

const LoadData = () => {
  const {currentColor, currentMode, setAnimesData} = useStateContext() 
  const [completed, setCompleted] = useState(0)
  
  
  useEffect(() => {
    api.recieve('ping', (arg) => {
      
      setCompleted((Math.round(arg[0])))
     
    })


  }, [completed])



  return (
    <div>
        <ToastContainer 
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            theme={currentMode === 'Dark' ? 'dark' : 'light'}
            
         
        />
      <div className='ml-6' >
        <p className='dark:text-white p-2  text-2xl font-semibold'>
          .XLSX File
        </p>

        <input type="text" name="feedback" id="fileFeedBack"  />
        <button className='p-1 mb-5 ml-3 rounded-lg' style={{backgroundColor: currentColor}}
        
        onClick={async () => {
          
          try {
            const path = await window.api.openFile()
            setFileFeedBack(path)
            if(path){

              var result = await toast.promise(window.api.parseAnimes(path), {pending: 'Processing data...', success: 'Done !', error: 'Something went wrong.'})
              setAnimesData(result)
            }
          } catch (error) {
            toast.error('an error occured' +  error.message)
          }


        
        } }
        >
          Add
        </button>
        <div>
          

          
        </div>

        <div className=''>
          <ProgressBar color={currentColor} bgcolor="black" lenght="30" thickness="10" completed={completed}>

          </ProgressBar>

        </div>
      </div>
      
    </div>
  )
}

export default LoadData