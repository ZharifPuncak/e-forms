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


import { paths } from "@/paths";
import useAxios  from "@/hooks/use-axios";


export function StaffTable() {

  
	const { axiosGet } = useAxios();
	const navigate = useNavigate();

	const { isLoading : staffLoading, data : staffList, refetch : getStaff }  = axiosGet({  id : 'staff-list' , url : import.meta.env.VITE_API_BASE_URL + '/staffs'  });



    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([]);


	React.useEffect(() => {
		setColDefs([
			{ field: "name",minWidth : 320,  cellRenderer : (params) => {
				const rowData = params.data;
				return 	<Box  sx={{ mt : 1 }}>
					<Typography variant="body2" sx={{ mb : -2.5, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>
				
					
			</Box>
	
			}},
			{ field: "email", headerName : "Email"},
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
					pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-warning-main)" /> },
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
						navigate(paths.dashboard.staff.details(rowData.staff_no))
					}}>
						Details
					</Link>
				</>
			} }
		])
	},[staffList])


	React.useEffect(() => {
		getStaff();
	},[])

	return <>
			<TableAG row={staffList?.data?.staffs} column={colDefs} loading={staffLoading} title=''/>
	</>;
}
