import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { AcknowledgementOverview } from "@/page-sections/dashboard/acknowledgements/views/acknowledgement-overview";
import { AcknowledgementFormTable } from "@/page-sections/dashboard/acknowledgements/views/acknowledgement-form-table";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";

import { useMediaQuery } from "@/hooks/use-media-query";

const metadata = { title: `${appConfig.name}` };

export function Page() {
	const mdDown = useMediaQuery("down", "md");

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
								<Typography variant="h5" sx={{ fontWeight : 'bold' }}>List Acknowledgements</Typography>
							</Box>
						</Stack>
						<Grid container spacing={2}>
							{!mdDown && <Grid size={{ xs : 12 }}>
								<AcknowledgementOverview />
							</Grid>}

					
							<Grid size={{  xs: 12 }}>
								<AcknowledgementFormTable />
							</Grid>
							
						</Grid>
					
				</Stack>
			</Box>
		</React.Fragment>
	);
}
