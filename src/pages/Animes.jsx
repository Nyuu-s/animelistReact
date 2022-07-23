import React from 'react'
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
  } from '@syncfusion/ej2-react-grids'

import { ordersData, ordersGrid } from '../data/dummy'
import { Header } from '../components'

const Animes = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:-10 dark:bg-main-dark-bg bg-white rounded-3xl'>
      <Header 
        category="Page"
        title="Orders"
      />
      <GridComponent
      dataSource={ordersData}
      allowPaging
      allowSorting
      toolbar={['Search', 'Delete']}
      editSettings= {{allowDeleting: true, allowEditing:true , allowEditOnDblClick:true}}
      allowFiltering
      allowMultiSorting
      cssClass='dark'
      >
        <ColumnsDirective>
        {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Selection, Toolbar, Page, Sort, ContextMenu, Filter, ExcelExport, PdfExport, Edit]}/>
      </GridComponent>
    </div>
  )
}

export default Animes