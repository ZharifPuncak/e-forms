"use client";

import * as React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";


import TableAG from "@/components/core/table/TableAG";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";

import { CardSummary } from "@/components/widgets/card/card-summary";
import { useParams } from "react-router-dom";
import { Skeleton1 } from "@/components/loader/loading-skeleton";
import useAxios  from "@/hooks/use-axios";
import { useMediaQuery } from "@/hooks/use-media-query";

import _ from 'lodash';


export function FormAcknowledgements() {
	
	const mdDown = useMediaQuery("down", "md");
    const { code } = useParams();
    const [active,setActive] = React.useState('total');
	const { axiosGet } = useAxios();
	const [acknowledgement,setAcknowledgement] = React.useState([]);
   

	const { isLoading : infoLoading, data : fetchedInfo, refetch : getInfo }  = axiosGet({  id : 'acknowledgement-info' , url : import.meta.env.VITE_API_BASE_URL + '/forms/acknowledgement/info/' + code  });
	const { isLoading : acknowledgementLoading , data : fetchedAcknowledgements, refetch : getAcknowledgements }  = axiosGet({  id : 'acknowledgement-list' , url : import.meta.env.VITE_API_BASE_URL + '/forms/acknowledgement/' + code  });
    const allAcknowledgements = fetchedAcknowledgements?.data?.acknowledgements;

	

	React.useEffect(() => {
		active != 'total' ? setAcknowledgement(allAcknowledgements?.filter((item) => item.status == active )) : setAcknowledgement(allAcknowledgements);
	},[active,fetchedAcknowledgements])


    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([]);

	React.useEffect(() => {
		setColDefs([
			{ field: "name", cellRenderer : (params) => {
				
		
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

					return 	<Box  sx={{ mt : 1 }}>
						{!mdDown ? <Box  sx={{ mt : 1 }}>
					<Typography variant="body2" sx={{ mb : -2.5, whiteSpace: "nowrap"}} fontSize={14}>{rowData?.name}</Typography>
				
					<Typography color="text.secondary" sx={{ mb : 1}} variant="caption">
						{rowData?.email}
					</Typography>
			</Box>
						: <Chip icon={icon} sx={{ mb : 2, whiteSpace: "nowrap"}} label={rowData.name} size="small" variant="outlined" />
						}


					</Box>

					
	
			}},
	
			{ field: "company",  hide : mdDown ? true : false},
			{ field: "department",  hide : mdDown ? true : false },
			{ field: "position",  hide : mdDown ?  true : false  },
		
			{ field: "status",hide : mdDown ? true : false, 	cellRenderer : (params) => {
	
				const rowData = params.data;
				const mapping = {
					completed: {
						label: "Completed",
						icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
					},
					pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-warning-main)" /> },
				};
				const { label, icon } = mapping[rowData.status] ?? { label: "Unknown", icon: null };
	
				return <Chip icon={icon} label={label} size="small" variant="outlined" />;
			}},
		
			
		])
	},[mdDown])

	return <>
		<Grid container={true} spacing={4}>
			   <Grid style={{ cursor : 'pointer'}} onClick={() => setActive('total')} size={{ xs : 6, sm: 6, md : 3}}>
					 {!infoLoading ? <CardSummary  
					    active={active == 'total'}
					    amount={fetchedInfo?.data?.total ?? 0}  
					    tooltip='Total of Acknowledgements.'
						icon={InfoIcon}  
						title="Total" /> : <Skeleton1 />}
				</Grid> 
			   <Grid style={{ cursor : 'pointer'}} onClick={() => setActive('pending')} size={{ xs : 6, sm: 6, md : 3}}>
			   {!infoLoading ? <CardSummary  
			            active={active == 'pending'}  
						amount={fetchedInfo?.data?.pending ?? 0}  
						 tooltip='Acknowledgement that are not yet submitted.'
						icon={InfoIcon} 
					    title="Pending" />  : <Skeleton1 />}
				</Grid>
			  <Grid style={{ cursor : 'pointer'}} onClick={() => setActive('completed')} size={{ xs : 6, sm: 6, md : 3}}>
			{!infoLoading ? <CardSummary 
			            active={active == 'completed'} 
						amount={fetchedInfo?.data?.completed ?? 0}  
						tooltip='Submitted acknowledgement.'
						icon={InfoIcon} 
						title="Completed" /> : <Skeleton1 />}
				</Grid> 
				 <Grid style={{ cursor : 'pointer'}}  onClick={() =>setActive('incompleted')} size={{ xs : 6, sm: 6, md :3}}>
				 {!infoLoading ? <CardSummary 
				 		active={active == 'incompleted'} 
					    amount={fetchedInfo?.data?.incompleted ?? 0}  
						tooltip='Acknowledgement that are not submitted after the form effective end.'
						icon={InfoIcon} 
						title="Incompleted" /> : <Skeleton1 />}
				</Grid> 
				<Grid size={{ xs : 12, sm: 12, md : 12 }}>
					<TableAG row={acknowledgement} column={colDefs} loading={acknowledgementLoading} title='' csv={!_.isEmpty(acknowledgement)}/>
				</Grid>
		</Grid>
	
	</>;
}
