"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import  Skeleton  from "@mui/material/Skeleton";


import { CardSummary } from "@/components/widgets/card/card-summary";

import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { PenNibStraight as PenNibStraightIcon } from "@phosphor-icons/react/dist/ssr/PenNibStraight";
import { Table as TableIcon } from "@phosphor-icons/react/dist/ssr/Table";

import useAxios  from "@/hooks/use-axios";

export function FormOverview() {

	const { axiosGet } = useAxios();
	const { data : info, refetch }  = axiosGet({  id : 'form-info' , url : import.meta.env.VITE_API_BASE_URL + '/forms/info'  });


    // useEffect
	React.useEffect(() => {
		refetch();
	},[]);
	
	return <Grid container spacing={4}>
					<Grid 	
						size={{
							md: 4,
							xs: 12,
						}}
					>
						{info?.data?.new === undefined ? (<>
							<Skeleton height={30} width="100%" /> 
							<Skeleton height={40} width="60%" /> 
							<Skeleton height={40} width="60%" /> 
						</>
					
							) : (
							<CardSummary 
								amount={info.data.new} 
								icon={PenNibStraightIcon} 
								title="Total New"  
							/>
							)}
			       </Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						{info?.data?.pending === undefined ? (<>
							<Skeleton height={30} width="100%" /> 
							<Skeleton height={40} width="60%" /> 
							<Skeleton height={40} width="60%" /> 
						</>
					
							) : (
							<CardSummary 
								amount={info.data.pending} 
								icon={TableIcon} 
								title="Total Pending"  
							/>
							)}
												
						</Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						{info?.data?.completed === undefined ? (<>
							<Skeleton height={30} width="100%" /> 
							<Skeleton height={40} width="60%" /> 
							<Skeleton height={40} width="60%" /> 
						</>
					
							) : (
							<CardSummary 
								amount={info.data.completed} 
								icon={UsersIcon} 
								title="Total Completed"  
							/>
							)}
					</Grid>
				</Grid>				
					
}
