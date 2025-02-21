import * as React from "react";
import { Helmet } from "react-helmet-async";
import { appConfig } from "@/config/app";

import { useSearchParams } from "react-router-dom";

import { SignInAdmin } from "@/page-sections/dashboard/auth/sign-in-admin";
import { SignInStaff } from "@/page-sections/dashboard/auth/sign-in-staff";


const metadata = { title: `${appConfig.name}` };


export function Page() {

	const [searchParams] = useSearchParams();
	const key = searchParams.get("key");


	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
					{key && key == 'admin'  ?  <SignInAdmin /> : <SignInStaff />}
		</React.Fragment>
	);
}
