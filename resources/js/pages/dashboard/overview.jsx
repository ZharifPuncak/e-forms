import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";

import { Calendar1 } from "@/components/widgets/calendar/fullcalendar";
import { CardChart } from "@/components/widgets/card/card-chart";

import { AcknowledgementOverview } from "@/page-sections/dashboard/acknowledgements/views/acknowledgement-overview";
import { FormRecentList } from "@/page-sections/dashboard/forms/views/form-recent-list";


import useAxios  from "@/hooks/use-axios";
import { purple } from '@mui/material/colors';

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
							
						

						<Grid size={{ xs : 12 , lg : 7 }}>
								<Box>
								   <Card sx={{ height : { xs :  '410px', md : '465px' }}}>
										<CardHeader title={<Typography variant="h6" sx={{ fontWeight : 'bold' }}>Recent Forms</Typography>} />
										<CardContent>
											<FormRecentList data={acknowledgement?.forms} />
										</CardContent>
									</Card>
								</Box>
							</Grid>
						


							<Grid size={{ xs : 12 , lg : 5 }}>
								<Box>
									<CardChart title='Form Status' total={acknowledgement?.formStats?.total} 	data={[
										{ name: "Pending", value: acknowledgement?.formStats?.pending, percent : '', color: "var(--mui-palette-warning-main)" },
										{ name: "Confirmed", value: acknowledgement?.formStats?.confirmed, percent : '', color: purple['500'] },
										{ name: "Ongoing", value: acknowledgement?.formStats?.ongoing ,percent : '', color: "var(--mui-palette-success-main)" },
										{ name: "Closed", value: acknowledgement?.formStats?.closed,percent : '', color: "var(--mui-palette-secondary-main)" },
									 ]}/>
								</Box>
							</Grid> 

						
							<Grid size={{ xs : 12 , lg : 12 }}>
								<Box>
								   <Card >
										<CardHeader title={<Typography variant="h6" sx={{ fontWeight : 'bold' }}>Acknowledgement Status</Typography>} />
										<CardContent>
											<AcknowledgementOverview acknowledgement={acknowledgement} isLoading={isLoading} />
										</CardContent>
									</Card>
								</Box>
							</Grid>


							


							<Grid  size={{ xs : 12, lg : 12 }}>
								<Calendar1 events={acknowledgement?.acknowledgements}/>
							</Grid>

						
						</Grid>
					</Stack>
			
			</Box>
		</React.Fragment>
	);
}
