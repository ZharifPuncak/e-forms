"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";


import { CardSummary } from "@/components/widgets/card/card-summary";
import { CardChart } from "@/components/widgets/card/card-chart";

import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { PenNibStraight as PenNibStraightIcon } from "@phosphor-icons/react/dist/ssr/PenNibStraight";
import { Table as TableIcon } from "@phosphor-icons/react/dist/ssr/Table";


export function FormOverview() {


	return <Grid container spacing={4}>
					<Grid 	
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={31} diff={15} icon={PenNibStraightIcon} title="Total New" />
			       </Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={240} diff={5} icon={TableIcon} title="Total Pending"  />
					</Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={21} diff={12} icon={UsersIcon} title="Total Completed" />
					</Grid>
				</Grid>				
					
}
