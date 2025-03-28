import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { FormOverview } from "@/page-sections/dashboard/forms/views/form-overview";
import { FormTable } from "@/page-sections/dashboard/forms/views/form-table";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";


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
				    	<FormTable />
				</Stack>
			</Box>
		</React.Fragment>
	);
}
