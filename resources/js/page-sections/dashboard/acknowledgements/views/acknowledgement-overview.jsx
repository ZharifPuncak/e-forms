"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";


import { CardSummary } from "@/components/widgets/card/card-summary";

import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Table as TableIcon } from "@phosphor-icons/react/dist/ssr/Table";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { Skeleton1 } from "@/components/loader/loading-skeleton";
import useAxios  from "@/hooks/use-axios";

export function AcknowledgementOverview() {

    const { axiosGet } = useAxios();
	const { isLoading, data : fetchedInfo, refetch  }  = axiosGet({  id : 'acknowledgements-info-staff' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/info' });
	

	React.useEffect(() => {
		refetch();
	},[]);

	return <Grid container spacing={4}>
				    <Grid
						size={{
							lg: 3,
							md: 4,
							xs: 6,
						}}
					>
						{!isLoading ? <CardSummary  amount={fetchedInfo?.data?.total ?? 0}  icon={InfoIcon} tooltip="Total acknowledgement" title="Total"  /> : <Skeleton1 />}
					</Grid>
					<Grid
						size={{
							lg: 3,
							md: 4,
							xs: 6,
						}}
					>
						{!isLoading  ? <CardSummary  amount={fetchedInfo?.data?.pending ?? 0}  icon={InfoIcon} tooltip="Acknowledgement that need to be submitted" title="Pending"  />: <Skeleton1 />}
					</Grid>
					<Grid
						size={{
							lg: 3,
							md: 4,
							xs: 6,
						}}
					>
						{!isLoading  ? <CardSummary  amount={fetchedInfo?.data?.completed ?? 0} icon={InfoIcon} tooltip="Acknowledgement that already submitted" title="Completed" />: <Skeleton1 />}
					</Grid>
					<Grid
						size={{
							lg: 3,
							md: 4,
							xs: 6,
						}}
					>
						{!isLoading  ?<CardSummary  amount={fetchedInfo?.data?.incompleted ?? 0} icon={InfoIcon} tooltip="Acknowledgement that are not longer able to submit" title="Incompleted" /> : <Skeleton1 />}
					</Grid>
				</Grid>				
					
}
