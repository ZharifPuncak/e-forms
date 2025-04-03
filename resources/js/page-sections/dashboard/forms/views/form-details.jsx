"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import LoadingButton from "@mui/lab/LoadingButton";

import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";

 
import { ExclamationMark as ExclamationMarkIcon } from "@phosphor-icons/react/dist/ssr/ExclamationMark";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CardsThree as CardsThreeIcon } from "@phosphor-icons/react/dist/ssr/CardsThree";

import Accordion1 from "@/components/widgets/accordions/accordion-1";
import useAxios  from "@/hooks/use-axios";
import { useParams } from "react-router-dom";

import InfoForm from "../forms/info-form";
import CloseForm from "../forms/close-form";
import { FormFile } from "./form-file";

import { useAppContext } from "@/contexts/app-context";
import { useConfirm } from "material-ui-confirm";

import Alert from '@mui/material/Alert';



import _ from 'lodash';

const HTMLParse = ({ htmlContent })  => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}

export function FormDetails({ updateReady, updateName }) {
    
	const appContext = useAppContext();
	const confirm = useConfirm();
	const { code } = useParams();
	const [remarks,setRemarks] = React.useState('');
	const { axiosGet, axiosMutate } = useAxios();


	const { isLoading: getLoading, data : fetchedDetails, refetch   }  = axiosGet({  id : 'forms-details' + code, url : import.meta.env.VITE_API_BASE_URL + '/forms/details/' + code, cacheTime : 1 * 60 * 1000, staleTime :  1 * 60 * 1000 });
	const { mutate : confirmForm, isLoading : confirmLoading, isSuccess : confirmSuccess  } =  axiosMutate({ id: 'forms-confirm' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/confirm', payload : { code } });
	const { mutate : deleteForm, isLoading : deleteFormLoading, isSuccess : deleteFormSuccess  } =  axiosMutate({ id: 'forms-delete' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/delete', payload : { code } });
	const { mutate : downloadReport, isLoading : downloadLoading, data : reportData, isSuccess : dowloadSuccess, dataUpdatedAt  } =  axiosMutate({ id: 'report-forms-download' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/report/form', payload : { code }, isFileDownload : true });
	const { mutate : closeForm, isLoading : closeLoading, isSuccess : closeSuccess  } =  axiosMutate({ id: 'forms-close' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/close', payload : { code, remarks } });
	let data = fetchedDetails?.data?.data;

	React.useEffect(() => {
	if(dowloadSuccess){    


		//Create a Blob from Base64
		const byteCharacters = atob(reportData.base64);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: "application/pdf" });

		// Create Download Link
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		link.setAttribute("download", 'form_report');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

	}
	},[dowloadSuccess,dataUpdatedAt]);

	React.useEffect(() => {
		if(confirmSuccess || closeSuccess){
			refetch()
		}
	},[confirmSuccess,closeSuccess])

	React.useEffect(() => {

		if(data?.status){
			if(data?.status != 'pending'){
				updateReady(true)
			}else{
				updateReady(false)
			}
		}

	},[data?.status])

	React.useEffect(() => {
		if(deleteFormSuccess){
			setTimeout(() => {
				window.location.href = window.location.origin + '/e-forms/dashboard/forms';
			},250)
		}
	},[deleteFormSuccess])

	React.useEffect(() => {
		if(data?.name){
			updateName(data?.name);
		}
	},[data?.name])

	
	return  <Grid container spacing={4}>

					<Grid 	size={{ md: 12, xs: 12 }} >
						<Card sx={{ borderRadius: 1 }} variant="outlined">
												<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
													{[
														{ key: "Name", value:  data?.name ? <Typography sx={{ ml : 1 }} variant="body2">{ data?.name }</Typography> : <Skeleton width={200} height={25} />},
														{ key: "Alias", value: data?.alias ? <Typography sx={{ ml : 1 }} variant="body2">{ data?.alias }</Typography> : <Skeleton width={150} height={25} /> },
														{ key: "Code", value:  data?.code ?  <Typography sx={{ ml : 1 }} variant="body2">{ data?.code }</Typography> : <Skeleton width={50} height={25} /> },
														{ key: "Category", value: data?.category?.name ? <Typography sx={{ ml : 1 }} variant="body2">{ data?.category?.name }</Typography> : <Skeleton width={70} height={25} /> },
														{ key: "Effective", value: data?.effective_from && data?.effective_to ? <Typography sx={{ ml : 1 }} variant="body2">{ data?.effective_from } - { data?.effective_to }</Typography> : <Skeleton width={200} height={25} /> },
														{ key: "Details", value: data?.descriptions ? <Accordion1 details={
															<HTMLParse htmlContent={data?.descriptions} />
														} title={ <Typography sx={{ color : '#4DADDE' }} variant="body2">View details</Typography>} /> : <Skeleton width={200} height={25} />},
														{ key: "File", value: data?.status ? <Accordion1 details={
															 <FormFile update={refetch} status={data?.status} />
														} title={
															<>
																{!data?.isFileReady ? <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><ExclamationMarkIcon color="var(--mui-palette-error-main)" /> <Typography sx={{ color : '#4DADDE' }} variant="body2">Add File</Typography></Box> : <Typography sx={{ color : '#4DADDE' }} variant="body2">View file details</Typography>}			
															</>
															} /> :  <Skeleton width={200} height={25} />  },
														{
															key: "Status",
															value: (
																data?.status ? 	<><Chip
																		icon={data?.status == 'new' ? 
																			<CardsThreeIcon color="var(--mui-palette-warning-main) " weight="fill" /> :
																			data?.status == 'pending' ? <HourglassHighIcon color="var(--mui-palette-warning-main)" /> : 
																			data?.status == 'ongoing' ? <HourglassHighIcon color="var(--mui-palette-success-main)" /> : 
																		     data?.status == 'closed' ? <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> :
																			data?.status == 'confirmed' ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> :
																		''}
																		label={_.capitalize(data?.status == 'closed' ? data?.status + ' - ' + data?.closed_status : data?.status)}
																		size="small"
																		variant="outlined"
																	/> </> : <Skeleton width={100} height={25} />
															),
														},
														{ key: "Remarks", value: !getLoading ? <Typography sx={{ ml : 1 }} variant="body2">{ data?.remarks }</Typography> : <Skeleton width={70} height={25} /> },

														{ key: "Action", value:  	<Grid container spacing={1}>
														       <>
															   {!getLoading && !confirmLoading && <Box>
																<Button disabled={data?.status != 'pending'} onClick={() => {  appContext.setDialog({ isOpen : true, title : `${data?.name}`, subtitle : `${data?.code}`,component : <InfoForm update={refetch} item={data}  /> })}} size="small">Edit </Button>
																<Button disabled={data?.status != 'pending'} size="small" onClick={async () => {
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
																		.then(() => {
																		     deleteForm();
																		})
																		.catch(() => {
																	
																		});
																}}>Delete </Button>
														         {data?.status == 'pending' && <Button disabled={!data?.isFileReady} onClick={() => {
																	confirm({
																		title: <Typography variant="body1">Are you sure ?</Typography>,
																		description: <Box>
																		             	<Alert severity="warning">This action cannot be undone.</Alert>
																				
																		            </Box>,
																		confirmationText: 'Yes, confirm it',
																		cancellationText: 'Cancel',
																		confirmationButtonProps: {
																			sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' }
																		  },
																		  cancellationButtonProps: {
																			sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' },
																		  },
																	  })
																		.then(() => {
																		     confirmForm();
																		})
																		.catch(() => {
																	
																		});
																 }}  size="small">Confirm </Button>}
															      {<LoadingButton loading={closeLoading} disabled={data?.status != 'ongoing'} onClick={() => {

																		appContext.setDialog({title: 'Close Form',subtitle: data?.name + '  |  ' + data?.alias + '  |  ' + data?.code, isOpen : true, component : <Box>	<Alert sx={{ mb : 4 }} severity="warning">This action cannot be undone.</Alert>
																				<CloseForm code={data?.code} update={refetch} /></Box> })

																    }} size="small">Mark as Closed </LoadingButton>}
															     {<LoadingButton disabled={data?.status != 'closed'} loading={downloadLoading} onClick={() => {
																	downloadReport()
																 }} size="small" >Report </LoadingButton>}
															   </Box>}
															</>
															    
														
													</Grid> },
													].map((item) => (
														<PropertyItem key={item.key} name={item.key} value={item.value} />
													))}
												</PropertyList>
						</Card>
					</Grid>
				</Grid>				
					
}
