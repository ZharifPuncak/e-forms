import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";


import useAuth from "@/hooks/use-auth";

import { useNavigate } from "react-router-dom";




const metadata = { title: `${appConfig.name}` };

export function Page() {

	const navigate = useNavigate();
	const { is, user } = useAuth();

	console.log(user);

	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Box
				component="main"
				sx={{
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					minHeight: "100%",
					py: "64px",
				}}
			>
				<Container maxWidth="lg">
					<Stack spacing={6}>
						{/* <Box sx={{ display: "flex", justifyContent: "center" }}>
							<Box
								alt="Not found"
								component="img"
								src="/assets/not-found.svg"
								sx={{ height: "auto", maxWidth: "100%", width: "200px" }}
							/>
						</Box> */}
						<Stack spacing={1} sx={{ textAlign: "center" }}>
							<Typography variant="h4">404: The page you are looking for isn&apos;t here</Typography>
							<Typography color="text.secondary">
								You either tried some shady route or you came here by mistake. Whichever it is, try using the
								navigation.
							</Typography>
						</Stack>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Button  onClick={() => { is('Staff') ? navigate('/dashboard/acknowledgements') :  navigate('/')}} variant="outlined">
						Back to home
							</Button>
						</Box>
					</Stack>
				</Container>
			</Box>
		</React.Fragment>
	);
}
