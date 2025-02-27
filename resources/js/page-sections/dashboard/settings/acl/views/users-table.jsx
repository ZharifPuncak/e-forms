"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableAG from "@/components/core/table/TableAG";

import { Minus as MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { useAppContext } from "@/contexts/app-context";
import UserForm from "../forms/user-form"

import useAxios  from "@/hooks/use-axios";

export function UsersTable({ rows }) {

    const appContext = useAppContext();
	const { axiosGet } = useAxios();

	const { isLoading, data : fetchedUsers, refetch   }  = axiosGet({  id : 'user-list', url : import.meta.env.VITE_API_BASE_URL + '/users', cacheTime : 1 * 60 * 1000, staleTime :  1 * 60 * 1000 });


    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([
		{ field: "name", width: 300, cellRenderer : (params) => {
			const rowData = params.data;
			return 	<Box  sx={{ mt : 1 }}>
				<Typography variant="body2" sx={{ mb : -2.5, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>
			
				<Typography color="text.secondary" variant="caption">
					{rowData.email}
				</Typography>
		</Box>

		}},
	
	
        { field: "role", width : 200, cellRenderer : ( params ) => {

			const rowData = params.data;
			return <Chip label={rowData.role}  variant="outlined" />
		}},
        // { field: "status", width : 200,	cellRenderer : (params) => {

		// 	const rowData = params.data;
		// 	const mapping = {
		// 		active: {
		// 			label: "Active",
		// 			icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
		// 		},
		// 		blocked: { label: "Blocked", icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
		// 		inactive: { label: "Inactive", icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
		// 	};
		// 	const { label, icon } = mapping[rowData.status] ?? { label: "Unknown", icon: null };

		// 	return <Chip icon={icon} label={label} size="small" variant="outlined" />;
		// }},
		// { field: "Status",width: 150, cellRenderer : ( params ) => {
		// 	const rowData = params.data;
		// 	return rowData.created_at;
		// }},
		// { field: "action", cellRenderer : (params) => {
		// 	const rowData = params.data;
		// 	return <Link 
		// 	    sx={{ cursor : 'pointer'}}
		// 	    onClick={() => {
		// 			appContext.setDialog({ 	isOpen : true, title : 'Update user', subtitle : rowData.email, component : <UserForm data={rowData} /> })
		// 	}}>View</Link>
		// } }
    ]);

	return <>
		<TableAG row={fetchedUsers?.data?.users} column={colDefs} loading={isLoading}  search={false} title=''/>
	</>;
}
