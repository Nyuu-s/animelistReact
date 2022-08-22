import React, {useEffect, useState, useMemo} from 'react'
import { useNavigate } from 'react-router-dom';
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
    Search,
    Inject,
    
   
  } from '@syncfusion/ej2-react-grids'


import { Header, EditComponent } from '../components'
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

const animesGroupesLinks = (props) => {
  if(!props.Nome){
    return
  }
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

let navigate
const contextMenuClick = (args) =>{
  if(args.item.id === 'details'){
    console.log();
    navigate('/animesdetails/'+args.rowInfo.rowData.id)
  }
 
}
const contextMenu = [
  'Edit',
  'AutoFitAll',
]

const HandleRowClick =(args) =>{

  console.log(args);
  navigate('/animesdetails/'+args.rowData.id)
}




const Animes = () => {
  const {AnimesData, setAnimesData, activeMenu, currentColor} = useStateContext()
  var isHidden = false
  navigate = useNavigate()

  
  const animes = useMemo(() => AnimesData, [AnimesData])
  const filterOption = {
    mode: 'Immediate',
    ignoreAccent: true,
    type: 'Menu',
 
  }

  const dialogTemplate = (props) =>{
    return (<EditComponent {...props}/>)
  }

  const editOptions = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
    mode: 'Dialog'
  }

  useEffect(() => {


    if(!AnimesData || (!AnimesData.data || AnimesData.data.length <= 0)){
      console.log("loading...");
      window.api.storageGet().then(data => {
        setAnimesData(data)
      })   
    }
  }, [AnimesData])


  const str = 'md:p10 md:max-w-xl lg:max-w-4xl 2xl:max-w-screen-2xl'
  console.log(AnimesData);
  return (
    
  <div  className={`dark:bg-main-dark-bg bg-white rounded-3xl`}>
    
    {AnimesData ? (<>


      <Header category="Page" title="Animes List"/>
      

        <GridComponent
          dataSource={animes.data && animes.data}
          allowPaging
          pageSettings={{pageCount: 12, pageSize:16}}
          allowFiltering={true}
          filterSettings={filterOption}
          editSettings={editOptions}
          allowSorting
          contextMenuItems={contextMenu}
          contextMenuClick={contextMenuClick} 
          recordClick={HandleRowClick} 
          allowTextWrap
          toolbar={['Search', 'Add', 'Delete']}
          searchSettings={{ignoreCase: true}}
          width={"auto"}
          actionBegin={(arg) => {
           
            console.log(arg);
            if(arg.requestType === 'save'){
              AnimesData.data[arg.rowData.id] = arg.data
              console.log(AnimesData.data[arg.rowData.id] );
              console.log(arg.data);
            }
            console.log(AnimesData);
           }}
          >
            
          <ColumnsDirective >
            <ColumnDirective autoFit key={0} field='id' headerText='ID' allowEditing={false} />
            {animes.format && animes.format.map((item, index) => {


              switch (item.field) {
                case 'Nome':
                  return (
                    <ColumnDirective   key={index}  {...item}  field='Nome.text' color={currentColor} template={animesGroupesLinks}  />
                  )
                case 'Gruppo':
                  return (
                    <ColumnDirective  key={index}  {...item} field='Gruppo.text' color={currentColor} template={animesGroupesLinks}  />
                  )
              
                default:
                  return (<ColumnDirective autoFit key={index}  {...item} />)
                 
              }


              
            })}
          </ColumnsDirective>
          <Inject services={[Resize, Search, ContextMenu, Selection, Toolbar, Page, Sort, ContextMenu, Filter, ExcelExport, PdfExport, Edit]}/>
        </GridComponent>
      
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