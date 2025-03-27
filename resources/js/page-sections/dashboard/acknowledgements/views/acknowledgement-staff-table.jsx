"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";

import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableAG from "@/components/core/table/TableAG";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { useAppContext } from "@/contexts/app-context";

import { paths } from "@/paths";


export function AcknowledgementStaffTable() {

    const appContext = useAppContext();
	const navigate = useNavigate();

	const [rowData, setRowData] = React.useState([]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		{ field: "name", cellRenderer : (params) => {
			const rowData = params.data;
			return 	<Box  sx={{ mt : 1 }}>
				<Typography variant="subtitle2" sx={{ mb : -3, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>
			
				<Typography color="text.secondary" sx={{ mb : 1}} variant="caption">
					{rowData.email}
				</Typography>
		</Box>

		}},
		{ field: "company"},
        { field: "department"},
		{ field: "pending"},
		{ field: "completed"},
     
	
		{ field: "action", cellRenderer : (params) => {
			const rowData = params.data;
			return <>

				<Link 
				sx={{ cursor : 'pointer', mr : 2 }}
				onClick={() => {
					navigate(paths.dashboard.acknowledgements.staff.details(rowData.staffID))
				}}>
					Details
				</Link>
			</>
		} }
    ]);

	return <>
	
			<TableAG row={rowData} column={colDefs} loading={false} title=''/>
	
	</>;
}
