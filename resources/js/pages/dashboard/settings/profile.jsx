import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { PasswordForm } from "@/page-sections/dashboard/settings/profile/forms/password-form";

const metadata = { title: `${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Stack spacing={4}>
				<div>
					<Typography variant="h5" sx={{ fontWeight : 'bold' }}>Profile</Typography>
				</div>
				<Stack spacing={4}>
					 <PasswordForm />
				</Stack>
			</Stack>
		</React.Fragment>
	);
}
