"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import  Skeleton  from "@mui/material/Skeleton";


import { CardSummary } from "@/components/widgets/card/card-summary";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { Skeleton1 } from "@/components/loader/loading-skeleton";
import useAxios  from "@/hooks/use-axios";
 
export function FormOverview() {

	const { axiosGet } = useAxios();
	const { data : info  }  = axiosGet({  id : 'form-info' , url : import.meta.env.VITE_API_BASE_URL + '/forms/info', refetchOnMount : true  });



	
	return <Grid container spacing={2}>
				    <Grid size={{ md: 3, xs: 6 }}
>
						{info?.data?.pending === undefined ? (<Skeleton1 />
					
							) : (
							<CardSummary 
							    tooltip='Form that are created and basic info editable.'
								icon={InfoIcon} 
								amount={info.data.pending} 
								title="Pending"  
							/>
							)}
												
						</Grid>
						<Grid
						size={{
							md: 3,
							xs: 6,
						}}
					>
						{info?.data?.confirmed === undefined ? (<Skeleton1 />
					
							) : (
							<CardSummary 
							    tooltip='Form that are confirmed is ready for issuance.'
								amount={info.data.confirmed} 
								icon={InfoIcon} 
								title="Confirmed"  
							/>
							)}
												
						</Grid>
					<Grid 	
						size={{
							md: 3,
							xs: 6,
						}}
					>
						{info?.data?.ongoing === undefined ? (<Skeleton1 />
					
							) : (
							<CardSummary 
								tooltip='Form that are already issued to staff.'
								amount={info.data.ongoing} 
								icon={InfoIcon} 
								title="Ongoing"  
							/>
							)}
			       </Grid>
				
					<Grid
						size={{
							md: 3,
							xs: 6,
						}}
					>
						{info?.data?.closed === undefined ? (<Skeleton1 />
					
							) : (
							<CardSummary 
							    tooltip='Form that are closed with remarks.'
								amount={info.data.closed} 
								icon={InfoIcon} 
								title="Closed"  
							/>
							)}
					</Grid>
				</Grid>				
					
}
