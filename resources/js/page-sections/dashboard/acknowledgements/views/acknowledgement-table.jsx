"use client";

import * as React from "react";

import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableAG from "@/components/core/table/TableAG";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import useAxios  from "@/hooks/use-axios";

export function AcknowledgementTable() {

 	const { axiosGet } = useAxios();
	 const { isLoading, data : fetchedAcknowledgements, refetch   }  = axiosGet({  id : 'acknowledgements-list' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements' });
      

	 React.useEffect(() => {
		refetch();
	 },[]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		{ field: "name", cellRenderer : (params) => {
			const rowData = params.data;
			return 	<Box  sx={{ mt : 1 }}>
				<Typography variant="subtitle2" sx={{ mb : -3, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>
			
				<Typography color="text.secondary" sx={{ mb : 1}} variant="caption">
					{rowData.alias}
				</Typography>
		</Box>

		}},
		{ field: "code"},
        {field: "issued_at"},
		{field: "submitted"},
        { field: "status", 	cellRenderer : (params) => {

			const rowData = params.data;
			const mapping = {
				completed: {
					label: "Completed",
					icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
				},
				new: { label: "New", icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
				pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-error-main)" /> },
			};
			const { label, icon } = mapping[rowData.status] ?? { label: "Unknown", icon: null };

			return <Chip icon={icon} label={label} size="small" variant="outlined" />;
		}},
	
    ]);

	return <>
	
			<TableAG row={fetchedAcknowledgements?.data?.acknowledgements} column={colDefs} loading={isLoading} title='' search={false} />
	
	</>;
}
