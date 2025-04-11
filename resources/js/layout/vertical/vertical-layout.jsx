"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";

import { dashboardConfig } from "@/config/dashboard";
import { useSettings } from "@/contexts/settings-context";

import { MainNav } from "./main-nav";
import { SideNav } from "./side-nav";

import { useMediaQuery } from "@/hooks/use-media-query";

export function VerticalLayout({ children }) {
	
	const { settings } = useSettings();
	const navColor = settings.dashboardNavColor ?? dashboardConfig.navColor;
	const mdDown = useMediaQuery("down", "md");

	return (
		<React.Fragment>
			<GlobalStyles
				styles={{
					body: {
						"--MainNav-height": "56px",
						"--MainNav-zIndex": 1000,
						"--SideNav-width": "280px",
						"--SideNav-zIndex": 1100,
						"--MobileNav-width": "320px",
						"--MobileNav-zIndex": 1100,
					},
				}}
			/>
			
			<Box sx={{
					bgcolor: "var(--mui-palette-background-default)",
					display: "flex",
					flexDirection: "column",
					position: "relative",
					minHeight: "100%",
				}}
			>
			<SideNav color={navColor} items={dashboardConfig.navItems} />
				<Box sx={{ display: "flex", flex: "1 1 1", flexDirection: "column", pl: { lg: "var(--SideNav-width)" } }}>
					<MainNav items={dashboardConfig.navItems} />
				
					<Box
						component="main"
						sx={{
							"--Content-margin": "0 auto",
							"--Content-maxWidth": "var(--maxWidth-xl)",
							"--Content-paddingX": { xs: "24px", sm:'30px', md: "60px" },
							"--Content-paddingY": { xs: "24px", lg: "64px" },
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
										zIndex : 1000
								
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
			</Box>
		</React.Fragment>
	);
}
