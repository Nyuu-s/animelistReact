import React, {useEffect, useMemo} from 'react'

import { DataGrid } from '@mui/x-data-grid/';


import { useStateContext } from '../contexts/ContextProvider'

const columns = [
  {
      name: 'Title',
      selector: row => row.title,
  },
  {
      name: 'Year',
      selector: row => row.year,
  },
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
  },
]



const CustomDataGrid = () => {
  

  

  return (
    <div>

    </div>
  )
}

export default CustomDataGrid