"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import TableAG from "@/components/core/table/TableAG";
import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { useAppContext } from "@/contexts/app-context";

import { paths } from "@/paths";



export function AcknowledgementFormTable() {

    const appContext = useAppContext();
	const navigate = useNavigate();

	const [rowData, setRowData] = React.useState([
        {
			 id: 1,
			 name: "Integrity Pledge",
			 alias: 'IP',
			 code : 'ACK001',
			 status : "pending",
			 action: 1 
		},

    ]);

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
		{ field: "status", 	cellRenderer : (params) => {

			const rowData = params.data;
			const mapping = {
				completed: {
					label: "Completed",
					icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
				},
				new: { label: "New", icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
				pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-warning-main)" /> },
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
					navigate(paths.dashboard.acknowledgements.form.details(rowData.code))
				}}>
					Click here
				</Link>
			</>
		} }
    ]);

	return <>
	
			<TableAG row={rowData} column={colDefs} loading={false} title=''/>
	
	</>;
}
