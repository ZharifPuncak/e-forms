"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";


import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CardsThree as CardsThreeIcon } from "@phosphor-icons/react/dist/ssr/CardsThree";

import Accordion1 from "@/components/widgets/accordions/accordion-1";
import useAxios  from "@/hooks/use-axios";
import { useParams } from "react-router-dom";

import InfoForm from "../forms/info-form";
import { useAppContext } from "@/contexts/app-context";
import { useConfirm } from "material-ui-confirm";
import _ from 'lodash';

export function FormDetails() {
    
	const appContext = useAppContext();
	const confirm = useConfirm();
	const { code } = useParams();
	const { axiosGet, axiosMutate } = useAxios();
	const { isLoading, data : fetchedDetails, refetch   }  = axiosGet({  id : 'forms-details' + code, url : import.meta.env.VITE_API_BASE_URL + '/forms/details/' + code, cacheTime : 1 * 60 * 1000, staleTime :  1 * 60 * 1000 });

	
     
	let data = fetchedDetails?.data?.data;
	
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
															<p>
															{ data?.descriptions }
															</p>
																
														
														} title={<Typography sx={{ color : '#4DADDE' }} variant="body2">View details</Typography>} />},
														{
															key: "Status",
															value: (
																	<Chip
																		icon={data?.status == 'new' ? 
																			<CardsThreeIcon color="var(--mui-palette-warning-main) " weight="fill" /> :
																			data?.status == 'pending' ? <HourglassHighIcon color="var(--mui-palette-error-main)" /> : 
																		     data?.status == 'closed' ? <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> :
																			data?.status == 'completed' ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> :
																		''}
																		label={_.capitalize(data?.status)}
																		size="small"
																		variant="outlined"
																	/>
															),
														},
														{ key: "Action", value:  	<Grid container spacing={1}>
															{data?.status == 'new' && <>
																<Button onClick={() => {  appContext.setDialog({ isOpen : true, title : `${data?.name}`, subtitle : `${data?.code}`,component : <InfoForm update={refetch} item={data}  /> })}} size="small">Edit </Button>
																<Button size="small" onClick={async () => {
																	 const { confirmed, reason } = await confirm({
																		description: "This action is permanent!",
																	  });
																  
																	  if (confirmed) {
																		/* ... */
																	  }
																}}>Delete </Button>
																<Button size="small">Confirm </Button>
															</>}
															    
															 {data?.status == 'completed' && <Button size="small" >Report </Button>}
													</Grid> },
													].map((item) => (
														<PropertyItem key={item.key} name={item.key} value={item.value} />
													))}
												</PropertyList>
						</Card>
					</Grid>
				</Grid>				
					
}
