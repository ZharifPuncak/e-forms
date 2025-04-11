import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";

import { StaffTable } from "@/page-sections/dashboard/staff/views/staff-table";
 
const metadata = { title: `${appConfig.name}` };

export function Page() {

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
							<Typography variant="h5" sx={{ fontWeight : 'bold' }}>Staff List</Typography>
						</Box>
					</Stack>

					
					 <StaffTable />
				</Stack>
			</Box>
		</React.Fragment>
	);
}
