"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableAG from "@/components/core/table/TableAG";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { useAppContext } from "@/contexts/app-context";
// import UserForm from "../forms/user-form"


export function FormIssuances() {

    const appContext = useAppContext();

	const [rowData, setRowData] = React.useState([
        {
			 id: 1,
			 company : 'PNMS',
			 to: "ICTD",
			 deadline: "09 September, 2025",
			 issued : "09 January, 2025",
			 action: 1 
		},
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		
		{ field: "company"},
        { field: "to"},
		{ field: "issued", label : 'Issued'},
		{ field: "deadline"},
		{ field: "action", cellRenderer : (params) => {
			const rowData = params.data;
			return <>
				<Link 

			    sx={{ cursor : 'pointer', mr : 2 }}
			    onClick={() => {
					// appContext.setDialog({ 	isOpen : true, title : 'Update user', subtitle : rowData.email, component : <UserForm data={rowData} /> })
				}}>Details
				</Link>
		
			</>
		} }
    ]);

	return <>
	
			<TableAG row={rowData} column={colDefs} loading={false} title='' search={false}/>
	
	</>;
}
