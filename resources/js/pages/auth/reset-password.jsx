import * as React from "react";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { ResetPassword } from "@/page-sections/dashboard/auth/reset-password";


const metadata = { title: `${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
		
			<ResetPassword />
		</React.Fragment>
	);
}
