"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";

import { dashboardConfig } from "@/config/dashboard";
import { useSettings } from "@/contexts/settings-context";

import { MainNav } from "./main-nav";

import { useMediaQuery } from "@/hooks/use-media-query";

export function HorizontalLayout({ children }) {

	const { settings } = useSettings();
	const navColor = settings.dashboardNavColor ?? dashboardConfig.navColor;
	const mdDown = useMediaQuery("down", "md");

	return (
		<React.Fragment>
			<GlobalStyles
				styles={{ body: { "--MainNav-zIndex": 1000, "--MobileNav-width": "320px", "--MobileNav-zIndex": 1100 } }}
			/>
			<Box
				sx={{
					bgcolor: "var(--mui-palette-background-default)",
					display: "flex",
					flexDirection: "column",
					position: "relative",
					minHeight: "100%",
				}}
			>
				<MainNav color={navColor} items={dashboardConfig.navItems} />
				
				<Box
					component="main"
					sx={{
						"--Content-margin": "0 auto",
						"--Content-maxWidth": "var(--maxWidth-xl)",
						"--Content-paddingX": "24px",
						"--Content-paddingY": { xs: "60px", lg: "64px" },
						"--Content-padding": "var(--Content-paddingY) var(--Content-paddingX)",
						"--Content-width": "100%",
						display: "flex",
						flex: "1 1 auto",
						flexDirection: "column",
					}}
				>
					{children}
				    <Box
						   component="footer"
							sx={{
								position: 'fixed',
								bottom: 0,
								width: '100%',

								backgroundColor: '#121621',
								color: 'white',
								py: 1,
							
						
							}}
						>

						<Grid container spacing={2} >
						<Grid item xs={12} sm={12}>
							<Typography variant="caption" sx={{ ml : mdDown ? 2 : 4  }}>
							© {new Date().getFullYear()} ICTD | Puncak Niaga Management Services Sdn. Bhd.
							</Typography>
						</Grid>

						</Grid>

					</Box>
				</Box>

			</Box>
		</React.Fragment>
	);
}
