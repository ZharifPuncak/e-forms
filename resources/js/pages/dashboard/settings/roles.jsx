import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { dayjs } from "@/lib/dayjs";
import { Roles } from "@/page-sections/dashboard/settings/acl/roles";


const metadata = { title: `Roles | ${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Stack spacing={4}>
				<div>
					<Typography variant="h4">Roles and Permissions</Typography>
				</div>
				<Stack spacing={4}>
				
					<Roles
						roles={[
							{ id: "INV-003", name: "Superadmin", totalUser: 1 },
							{ id: "INV-002", name: "Admin", totalUser: 5 },
							{ id: "INV-001", name: "Staff", totalUser: 7 },
						]}
					/>
				</Stack>
			</Stack>
		</React.Fragment>
	);
}
