"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";

import { CardSummary } from "@/components/widgets/card/card-summary";

import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { Skeleton1 } from "@/components/loader/loading-skeleton";
import useAxios  from "@/hooks/use-axios";
import { useMediaQuery } from "@/hooks/use-media-query";


export function AcknowledgementOverview() {

      const { axiosGet } = useAxios();
	  const smDown = useMediaQuery("down", "sm");
	  const {  data : fetchedAcknowledgement, isLoading  }  = axiosGet({  id : 'acknowledgements-dashboard-overview' , url : import.meta.env.VITE_API_BASE_URL + '/dashboard/acknowledgements', refetchOnMount : true });
	  const acknowledgement = fetchedAcknowledgement?.data;
   
   
   

	return <Grid  container spacing={2}>
				    <Grid size={{	xs: 6, sm: 4 }}>
						{!isLoading ? <CardSummary bColor={'#007FAB'}  amount={'Status'}  icon={InfoIcon}  title="Acknowledgement"  /> : <Skeleton1 />}
					</Grid>
					<Grid size={{ xs:6, sm: 2.5 }}>
						{!isLoading  ? <CardSummary  amount={acknowledgement?.total ?? 0}  icon={InfoIcon} tooltip="Total acknowledgements" title="Total"  />: <Skeleton1 />}
					</Grid>
					<Grid size={{ xs:6, sm: 2.5 }}>
						{!isLoading  ? <CardSummary  amount={acknowledgement?.completed ?? 0} icon={InfoIcon} tooltip="Acknowledgement that already submitted" title="Completed" />: <Skeleton1 />}
					</Grid>
					<Grid size={{ xs:6, sm: 3}} >
						{!isLoading  ? <CardSummary  amount={acknowledgement?.pending ?? 0} icon={InfoIcon} tooltip="Acknowledgement that need to be submitted" title="Pending" /> : <Skeleton1 />}
					</Grid>
					<Grid size={{ xs:6, sm: 3}} >
						{!isLoading  ? <CardSummary  amount={acknowledgement?.incompleted ?? 0} icon={InfoIcon} tooltip="Acknowledgement that are not longer able to submit" title="Incompleted" /> : <Skeleton1 />}
					</Grid>
				    {!smDown && <Grid size={{ xs: 6 }} >
						{!isLoading  ? <CardSummary bColor={'#007FAB'}  amount={acknowledgement?.today}  title="Today" /> : <Skeleton1 />}
					</Grid>}
					<Grid size={{ xs:6, sm: 3}} >
						{!isLoading  ? <CardSummary  amount={acknowledgement?.cancelled ?? 0} icon={InfoIcon} tooltip="Acknowledgement that form is cancelled" title="Cancelled" /> : <Skeleton1 />}
					</Grid>
				</Grid>				
			
}
