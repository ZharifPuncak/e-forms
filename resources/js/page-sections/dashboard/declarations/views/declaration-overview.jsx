"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";


import { CardSummary } from "@/components/widgets/card/card-summary";

import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { PenNibStraight as PenNibStraightIcon } from "@phosphor-icons/react/dist/ssr/PenNibStraight";
import { Table as TableIcon } from "@phosphor-icons/react/dist/ssr/Table";


export function DeclarationOverview() {


	return <Grid container spacing={4}>
				    <Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={5}  icon={TableIcon} title="Total"  />
					</Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={1}  icon={TableIcon} title="Total Pending"  />
					</Grid>
					<Grid
						size={{
							md: 4,
							xs: 12,
						}}
					>
						<CardSummary  amount={4} icon={UsersIcon} title="Total Completed" />
					</Grid>
				</Grid>				
					
}
