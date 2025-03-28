import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";
 
import { AcknowledgementOverview } from "@/page-sections/dashboard/acknowledgements/views/acknowledgement-overview";

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
			
					<Stack  spacing={4}>
						<Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "flex-start" }}>
							<Box sx={{ flex: "1 1 auto" }}>
								<Typography variant="h5" sx={{ fontWeight : 'bold' }}>Overview</Typography>
							</Box>
					
						</Stack>
						<Grid container spacing={2}>
							
							<Grid size={{ xs : 12 }}>
								<AcknowledgementOverview />
							</Grid>

						</Grid>
					</Stack>
			
			</Box>
		</React.Fragment>
	);
}
