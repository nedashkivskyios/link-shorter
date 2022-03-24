import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 70},
  {field: 'firstName', headerName: 'First name', width: 130},
  {field: 'lastName', headerName: 'Last name', width: 130},
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
  {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
  {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
];

export const LinksTable = () => {
  return (
    <Box component={'div'} style={{ width: '100%'}} sx={{flexGrow: 1, height: '85vh'}}>
      <DataGrid
        pagination={true}
        rows={rows}
        columns={columns}
        pageSize={10}
        // rowsPerPageOptions={[5, 10,15,20,25]}
      />
    </Box>
  );
}
