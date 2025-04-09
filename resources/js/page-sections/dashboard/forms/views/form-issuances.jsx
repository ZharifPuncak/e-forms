"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import TableAG from "@/components/core/table/TableAG";

import _ from 'lodash';
import { useAppContext } from "@/contexts/app-context";
import { useParams } from "react-router-dom";

import IssuanceForm from "../forms/issuance-form";
import useAxios  from "@/hooks/use-axios";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { useConfirm } from "material-ui-confirm";
import { useMediaQuery } from "@/hooks/use-media-query";

export function FormIssuances() {
     
	const confirm = useConfirm();
	const mdDown = useMediaQuery("down", "md");
	const [selectedId,setSelectedId] = React.useState(null);
	const { code } = useParams();
    const appContext = useAppContext();
	const { axiosGet, axiosMutate } = useAxios();
	const { isLoading, data : fetchedIssuance, refetch : getIssuance }  = axiosGet({  id : 'form-issuances' + code , url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/' + code  });
	const { mutate : deleteIssuance, isLoading : deleteIssuanceLoading } =  axiosMutate({ id: 'forms-issuance-delete' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/delete', payload : { id : selectedId } });
	const { mutate : dispatchIssuance, isLoading : dispatchIssuanceLoading  } =  axiosMutate({ id: 'forms-issuance-dispatch' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/dispatch', payload : { id : selectedId } });


    const [colDefs, setColDefs] = React.useState([]);
    React.useEffect(() => {
		setColDefs([

		
			{ field: "companies", cellRenderer : (params) => {
				const rowData = params.data;
			
					return <>
					{ rowData?.companies?.map((item) => {
						return <Chip key={item.code} sx={{ ml : 0.5 }} label={item.code} />;
					})}
			
			
				</>
			} },
			{ field: "issued_at", headerName : 'Issued Date',  hide : mdDown ? true : false},
			{ field: "deadlined_at", headerName : 'Deadline Date',  hide : mdDown ? true : false},
			{ field: "status", hide : mdDown ? true : false , cellRenderer : (params) => {
	
				const rowData = params.data;
				const mapping = {
					dispatched: {
						label: "Dispatched",
						icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
					},
					pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-warning-main)" /> },
				};
				const { label, icon } = mapping[rowData.status] ?? { label: "Unknown", icon: null };
	
				return <Chip key={label} icon={icon} label={label} size="small" variant="outlined" />;
			}},
			{ field: "action", cellRenderer : (params) => {
				const rowData = params.data;
			
				return <>
						<Button 
							disabled={rowData?.status == 'dispatched'} 	
							onClick={() => {
								appContext.setDialog({ 	isOpen : true, title : 'Edit issuance', subtitle :   ' ('+ code + ')', component : <IssuanceForm loadedCompanies={fetchedIssuance?.data?.loaded_companies} update={getIssuance} code={code} end={fetchedIssuance?.data?.form_end} item={rowData} /> })
							}}  
							size="small">
							Edit 
						</Button>
	
						<Button 
							disabled={rowData?.status == 'dispatched'} 	
							onClick={async () => {
								confirm({
									title: <Typography variant="body1">Are you sure ?</Typography>,
									description: <Box>
													 <Alert severity="error">This action cannot be undone.</Alert>
												</Box>,
									confirmationText: 'Yes, delete it',
									cancellationText: 'Cancel',
									confirmationButtonProps: {
										sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' }
									  },
									  cancellationButtonProps: {
										sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' },
									  },
								  })
									.then(async () => {


											await setSelectedId(rowData?.id);
											setTimeout(async () => {
												await deleteIssuance();
												await getIssuance();
											},200)	
									})
									.catch(() => {
								
									});
								}}  
							size="small">
							Delete 
						</Button>
	
						{rowData?.status == 'pending' && <Button 
						 
							onClick={async () => {

								confirm({
									title: <Typography variant="body1">Are you sure ?</Typography>,
																		description: <Box>
																		             	<Alert severity="warning">This action cannot be undone.</Alert>
																		            </Box>,
																		confirmationText: 'Yes, dispatch it',
																		cancellationText: 'Cancel',
																		confirmationButtonProps: {
																			sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' }
																		  },
																		  cancellationButtonProps: {
																			sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' },
																		  },
								  })
									.then(async () => {
										await setSelectedId(rowData?.id);
										setTimeout(async () => {
											await dispatchIssuance();
											await getIssuance();
										},200)	
									})
									.catch(() => {
								
									});
												}}  
							size="small">
							Dispatch 
						</Button>}
		
				</>
			} }
		])

	},[fetchedIssuance?.data,mdDown]);

	
	return <>
	

		{ !isLoading   && <Box style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button variant="outlined" sx={{ mb : 2 }} onClick={() => {
					appContext.setDialog({ title : 'Add issuance', subtitle : fetchedIssuance?.data?.form_name + ' ('+ code + ')', component : <IssuanceForm loadedCompanies={fetchedIssuance?.data?.loaded_companies} update={getIssuance} code={code} end={fetchedIssuance?.data?.form_end} />, isOpen: true})
				}}>+ Add issuance </Button>
			</Box> }

			<TableAG row={fetchedIssuance?.data?.issuances} column={colDefs} loading={isLoading || deleteIssuanceLoading || dispatchIssuanceLoading} title='' search={false}/>
	
	</>;
}
