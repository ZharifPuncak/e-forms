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

import { paths } from "@/paths";
import useAxios  from "@/hooks/use-axios";

import { useMediaQuery } from "@/hooks/use-media-query";

export function AcknowledgementFormTable() {

	
	const { axiosGet } = useAxios();
	const { isLoading, data : fetchedAcknowledgements, refetch   }  = axiosGet({  id : 'acknowledgements-list' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements' });
	const navigate = useNavigate();
	const smDown = useMediaQuery("down", "sm");

	
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([]);

	React.useEffect(() => {
		setColDefs([
			{ field: "name",  cellRenderer : (params) => {
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
					{!smDown ? <Typography variant="body1" sx={{ mb : -1, whiteSpace: "nowrap"}} fontSize={14}>{rowData.name} 		</Typography>
					:<Chip icon={icon} sx={{ mb : 2, whiteSpace: "nowrap"}} label={rowData.name} size="small" variant="outlined" />
					}
				
				
			</Box>
	
			}},
			{ field: "code", hide: smDown ?  true : false,},
			{ field: "status", hide: smDown ?  true : false, 	cellRenderer : (params) => {
	
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
			}}
		])
	},[fetchedAcknowledgements?.data?.acknowledgements, smDown])

	return <>	
		<TableAG row={fetchedAcknowledgements?.data?.acknowledgements} column={colDefs} loading={isLoading} title='' search={false} />
	</>;
}
