import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { PenNibStraight as PenNibStraightIcon } from "@phosphor-icons/react/dist/ssr/PenNibStraight";
import { Table as TableIcon } from "@phosphor-icons/react/dist/ssr/Table";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";
 
import { CardSummary } from "@/components/widgets/card/card-summary";
import { CardChart } from "@/components/widgets/card/card-chart";

import useAxios  from "@/hooks/use-axios";

const metadata = { title: `${appConfig.name}` };

export function Page() {

   const [tab, setTab] = React.useState('');
   const { axiosGet } = useAxios();
   const {  data : fetchedAcknowledgement, refetch   }  = axiosGet({  id : 'acknowledgements-dashboard-overview' , url : import.meta.env.VITE_API_BASE_URL + '/dashboard/acknowledgements' });
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
				<Stack spacing={4}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "flex-start" }}>
						<Box sx={{ flex: "1 1 auto" }}>
							<Typography variant="h5" sx={{ fontWeight : 'bold' }}>Overview</Typography>
						</Box>
				
					</Stack>
					<Grid container spacing={2}>
						<Grid 
							// onClick={() => setTab('acknowledgement')}
							// sx={{ cursor : 'pointer' }}
							size={{
								md: 6,
								xs: 12,
							}}
							
						>
							<CardSummary active={tab == 'acknowledgement'} amount={acknowledgement?.total ?? 0}  icon={PenNibStraightIcon} title="Total Acknowledgements" />
						</Grid>
						{/* <Grid
							// onClick={() => setTab('forms')}
							// sx={{ cursor : 'pointer' }}
							size={{
								md: 4,
								xs: 12,
							}}
						>
							 <CardSummary active={tab == 'forms'} amount={240} diff={5} icon={TableIcon} title="Total Forms"  />
						</Grid> */}
						<br></br>
					

						<Grid size={{
								lg: 6,
								xs: 12,
							 }}
						 >
							<CardChart
								title='Acknowledgement Status'
								data={[
									{ name: "Pending", value: acknowledgement?.pending, percent : '', color: "var(--mui-palette-warning-main)" },
									{ name: "Completed", value: acknowledgement?.completed,percent : '', color: "var(--mui-palette-success-main)" },
								]}
							/>
						</Grid>
					</Grid>
				</Stack>
			</Box>
		</React.Fragment>
	);
}
