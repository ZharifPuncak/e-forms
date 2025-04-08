"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";

import { CardStats } from "@/components/widgets/card/card-stats";

import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { Skeleton1 } from "@/components/loader/loading-skeleton";

export function AcknowledgementOverview({ acknowledgement, isLoading }) {

    

	return <Grid  container spacing={2}>

					{/* <Grid size={{ xs:3 }}>
						{!isLoading  ? <CardStats  amount={acknowledgement?.total ?? 0}  icon={InfoIcon} tooltip="Total acknowledgements" title="Total"  />: <Skeleton1 />}
					</Grid> */}
					<Grid size={{ xs: 6,sm : 3 }} >
						{!isLoading  ? <CardStats  amount={acknowledgement?.pending ?? 0} icon={InfoIcon} tooltip="Acknowledgement that need to be submitted" title="Pending" /> : <Skeleton1 />}
					</Grid>
					<Grid size={{ xs: 6,sm : 3  }}>
						{!isLoading  ? <CardStats  amount={acknowledgement?.completed ?? 0} icon={InfoIcon} tooltip="Acknowledgement that already submitted" title="Completed" />: <Skeleton1 />}
					</Grid>
				
					<Grid size={{ xs: 6,sm : 3  }} >
						{!isLoading  ? <CardStats  amount={acknowledgement?.incompleted ?? 0} icon={InfoIcon} tooltip="Acknowledgement that are not longer able to submit" title="Incompleted" /> : <Skeleton1 />}
					</Grid>
				
					<Grid size={{ xs: 6,sm : 3  }} >
						{!isLoading  ? <CardStats  amount={acknowledgement?.cancelled ?? 0} icon={InfoIcon} tooltip="Acknowledgement that form is cancelled" title="Cancelled" /> : <Skeleton1 />}
					</Grid>
				</Grid>				
			
}
