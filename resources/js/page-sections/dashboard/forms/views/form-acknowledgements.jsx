"use client";

import * as React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import TableAG from "@/components/core/table/TableAG";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { CardSummary } from "@/components/widgets/card/card-summary";
import { useAppContext } from "@/contexts/app-context";
import { useParams } from "react-router-dom";
import useAxios  from "@/hooks/use-axios";

export function FormAcknowledgements() {
    
    const { code } = useParams();

	const { axiosGet } = useAxios();
    const appContext = useAppContext();

	const { isLoading : infoLoading, data : fetchedInfo, refetch : getInfo }  = axiosGet({  id : 'acknowledgement-info' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/info/' + code  });
	const { isLoading : acknowledgementLoading , data : fetchedAcknowledgements, refetch : getAcknowledgements }  = axiosGet({  id : 'acknowledgement-list' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/' + code  });
     
	React.useEffect(() => {
		getInfo();
		getAcknowledgements();
	},[])
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		{ field: "name", cellRenderer : (params) => {
			const rowData = params.data;
		

			return 	<Box  sx={{ mt : 1 }}>
				<Typography variant="body2" sx={{ mb : -2.5, whiteSpace: "nowrap"}} fontSize={14}>{rowData?.name}</Typography>
			
				<Typography color="text.secondary" sx={{ mb : 1}} variant="caption">
					{rowData?.email}
				</Typography>
		</Box>

		}},
		{ field: "company"},
        { field: "department"},
        { field: "position"},
	
        { field: "status", 	cellRenderer : (params) => {

			const rowData = params.data;
			const mapping = {
				completed: {
					label: "Completed",
					icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
				},
				pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-warning-main)" /> },
			};
			const { label, icon } = mapping[rowData.status] ?? { label: "Unknown", icon: null };

			return <Chip icon={icon} label={label} size="small" variant="outlined" />;
		}},
	
		
    ]);

	return <>
		<Grid container={true} spacing={4}>
				<Grid size={{ xs : 12, sm: 6, md : 4}}>
					<CardSummary  amount={fetchedInfo?.data?.total ?? 0}  icon={null} title="Total" />
				</Grid>
				<Grid size={{ xs : 12, sm: 6, md : 4}}>
					<CardSummary  amount={fetchedInfo?.data?.pending ?? 0}  icon={null} title="Pending" />
				</Grid>
				<Grid size={{ xs : 12, sm: 6, md : 4}}>
					<CardSummary  amount={fetchedInfo?.data?.completed ?? 0}  icon={null} title="Completed" />
				</Grid>
				<Grid size={{ xs : 12, sm: 12, md : 12 }}>
					<TableAG row={fetchedAcknowledgements?.data?.acknowledgements} column={colDefs} loading={acknowledgementLoading} title=''/>
				</Grid>
		</Grid>
	
	</>;
}
