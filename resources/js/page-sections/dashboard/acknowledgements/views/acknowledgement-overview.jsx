"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";

import { CardSummary } from "@/components/widgets/card/card-summary";

import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { Skeleton1 } from "@/components/loader/loading-skeleton";
import useAxios  from "@/hooks/use-axios";

export function AcknowledgementOverview() {

    const { axiosGet } = useAxios();
	const { isLoading, data : fetchedInfo, refetch  }  = axiosGet({  id : 'acknowledgements-info-staff' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/info' });

	React.useEffect(() => {
		refetch();
	},[]);

	return <Grid container spacing={2}>
				    <Grid
						size={{	
							xs: 6,
						}}
					>
						{!isLoading ? <CardSummary bColor={'#007FAB'}  amount={'Status'}  icon={InfoIcon}  title="Overview"  /> : <Skeleton1 />}
					</Grid>
					<Grid
						size={{
						
						
							xs: 3,
						}}
					>
						{!isLoading  ? <CardSummary  amount={fetchedInfo?.data?.total ?? 0}  icon={InfoIcon} tooltip="Total acknowledgements" title="Total"  />: <Skeleton1 />}
					</Grid>
					<Grid
						size={{
						
						
							xs: 3,
						}}
					>
						{!isLoading  ? <CardSummary  amount={fetchedInfo?.data?.completed ?? 0} icon={InfoIcon} tooltip="Acknowledgement that already submitted" title="Completed" />: <Skeleton1 />}
					</Grid>
					<Grid
						size={{
						
							xs: 3,
						}}
					>
						{!isLoading  ?<CardSummary  amount={fetchedInfo?.data?.incompleted ?? 0} icon={InfoIcon} tooltip="Acknowledgement that are not longer able to submit" title="Incompleted" /> : <Skeleton1 />}
					</Grid>
					<Grid
						size={{
							xs: 6,
						}}
					>
						{!isLoading  ?<CardSummary  amount={fetchedInfo?.data?.incompleted ?? 0} icon={InfoIcon} tooltip="Acknowledgement that need to be submitted" title="Pending" /> : <Skeleton1 />}
					</Grid>
					<Grid
						size={{
							xs: 3,
						}}
					>
						{!isLoading  ?<CardSummary  amount={fetchedInfo?.data?.cancelled ?? 0} icon={InfoIcon} tooltip="Acknowledgement that are not longer able to submit" title="Cancelled" /> : <Skeleton1 />}
					</Grid>
				</Grid>				
			
}
