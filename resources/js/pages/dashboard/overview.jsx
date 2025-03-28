import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";

import { Calendar1 } from "@/components/widgets/calendar/fullcalendar";
import { AcknowledgementOverview } from "@/page-sections/dashboard/acknowledgements/views/acknowledgement-overview";
import { ListStatus } from "./components/list-status";
import useAxios  from "@/hooks/use-axios";

const metadata = { title: `${appConfig.name}` };


export function Page() {

	const { axiosGet } = useAxios();
	const {  data : fetchedAcknowledgement, isLoading  }  = axiosGet({  id : 'acknowledgements-dashboard-overview' , url : import.meta.env.VITE_API_BASE_URL + '/dashboard/acknowledgements', refetchOnMount : true });
	const acknowledgement = fetchedAcknowledgement?.data;
 


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
							      <AcknowledgementOverview acknowledgement={acknowledgement} isLoading={isLoading} />
							</Grid>


							<Grid sx={{ mt : 4 }} size={{ xs : 12, md : 12}}>
								<Calendar1 events={acknowledgement?.acknowledgements}/>
							</Grid>

						
						</Grid>
					</Stack>
			
			</Box>
		</React.Fragment>
	);
}
