import { useState, useRef, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz,ModuleRegistry, ClientSideRowModelModule, PaginationModule, QuickFilterModule, CsvExportModule   } from 'ag-grid-community'; 
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import { useMediaQuery } from "@/hooks/use-media-query";
import './Table.css';



import logoPuncak from "@/assets/images/logo/logo-puncak.png";


export default function TableAG({ row, column, pagination = true, loading = true , title = '', search = true, csv = false }){  
    
    const [searchTerm, setSearchTerm] = useState('');
    const mdDown = useMediaQuery("down", "md");
    const gridRef = useRef(null);
    const [gridApi, setGridApi] = useState(null);
  

    // sets 10 rows per page (default is 100)
    const paginationPageSize = 10;

    // allows the user to select the page size from a predefined list of page sizes
    const paginationPageSizeSelector = [10, 20, 50, 100];


    const autoGroupColumnDef = useMemo(() => {
      return {
        flex: 1,
        minWidth: 180,
      };
    }, []);

   

    // Register the required modules
    ModuleRegistry.registerModules([ClientSideRowModelModule,PaginationModule, QuickFilterModule, CsvExportModule]);
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
        onGridSizeChanged: (params) => {
            // Resize columns to fit the grid width
            // params.api.sizeColumnsToFit();
          }
          
    }

     //Onclicked Cell
      const onCellClicked = (params) => {
        params.api.clearFocusedCell();
      };

      const onSearch = (event) => {
        if (gridApi) {
          gridApi.setGridOption('quickFilterText', event.target.value);
          // gridApi.setQuickFilter(event.target.value);
        }
      };

       //Ensure the function is called after AG Grid is ready
       const onGridReady = (params) => {
         setGridApi(params.api); // ✅ Set grid API in state
       };


      
        const onBtnExport = useCallback(() => {
          gridRef.current.api.exportDataAsCsv();
        }, []);


    return (
        <div style={{  width: 'auto' }}>
                      <Box sx={{ display: "flex", alignItems: "center",  gap:1,  justifyContent: "flex-end", mt : 2 }}>
                        {/* Title on the left */}
                            <Box sx={{ mb : 0.5,  fontWeight: 'bold' }}>{title}</Box>
                        
                            {search && <TextField
                               autoComplete='off'
                                onChange={onSearch}
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
                                  maxWidth: '350px', // Adjust max width as needed
                                  mt: 2,
                                  mb: 2,
                                  ml : -3
                                }}
                            />}

                            {
                              csv && <Button variant="outlined" onClick={() => onBtnExport()} startIcon={<DownloadIcon />}>{mdDown ? '' : 'Export'} Data</Button>
                            }

                        </Box>
                <div>
                <AgGridReact  
        
                       ref={gridRef}
                       onGridReady={onGridReady}
                       {...gridOptions}
                        rowData={row} 
                        columnDefs={column} 
                        domLayout='autoHeight' 
                        onCellClicked={onCellClicked}
                        pagination={pagination}
                        paginationPageSize={10} // Fixed page size, user can't change it
                        paginationPageSizeSelector={false}
                        autoGroupColumnDef={autoGroupColumnDef}
                        defaultColDef={{
                            flex: 1, // Distributes available space evenly
                            minWidth: 200, // Prevents columns from becoming too small
                            resizable: true, // Allows manual resizing
                            filter: true,
                            sortable: true,
                            suppressMovable: true,
                        }}
                        overlayLoadingTemplate={`
                            <div style="text-align: center;">
                              <img src="${logoPuncak}" alt="Logo" style="width: 100px; height: 100px; margin-bottom: 10px;" />
                              <div>Loading...</div>
                            </div>
                          `}
                          overlayNoRowsTemplate={
                                '<span>No Data Available</span>'
                          }> 
                    </AgGridReact> 

                    <style>
                {`
                  .ag-paging-panel .ag-paging-row-summary-panel {
                    display: ${mdDown ? "none" : ""} !important;
                  }
                `}
              </style>
            
                </div>
        </div>
    );
}
