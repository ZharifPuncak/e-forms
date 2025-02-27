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
import useAxios  from "@/hooks/use-axios";


export function StaffTable() {

  
	const { axiosGet } = useAxios();
	const navigate = useNavigate();

	const { isLoading : staffLoading, data : staffList, refetch : getStaff }  = axiosGet({  id : 'staff-list' , url : import.meta.env.VITE_API_BASE_URL + '/staffs'  });



    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		{ field: "name",minWidth : 320,  cellRenderer : (params) => {
			const rowData = params.data;
			return 	<Box  sx={{ mt : 1 }}>
				<Typography variant="body2" sx={{ mb : -2.5, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>
			
				<Typography color="text.secondary" sx={{ mb : 1}} variant="caption">
					{rowData.email}
				</Typography>
		</Box>

		}},
		{ field: "staff_no", headerName : "Staff ID"},
        { field: "company", cellRenderer : (params) => {
			const rowData = params.data;
			return  rowData?.company

		}},
        { field: "status", 	cellRenderer : (params) => {

			const rowData = params.data;
			const mapping = {
				active: {
					label: "Active",
					icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
				},
				inactive: { label: "Inactive", icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
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
					navigate(paths.dashboard.staff.details(rowData.staffID))
				}}>
					Details
				</Link>
			</>
		} }
    ]);

	return <>
	
			<TableAG row={staffList?.data?.staffs} column={colDefs} loading={staffLoading} title=''/>
	
	</>;
}
