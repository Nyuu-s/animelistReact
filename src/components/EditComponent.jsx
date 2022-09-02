import React from 'react'

function EditComponent(props) {
  var keys = Object.keys(props)
  keys.splice(keys.length-1, 1)
  const inputstyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  console.log(props);

  return ( 
    <div className=''>

        {
        keys.map((element, i) => {
          var inputs = <input className={`${inputstyle}`} disabled={element === 'id'} id={element} name={element} placeholder={props.isAdd && element === 'id' ? 'Will be added automaticaly' : element}  defaultValue={props[element]} type="text" />
          if(typeof props[element] === 'object'){
            inputs = (<div className=''> 
              <input className={`${inputstyle} text-black  mb-2 pl-2`} id={element} placeholder={element} defaultValue={props[element].text} type="text" />
              <p>
                
                <input className={`${inputstyle}  text-black  mb-2 pl-2 `} id={`${element}-hyperlinkurl`} placeholder="URL (optional)" defaultValue={props[element].hyperlink} type="text" />
              </p>

            </div> ) 
          }

         return(
          <div key={i} className='flex-row '>
            <p  className='font-bold text-lg'> {element} </p>
            {inputs}
          </div>
         
         )
        })
        
        }



    </div>
  )
}

export default EditComponent