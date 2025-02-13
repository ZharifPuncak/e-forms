import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { CenteredLayout } from "./components/centered-layout";
import { RouterLink } from "@/components/core/link";
import { DynamicLogo } from "@/components/core/logo";

import { useNavigate } from "react-router-dom";

const metadata = { title: `Sign in | ${appConfig.name}` };

export function Page() {

	const navigate = useNavigate();
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<CenteredLayout>
				<Stack spacing={4}>
			
					<div>
						<Box component={RouterLink} href={paths.dashboard.overview}   sx={{
								display: "inline-block",
								fontSize: 0,
							}}>
							<DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
						</Box>
					</div>
					<Stack spacing={1}>
						<Typography variant="h5">E-form Management System</Typography>
					</Stack>
					<Stack spacing={2}>
						<Stack spacing={2}>
							<FormControl>
								<InputLabel>Staff IC No</InputLabel>
								<OutlinedInput name="ic_no" value="790192012225" type="text" />
							</FormControl>
							<FormControl>
								<InputLabel>Password</InputLabel>
								<OutlinedInput name="password" value="123456" type="password" />
							</FormControl>
							<Button onClick={() => {
								  navigate('/dashboard/acknowledgements');
							   }}  
							   type="submit" variant="contained">
								Sign in
							</Button>
						</Stack>
						{/* <div>
							<Link variant="subtitle2">Forgot password?</Link>
						</div> */}
					</Stack>
				</Stack>
			</CenteredLayout>
		</React.Fragment>
	);
}
