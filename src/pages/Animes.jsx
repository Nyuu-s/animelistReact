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
import { setValue } from '@syncfusion/ej2-base';




const animesGroupesLinks = (props) => {
  if(!props.Nome){
    return
  }
  var haveLink = typeof props[`${props.column.headerText}`] === 'object' 
  var haveText = props[`${props.column.headerText}`].text != '' ? true : false


  return (
    
    <div className='text-left'>
      {(haveText) ? <button
        className={`${ props[`${props.column.headerText}`].hyperlink !== '' ? 'underline cursor-pointer' : 'cursor-default'}   bg-transparent text-left`}
        style={{color: props.column.color}}
        onClick={(e) => {e.preventDefault();
                          if(haveLink)
                            window.api.window.openInBrowser( props[`${props.column.headerText}`].hyperlink)
                        }}
        alt={`anime-link-${props.column.headerText}`}
      >
        { props[`${props.column.headerText}`].text}
      </button> : ''}
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
    mode: 'Dialog',
    template: dialogTemplate
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
    
  <div  className={`dark:bg-main-dark-bg bg-white rounded-3xl h-full overflow-hidden`}>
    
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
          recordDoubleClick={HandleRowClick} 
          allowTextWrap
          toolbar={['Search', 'Add', 'Delete', 'Clear']}
          toolbarClick={(arg) => {  
            if(arg.item.id === "grid_1228884828_0_Clear"){
              setAnimesData({})
              //TODO remove electron storage
            }
          }}
          searchSettings={{ignoreCase: true}}
          width={"auto"}
          actionBegin={(arg) => {
            console.log(arg);
            switch (arg.requestType) {
              case 'save':
                if(arg.action === 'edit')
                  AnimesData.data[arg.rowData.id] = arg.data
                if(arg.action === 'add')

                  var inputs = arg.form.querySelectorAll('input')
                  inputs.forEach(item => 
                    {
                      setValue(`data.${item.id}`, item.value, arg)
                      
                      setValue(`data.id`, AnimesData.data.length, arg)
                      setValue(`index`, AnimesData.data.length, arg)
                     var splitname = item.id.split('-')
                     if(splitname.length > 1){
                      setValue(`data.${splitname[0]}`, {text: arg.data[splitname[0]], hyperlink: item.value}, arg)
                     }
                     

                  

                    }

                  )
                  console.log('Saved added line')
                break;
            
              default:
                break;
            }
           }}
          >
            {/* "grid_1228884828_2_add" */}
          <ColumnsDirective >
            <ColumnDirective autoFit key={0} field={'id'} headerText='ID' allowEditing={false} />
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