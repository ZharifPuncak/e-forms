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


export function FormFile() {

    const appContext = useAppContext();

	const [rowData, setRowData] = React.useState([
        {
			 id: 1,
			 name: "Personal Data Protection Act",
             category: 'Main',
             version : '1.0',
             size : '2.0',
			 extension : 'PDF'
		},
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
	
		{ field: "name", label : "Name"},
		{ field: "category", label: "Category"},
        { field: "version", label: "Version"},
		{ field: 'size' ,label: "Size", cellRenderer : ( params ) => {

			const rowData = params.data;
			return rowData?.size + ' MB';
		}},
		{ field: 'extension', label: "Extension"},
		{ field: "action", cellRenderer : (params) => {
			const rowData = params.data;
			return <>
				<Link 

			    sx={{ cursor : 'pointer', mr : 2 }}
			    onClick={() => {
					// appContext.setDialog({ 	isOpen : true, title : 'Update user', subtitle : rowData.email, component : <UserForm data={rowData} /> })
				}}>Edit
				</Link>
		
			</>
		} }
    ]);

	return <>
	
			<TableAG row={rowData} column={colDefs} loading={false} title='' search={false}/>
	
	</>;
}
