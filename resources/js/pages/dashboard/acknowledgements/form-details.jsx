import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";
import { useParams } from "react-router"
import { paths } from "@/paths";

import { AcknowledgementFormDetails } from "@/page-sections/dashboard/acknowledgements/views/acknowledgement-form-details";
import { ShortSkeleton } from "@/components/loader/loading-skeleton";


const metadata = { title: `${appConfig.name}` };

export function Page() {

	const { code } = useParams();
	const [name, setName] = React.useState('');

	const updateName = (value) => {
		setName(value);
	}
	
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

					
				<div>
						<Link
							color="text.primary"
							href={window.location.origin + '/e-forms' + paths.dashboard.acknowledgements.status}
							sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
							variant="subtitle2"
						>
							<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
							List Acknowledgements
						</Link>
					</div>


					<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
						<Box sx={{ flex: "1 1 auto" }}>
							{name ? <Typography variant="h5" sx={{ fontWeight: "bold" }}>{name}</Typography> : <ShortSkeleton />}
							<Typography color="text.secondary" variant="caption">
							     	{ code } 
							</Typography>
						</Box>
				
					</Stack>

					{/* Declaration Details */}
					<AcknowledgementFormDetails updateName={updateName}/>

				</Stack>
			</Box>
		</React.Fragment>
	);
}
