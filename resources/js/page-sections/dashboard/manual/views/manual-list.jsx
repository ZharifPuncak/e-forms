"use client";

import * as React from "react";
import { Card, CardHeader, CardContent, Stack, Button  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxios  from "@/hooks/use-axios";
import { DataTable } from "@/components/core/data-table";
import { Skeleton1 } from "@/components/loader/loading-skeleton";


export function ManualList() {

  
	const { axiosGet } = useAxios();
	const navigate = useNavigate();
    const [manual,setManual] = React.useState([]);
	const { isLoading : manualLoading, data : manualList, refetch : getManual }  = axiosGet({  id : 'manual-list' , url : import.meta.env.VITE_API_BASE_URL + '/manual'  });

    const columns = [
       
        { field: "title", name: "Title", width: "150px" },
        {
            formatter: (row) => {
                return (
                    <div>
                            <Button onClick={() => {
                                   window.open(row.file, "_blank")
                              }}>View Document</Button>
                    </div>
                );
            },
            name: "Action",
            width: "100px",
        },
    
    ];
    

    React.useEffect(() => {
        if(manualList){
            setManual(manualList?.data?.data);
        }
    },[manualList])
    
    return 	<Card>
    <CardHeader
        title=""
    />
    <CardContent>
    {!manualLoading ? <Stack spacing={3}>
       <Card sx={{ overflowX: "auto" }} variant="outlined">
            <DataTable columns={columns} rows={manual} /> 
            </Card>
       </Stack> : <Skeleton1 />}
    </CardContent>
</Card>;
}
