import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { Users } from "@/page-sections/dashboard/settings/acl/users";


const metadata = { title: `User List | ${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Stack spacing={4}>
				<div>
					<Typography variant="h5">User List</Typography>
				</div>
				<Stack spacing={4}>

				<Users
					users={[
						{ id: "INV-003", name: "Arif Aiman", email: 'arif@puncakniaga.com.my', role : 'Admin', 'department' : 'ICTD', status : 'active' },
						{ id: "INV-002", name: "Wan Zack", email: 'wan@puncakniaga.com.my', role : 'Staff', 'department' : 'HR', status : 'inactive' },
					]}
				/>
				</Stack>
			</Stack>
		</React.Fragment>
	);
}
