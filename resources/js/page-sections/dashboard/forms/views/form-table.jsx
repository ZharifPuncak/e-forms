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
import { CardsThree as CardsThreeIcon } from "@phosphor-icons/react/dist/ssr/CardsThree";
 
import { paths } from "@/paths";

import useAxios  from "@/hooks/use-axios";


export function FormTable() {

    const { axiosGet } = useAxios();
	const navigate = useNavigate();

	const { isLoading, data : forms, refetch   }  = axiosGet({  id : 'forms', url : import.meta.env.VITE_API_BASE_URL + '/forms', cacheTime : 2 * 60 * 1000, staleTime :  2 * 60 * 1000 });
	const [rowData, setRowData] = React.useState([]);

	React.useEffect(() => {
		setRowData(forms?.data?.data)
	},[forms])

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		{ field: "name", cellRenderer : (params) => {
			const rowData = params.data;
			return 	<Box  sx={{ mt : 1 }}>
				<Typography  sx={{ mb : -2, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>
			
				<Typography color="text.secondary" sx={{ mb : 1}} variant="caption">
					{rowData.alias}
				</Typography>
		</Box>

		}},
		{ field: "code"},
        { field: "category"},
        { field: "status", 	cellRenderer : (params) => {

			const rowData = params.data;
			const mapping = {
				completed: {
					label: "Completed",
					icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
				},
				closed: { label: "Closed", icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
				pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-error-main)" /> },
				new: { label: "New", icon: <CardsThreeIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
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
					navigate(paths.dashboard.forms.details(rowData.code))
				}}>
					View details
				</Link>
			</>
		} }
    ]);

	return <>
	
			<TableAG row={rowData} column={colDefs} loading={isLoading} title=''/>
	
	</>;
}
