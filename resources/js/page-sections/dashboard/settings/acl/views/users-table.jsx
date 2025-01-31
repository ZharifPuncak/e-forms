"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableAG from "@/components/core/table/TableAG";


import { UserDialog } from "../forms/user-dialog";
import { useDialog } from "@/hooks/use-dialog";

import { Minus as MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { Javascript } from "@mui/icons-material";



export function UsersTable({ rows }) {

	const dialog = useDialog();
	const [title, setTitle] = React.useState('');
	const [subTitle, setSubTitle] = React.useState('');



	const [rowData, setRowData] = React.useState([
        { id: 1,name: "Aiman Hamzah", email: "aiman@pnb,com",          department : 'ICTD',         status : 'active', role: 'Admin', action: 1 },
        { id: 2,name: "Hakim Roslan Taib", email: "superadmin@pnb.com",department : 'HR', status : 'inactive', role: 'Superadmin', action: 2 },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		{ field: "name", width: 300, cellRenderer : (params) => {
			const rowData = params.data;
			return 	<Box  sx={{ mt : 1 }}>
		
				<Typography variant="subtitle2" sx={{ mb : -3, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>
			
				<Typography color="text.secondary" variant="caption">
					{rowData.email}
				</Typography>

		</Box>

		}},
		{ field: "department",width: 150, cellRenderer : ( params ) => {

			const rowData = params.data;
			return <Chip label={rowData.department}  variant="outlined" />
		} },
        { field: "role", width : 200, cellRenderer : ( params ) => {

			const rowData = params.data;
			return <Chip label={rowData.role}  variant="outlined" />
		} },
        { field: "status", width : 200,	cellRenderer : (params) => {

			const rowData = params.data;
			const mapping = {
				active: {
					label: "Active",
					icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
				},
				blocked: { label: "Blocked", icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
				inactive: { label: "Inactive", icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
			};
			const { label, icon } = mapping[rowData.status] ?? { label: "Unknown", icon: null };

			return <Chip icon={icon} label={label} size="small" variant="outlined" />;
		}},
		{ field: "action", cellRenderer : (params) => {
			const rowData = params.data;
			return <Link 
			    sx={{ cursor : 'pointer'}}
			    onClick={() => {
				setTitle('View User');
				setSubTitle(rowData.name);
				dialog.handleOpen();
			}}>View</Link>
		} }
    ]);

	return <>
		<UserDialog title={title} subtitle={subTitle} onClose={dialog.handleClose} open={dialog.open} />
		<TableAG row={rowData} column={colDefs} loading={false} title=''/>
	</>;
}
