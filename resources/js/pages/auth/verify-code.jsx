import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { RouterLink } from "@/components/core/link";
import { DynamicLogo } from "@/components/core/logo";

const metadata = { title: `${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
		
				<Stack spacing={4}>
			
					<div>
						<Box component={RouterLink} href={paths.home} sx={{ display: "inline-block", fontSize: 0 }}>
							<DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
						</Box>
					</div>
					<Typography variant="h5">Verify code</Typography>
					<Stack spacing={2}>
						<FormControl>
							<InputLabel>Code</InputLabel>
							<OutlinedInput name="code" />
						</FormControl>
						<Button type="submit" variant="contained">
							Verify
						</Button>
					</Stack>
				</Stack>
		
		</React.Fragment>
	);
}
