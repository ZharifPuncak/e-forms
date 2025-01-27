import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { dayjs } from "@/lib/dayjs";
import { LoginHistory } from "@/page-sections/dashboard/settings/profile/login-history";
import { PasswordForm } from "@/page-sections/dashboard/settings/profile/password-form";

const metadata = { title: `Profile | ${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Stack spacing={4}>
				<div>
					<Typography variant="h4">Profile</Typography>
				</div>
				<Stack spacing={4}>
					<PasswordForm />
					<LoginHistory
						events={[
							{
								id: "EV-002",
								type: "Credential login",
								ip: "95.130.17.84",
								userAgent: "Chrome, Mac OS 10.15.7",
								createdAt: dayjs().subtract(1, "day").subtract(1, "hour").subtract(5, "minute").toDate(),
							},
							{
								id: "EV-001",
								type: "Credential login",
								ip: "95.130.17.84",
								userAgent: "Chrome, Mac OS 10.15.7",
								createdAt: dayjs().subtract(1, "day").subtract(1, "hour").subtract(25, "minute").toDate(),
							},
						]}
					/>
				</Stack>
			</Stack>
		</React.Fragment>
	);
}
