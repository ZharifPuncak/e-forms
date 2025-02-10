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

import { FormView } from "@/page-sections/dashboard/forms/views/form-view";
import { FormTabs } from "@/page-sections/dashboard/forms/views/form-tabs";


const metadata = { title: `${appConfig.name}` };

export function Page() {

	const { code } = useParams();
	const [tab, setTab] = React.useState('declaration');

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
							href={paths.dashboard.forms.list}
							sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
							variant="subtitle2"
						>
							<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
							List Form
						</Link>
					</div>


					<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
						<Box sx={{ flex: "1 1 auto" }}>
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>Personal Data Protection Act</Typography>
							<Typography color="text.secondary" variant="caption">
							     	{ code } 
							</Typography>
						</Box>
				
					</Stack>

					{/* Form View */}
					<FormView />


					{/* Form Tabs */}
					<FormTabs />
				
				</Stack>
			</Box>
		</React.Fragment>
	);
}
