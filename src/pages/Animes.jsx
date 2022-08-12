import React, {useEffect, useState, useMemo} from 'react'
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Resize,
    Sort,
    Page, 
    ContextMenu, 
    Filter, 
    ExcelExport,
    PdfExport, 
    Edit,
    Toolbar,
    Selection,
    Inject,
    Render,
   
  } from '@syncfusion/ej2-react-grids'


import { Header } from '../components'
import CircularProgress from '@mui/material/CircularProgress';
import { useStateContext } from '../contexts/ContextProvider'

let textColor = ''
const animesNamesLinks = (props) => {
  
  return (

  <div>
    <button
      className="underline cursor-pointer bg-transparent"
      style={{color: textColor}}
      onClick={(e) => {e.preventDefault();
                       window.api.window.openInBrowser(props.Nome.hyperlink)
                      }}
      alt="anime-name"
    >
      {props.Nome.text}
    </button>
  </div>
);
}

const animesGroupesLinks = (props, tcolor) => {
  console.log(props, tcolor);

  var link , text
  var haveLink = typeof props[`${props.column.headerText}`] === 'object' ? true : false
  var haveText = props[`${props.column.headerText}`].text != '' ? true : false


  return (
    
    <div className='text-left'>
      {(haveText) ? <button
        className="underline cursor-pointer bg-transparent text-left"
        style={{color: props.column.color}}
        onClick={(e) => {e.preventDefault();
                          if(haveLink)
                            window.api.window.openInBrowser( props[`${props.column.headerText}`].hyperlink)
                        }}
        alt={`anime-link-${props.column.headerText}`}
      >
        { props[`${props.column.headerText}`].text}
      </button> : 'random text'}
  </div>
);
}




const Animes = () => {
  const {AnimesData, setAnimesData, activeMenu, currentColor} = useStateContext()
  
  const animes = useMemo(() => AnimesData, [AnimesData])
  const filterOption = {
    mode: 'Immediate',
    ignoreAccent: true,
    type: 'Excel'
    
  }
  

  useEffect(() => {
    console.log("loading...");
    window.api.storageGet().then(data => {
      setAnimesData(data)
    })   
  }, [setAnimesData])
  
  const str = 'md:p10 md:max-w-xl lg:max-w-4xl 2xl:max-w-screen-2xl'

  return (
    
  <div  className={`m-2 md:m-10 mt-24 p-2 ${activeMenu ? str : ''} dark:bg-main-dark-bg bg-white rounded-3xl `}>
    
    {AnimesData ? (<>


        <Header category="Page" title="Animes List"/>
        <div >

          <GridComponent
            dataSource={animes.data && animes.data}
           
            allowPaging
            pageSettings={{pageCount: 12}}
            allowFiltering={true}
            filterSettings={filterOption}
            allowSorting
            
            allowTextWrap
            searchSettings={{ignoreCase: true}}
           
            
          
            >
            <ColumnsDirective>
              <ColumnDirective autoFit key={0} field='id' headerText='ID' />
              {animes.format && animes.format.map((item, index) => {
                if(item.field === 'Nome'){
                  return (
                    <ColumnDirective  key={index}  {...item} textAlign='left' field='Nome.text' color={currentColor} template={animesGroupesLinks}  />
                  )
                }
                if(item.field === 'Gruppo'){
                  return (
                    <ColumnDirective  key={index}  {...item} field='Gruppo.text' color={currentColor} template={animesGroupesLinks}  />
                  )
                }

                return (<ColumnDirective autoFit key={index}  {...item} />)
              })}
            </ColumnsDirective>
            <Inject services={[Resize, Selection, Toolbar, Page, Sort, ContextMenu, Filter, ExcelExport, PdfExport, Edit]}/>
          </GridComponent>
        </div>
      </>
    ) :( <> <div className='text-center font-extrabold m-auto dark:text-slate-300'>
               <p className='text-3xl '>COULD NOT DISPLAY ANY DATA </p> 
               <p className='text-xl'>Make sure you load data first.</p>
                <p className='mt-4'><CircularProgress color="secondary"  /></p>
            </div> 

    
    </>)}
   

  </div>  

    // <div className='m-2 md:m-10 p-2 dark:bg-main-dark-bg bg-white rounded-3xl'>
    //     <Header 
    //     category="Page"
    //     title="Animes List"
        
    //   />

    //   { AnimesData.data && <CustomDataGrid />}

      
      
    // </div>
  )
}

export default Animes