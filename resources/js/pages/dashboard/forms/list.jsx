import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardSummary } from "@/components/widgets/card/card-summary";
import { CardChart } from "@/components/widgets/card/card-chart";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";

import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { PenNibStraight as PenNibStraightIcon } from "@phosphor-icons/react/dist/ssr/PenNibStraight";
import { Table as TableIcon } from "@phosphor-icons/react/dist/ssr/Table";

const metadata = { title: `${appConfig.name}` };

export function Page() {

	const [tab, setTab] = React.useState('new');

	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Box
				sx={{
					maxWidth: "var(--Content-maxWidth)",
					m: "var(--Content-margin)",
					p: "var(--Content-padding)",
					width: "var(--Content-width)",
				}}
			>
				<Stack spacing={4}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
						<Box sx={{ flex: "1 1 auto" }}>
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>List Form</Typography>
						</Box>
					</Stack>
				
					<Grid container spacing={4}>
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
					
				</Stack>
			</Box>
		</React.Fragment>
	);
}
