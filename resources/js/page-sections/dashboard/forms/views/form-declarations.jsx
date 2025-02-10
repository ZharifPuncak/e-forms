"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import TableAG from "@/components/core/table/TableAG";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { PenNibStraight as PenNibStraightIcon } from "@phosphor-icons/react/dist/ssr/PenNibStraight";

import { CardSummary } from "@/components/widgets/card/card-summary";

import { useAppContext } from "@/contexts/app-context";
// import UserForm from "../forms/user-form"


export function FormDeclarations() {

    const appContext = useAppContext();

	const [rowData, setRowData] = React.useState([
        {
			 id: 1,
			 name: "Arif Aiman",
             email: 'arif@pnhb.com.my',
             department : 'IT',
             company : 'PNMS',
			 status : 'pending', 
			 role: 'Admin',
			 action: 1 
		},
        {    id: 2,
             name: "Hadi Fayyadh",
             email: 'fayyadh@pnhb.com.my',
             department : 'HR',
             company : 'TRIPLC',
			 status : 'completed', 
			 role: 'Admin-HR',
			 action: 2 
		},
    ]);

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
        { field: "role"},
	
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
		<Grid container={true} spacing={4}>
				<Grid size={{ xs : 12, sm: 6, md : 4}}>
					<CardSummary  amount={30}  icon={null} title="Total" />
				</Grid>
				<Grid size={{ xs : 12, sm: 6, md : 4}}>
					<CardSummary  amount={10}  icon={null} title="Pending" />
				</Grid>
				<Grid size={{ xs : 12, sm: 6, md : 4}}>
					<CardSummary  amount={20}  icon={null} title="Completed" />
				</Grid>
				<Grid size={{ xs : 12, sm: 12, md : 12 }}>
					<TableAG row={rowData} column={colDefs} loading={false} title=''/>
				</Grid>
		</Grid>
	
	</>;
}
