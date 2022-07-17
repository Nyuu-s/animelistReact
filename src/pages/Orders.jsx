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
    Search,
    Inject,
  } from '@syncfusion/ej2-react-grids'

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy'
import { Header } from '../components'

const Orders = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:-10 bg-white rounded-3xl'>
      <Header 
        category="Page"
        title="Orders"
      />
      <GridComponent
      dataSource={ordersData}
      allowPaging
      allowSorting
      toolbar={['Search']}
 
      
      >
        <ColumnsDirective>
        {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Toolbar, Page, Sort, ContextMenu, Filter, ExcelExport, PdfExport, Edit]}/>
      </GridComponent>
    </div>
  )
}

export default Orders