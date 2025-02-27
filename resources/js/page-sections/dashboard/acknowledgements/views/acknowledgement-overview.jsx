"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";


import { CardSummary } from "@/components/widgets/card/card-summary";

import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Table as TableIcon } from "@phosphor-icons/react/dist/ssr/Table";

import useAxios  from "@/hooks/use-axios";

export function AcknowledgementOverview() {

    const { axiosGet } = useAxios();
	const { isLoading, data : fetchedInfo, refetch   }  = axiosGet({  id : 'acknowledgements-info-staff' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/info' });
	
	return <Grid container spacing={4}>
				    <Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={fetchedInfo?.data?.total ?? 0}  icon={TableIcon} title="Total"  />
					</Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={fetchedInfo?.data?.pending ?? 0}  icon={TableIcon} title="Total Pending"  />
					</Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={fetchedInfo?.data?.completed ?? 0} icon={UsersIcon} title="Total Completed" />
					</Grid>
				</Grid>				
					
}
