"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Skeleton1 } from "@/components/loader/loading-skeleton";


import TableAG from "@/components/core/table/TableAG";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { CardSummary } from "@/components/widgets/card/card-summary";
import { paths } from "@/paths";
import useAxios  from "@/hooks/use-axios";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";

import { useMediaQuery } from "@/hooks/use-media-query";


export function StaffTable() {

  
	const { axiosGet } = useAxios();
	const navigate = useNavigate();
	const mdDown = useMediaQuery("down", "md");
	const { isLoading : staffLoading, data : staffList, refetch : getStaff }  = axiosGet({  id : 'staff-list' , url : import.meta.env.VITE_API_BASE_URL + '/staffs', refetchOnMount : true  });
	const { isLoading : overviewLoading, data : staffOverview, refetch : getOverview }  = axiosGet({  id : 'staff-list-info' , url : import.meta.env.VITE_API_BASE_URL + '/staffs/info', refetchOnMount : true   });




    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([]);


	React.useEffect(() => {
		setColDefs([
			{ field: "name",minWidth : 320,  cellRenderer : (params) => {
				const rowData = params.data;
				return 	<Box  sx={{ mt : 1 }}>
					        <Typography variant="body2" sx={{ mb : -2.5, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name}</Typography>	
							{mdDown && <Typography color="text.secondary" sx={{ mb : 1}} variant="caption">
							{rowData.company}  • {rowData.staff_no} 	{rowData.email ? ' • ' + rowData.email : '' }
							</Typography>}
						
			            </Box>
	
			}},
			{ field: "email", headerName : "Email",hide : mdDown ? true : false},
			{ field: "staff_no", headerName : "Staff ID",hide : mdDown ? true : false},
			{ field: "company",hide : mdDown ? true : false, cellRenderer : (params) => {
				const rowData = params.data;
				return  rowData?.company
	
			}},
			{ field: "status",hide : mdDown ? true : false, 	cellRenderer : (params) => {
	
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
						View details
					</Link>
				</>
			} }
		])
	},[staffList,mdDown])




	return <>
	<Grid container spacing={2}>
				<Grid
					size={{
							md: 3,
							xs: 4,
						}}
					>
							{!overviewLoading ? <CardSummary 
							    tooltip='Staff that still working and bounded to company.'
								icon={InfoIcon} 
								amount={staffOverview?.data?.active ?? 0} 
								title="Active"  
							/> : <Skeleton1 />}

					</Grid>
					<Grid
						size={{
							md: 3,
							xs: 4,
						}}
					>
							{!overviewLoading ? <CardSummary 
						
							    tooltip='Staff that no longer with the company.'
								icon={InfoIcon} 
								amount={staffOverview?.data?.inactive ?? 0} 
								title="Inactive"  
							/> : <Skeleton1 />}

					</Grid>
					</Grid>
			<TableAG row={staffList?.data?.staffs} column={colDefs} loading={staffLoading} title=''/>
	</>;
}
