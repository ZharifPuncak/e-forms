import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { CenteredLayout } from "./components/centered-layout";
import { RouterLink } from "@/components/core/link";
import { DynamicLogo } from "@/components/core/logo";

const metadata = { title: `${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<CenteredLayout>
				<Stack spacing={4}>
				
					<div>
						<Box component={RouterLink} href={paths.home} sx={{ display: "inline-block", fontSize: 0 }}>
							<DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
						</Box>
					</div>
					<Stack spacing={1}>
						<Typography variant="h5">Sign up</Typography>
						<Typography color="text.secondary" variant="body2">
							Already have an account? <Link variant="subtitle2">Sign in</Link>
						</Typography>
					</Stack>
					<Stack spacing={2}>
						<FormControl>
							<InputLabel>Name</InputLabel>
							<OutlinedInput name="name" />
						</FormControl>
						<FormControl>
							<InputLabel>Email address</InputLabel>
							<OutlinedInput name="email" type="email" />
						</FormControl>
						<FormControl>
							<InputLabel>Password</InputLabel>
							<OutlinedInput name="password" type="password" />
						</FormControl>
						<div>
							<FormControlLabel
								control={<Checkbox name="terms" />}
								label={
									<React.Fragment>
										I have read the <Link>terms and conditions</Link>
									</React.Fragment>
								}
							/>
						</div>
						<Button type="submit" variant="contained">
							Create account
						</Button>
					</Stack>
				</Stack>
			</CenteredLayout>
		</React.Fragment>
	);
}
