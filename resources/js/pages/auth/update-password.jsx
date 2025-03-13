import * as React from "react";
import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";

import { UpdatePassword } from "@/page-sections/dashboard/auth/update-password";

const metadata = { title: `${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<UpdatePassword />
		</React.Fragment>
	);
}
