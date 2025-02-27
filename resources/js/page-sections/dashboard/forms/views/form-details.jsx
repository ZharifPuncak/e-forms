"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

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
import { FormFile } from "./form-file";

import { useAppContext } from "@/contexts/app-context";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";


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
	const { axiosGet, axiosMutate } = useAxios();
	const navigate = useNavigate();
	const { isLoading: getLoading, data : fetchedDetails, refetch   }  = axiosGet({  id : 'forms-details' + code, url : import.meta.env.VITE_API_BASE_URL + '/forms/details/' + code, cacheTime : 1 * 60 * 1000, staleTime :  1 * 60 * 1000 });
	const { mutate : confirmForm, isLoading : confirmLoading, isSuccess : confirmSuccess  } =  axiosMutate({ id: 'forms-confirm' + code, method : 'put', url : import.meta.env.VITE_API_BASE_URL + '/forms/confirm', payload : { code } });
	const { mutate : deleteForm, isLoading : deleteFormLoading, isSuccess : deleteFormSuccess  } =  axiosMutate({ id: 'forms-delete' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/delete', payload : { code } });

	let data = fetchedDetails?.data?.data;

	React.useEffect(() => {
		if(confirmSuccess){
			refetch()
		}
	},[confirmSuccess])

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
				window.location.href = window.location.origin + '/dashboard/forms';
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
														{ key: "Name", value: <Typography sx={{ ml : 1 }} variant="body2">{ data?.name }</Typography> },
														{ key: "Alias", value: <Typography sx={{ ml : 1 }} variant="body2">{ data?.alias }</Typography> },
														{ key: "Code", value: <Typography sx={{ ml : 1 }} variant="body2">{ data?.code }</Typography> },
														{ key: "Category", value: <Typography sx={{ ml : 1 }} variant="body2">{ data?.category?.name }</Typography> },
														{ key: "Effective", value: <Typography sx={{ ml : 1 }} variant="body2">{ data?.effective_from } - { data?.effective_to }</Typography> },
														{ key: "Details", value: <Accordion1 details={
															<HTMLParse htmlContent={data?.descriptions} />
														} title={ <Typography sx={{ color : '#4DADDE' }} variant="body2">View details</Typography>} />},
														{ key: "File", value: <Accordion1 details={
															 <FormFile update={refetch} status={data?.status} />
														} title={
															<>
																{!data?.isFileReady ? <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><ExclamationMarkIcon color="var(--mui-palette-error-main)" /> <Typography sx={{ color : '#4DADDE' }} variant="body2">Add File</Typography></Box> : <Typography sx={{ color : '#4DADDE' }} variant="body2">View file details</Typography>}			
															</>
															} />},
														{
															key: "Status",
															value: (
																	<Chip
																		icon={data?.status == 'new' ? 
																			<CardsThreeIcon color="var(--mui-palette-warning-main) " weight="fill" /> :
																			data?.status == 'pending' ? <HourglassHighIcon color="var(--mui-palette-warning-main)" /> : 
																			data?.status == 'ongoing' ? <HourglassHighIcon color="var(--mui-palette-success-main)" /> : 
																		     data?.status == 'closed' ? <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> :
																			data?.status == 'confirmed' ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> :
																		''}
																		label={_.capitalize(data?.status)}
																		size="small"
																		variant="outlined"
																	/>
															),
														},
														{ key: "Action", value:  	<Grid container spacing={1}>
														       <>
															   {!getLoading && !confirmLoading && <Box>
																<Button disabled={data?.status != 'pending'} onClick={() => {  appContext.setDialog({ isOpen : true, title : `${data?.name}`, subtitle : `${data?.code}`,component : <InfoForm update={refetch} item={data}  /> })}} size="small">Edit </Button>
																<Button disabled={data?.status != 'pending'} size="small" onClick={async () => {
																	confirm({
																		title: "Are you sure?",
																		description: "This action cannot be undone.",
																		confirmationText: "Yes, delete it",
																		cancellationText: "Cancel",
																	  })
																		.then(() => {
																		  deleteForm();
																		})
																		.catch(() => {
																	
																		});
																}}>Delete </Button>
														         {data?.status == 'pending' && <Button disabled={!data?.isFileReady} onClick={confirmForm}  size="small">Confirm </Button>}
															     {data?.status != 'pending' && <Button disabled={!data?.isFileReady} onClick={confirmForm}  size="small">Mark as Closed </Button>}
															     {data?.status == 'ongoing' || data?.status == 'closed' && <Button size="small" >Report </Button>}
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
