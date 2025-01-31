import { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz,ModuleRegistry, ClientSideRowModelModule   } from 'ag-grid-community'; 
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import Box from '@mui/material/Box';


import './Table.css';



import logoPuncak from "@/assets/images/logo/logo-puncak.png";


export default function TableAG({ row, column, pagination = true, loading = true , title = ''}){  
    
    const [searchTerm, setSearchTerm] = useState('');

  
    // sets 10 rows per page (default is 100)
    const paginationPageSize = 10;

    // allows the user to select the page size from a predefined list of page sizes
    const paginationPageSizeSelector = [10, 20, 50, 100];

   

    // Register the required modules
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    // Theme config
    const myTheme = themeQuartz.withParams({
        /* Low spacing = very compact */
        spacing: 10,
        // /* Changes the color of the grid text */
        // foregroundColor: '#007FAB',
        // /* Changes the color of the grid background */
        // backgroundColor: 'rgb(241, 247, 255)',
        // /* Changes the header color of the top row */
        // headerBackgroundColor: 'rgb(228, 237, 250)',
        // /* Changes the hover color of the row*/
        // rowHoverColor: 'rgb(216, 226, 255)',
    });

    const gridOptions = {
        theme: myTheme,
        loading: loading,
        quickFilterText: "",
        paginationPageSize: 20,  // Set number of rows per page
        pagination: true,  
        paginationPageSizeSelector: paginationPageSizeSelector,
        onGridSizeChanged: (params) => {
            // Resize columns to fit the grid width
            // params.api.sizeColumnsToFit();
          }
    }

    // Autosize
    const gridRef = useRef(null);
  
    //Onclicked Cell
    const onCellClicked = (params) => {
        params.api.clearFocusedCell();
      };
    

    // Qucik search value
    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        gridOptions.api.setQuickFilter(value);  // Use setQuickFilter to trigger global search
      };


      
   

    return (
        <div style={{  width: 'auto' }}>
                        <Box sx={{ display: 'flex',justifyContent: 'space-between',  alignItems: 'center', mb: 1 }}>
                        {/* Title on the left */}
                            <Box sx={{ ml : 2, fontWeight: 'bold' }}>{title}</Box>
                        
                            {/* TextField on the right */}
                            <TextField
                                value={searchTerm}
                                onChange={onSearchChange}
                                type="text"
                                placeholder="Search"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                sx={{
                                maxWidth: '320px', // Adjust max width as needed
                                mt: 2,
                                mb: 2,
                                mr:2
                                }}
                            />
                        </Box>
                <div>
                <AgGridReact  
                       ref={gridRef}
                       {...gridOptions}
                        rowData={row} 
                        columnDefs={column} 
                        domLayout='autoHeight' 
                        onCellClicked={onCellClicked}
                        overlayLoadingTemplate={`
                            <div style="text-align: center;">
                              <img src="${logoPuncak}" alt="Logo" style="width: 100px; height: 100px; margin-bottom: 10px;" />
                              <div>Loading...</div>
                            </div>
                          `}
                          overlayNoRowsTemplate={
                                '<span class="ag-overlay-loading-center">No Data Available</span>'
                          }> 
                    </AgGridReact> 
            
                </div>
        </div>
    );
}
