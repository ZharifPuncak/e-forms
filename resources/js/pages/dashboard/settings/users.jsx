import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { AccountDetails } from "@/page-sections/dashboard/settings/account-details";
import { DeleteAccount } from "@/page-sections/dashboard/settings/delete-account";
import { Privacy } from "@/page-sections/dashboard/settings/privacy";
import { ThemeSwitch } from "@/page-sections/dashboard/settings/theme-switch";

const metadata = { title: `User List | ${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Stack spacing={4}>
				<div>
					<Typography variant="h4">User List</Typography>
				</div>
				<Stack spacing={4}>
					<AccountDetails />
					<ThemeSwitch />
					<Privacy />
					<DeleteAccount />
				</Stack>
			</Stack>
		</React.Fragment>
	);
}
