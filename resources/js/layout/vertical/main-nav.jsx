"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";

import { Typography } from "@mui/material";
import { usePopover } from "@/hooks/use-popover";

import { MobileNav } from "../mobile-nav";
import { UserPopover } from "../user-popover/user-popover";

import useAuth from "@/hooks/use-auth";

export function MainNav({ items }) {

	const [openNav, setOpenNav] = React.useState(false);


	return (
		<React.Fragment>
			<Box
				component="header"
				sx={{
					"--MainNav-background": "var(--mui-palette-background-default)",
					"--MainNav-divider": "var(--mui-palette-divider)",
					bgcolor: "var(--MainNav-background)",
					left: 0,
					position: "sticky",
					pt: { lg: "var(--Layout-gap)" },
					top: 0,
					width: "100%",
					zIndex: "var(--MainNav-zIndex)",
				}}
			>
				<Box
					sx={{
						borderBottom: "1px solid var(--MainNav-divider)",
						display: "flex",
						flex: "1 1 auto",
						minHeight: "var(--MainNav-height)",
						px: { xs: 2, lg: 3 },
						py: 1,
					}}
				>
					<Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
						<IconButton
							onClick={() => {
								setOpenNav(true);
							}}
							sx={{ display: { lg: "none" } }}
						>
							<ListIcon />
						</IconButton>
						{/* <SearchButton /> */}
					</Stack>
					<Stack
						direction="row"
						spacing={2}
						sx={{ alignItems: "center", flex: "1 1 auto", justifyContent: "flex-end" }}
					>
						{/* <NotificationsButton />
						<Divider
							flexItem
							orientation="vertical"
							sx={{ borderColor: "var(--MainNav-divider)", display: { xs: "none", lg: "block" } }}
						/> */}
						{/* <LanguageSwitch /> */}
						<UserButton />
					</Stack>
				</Box>
			</Box>
			<MobileNav
				items={items}
				onClose={() => {
					setOpenNav(false);
				}}
				open={openNav}
			/>
		</React.Fragment>
	);
}



function UserButton() {

	const popover = usePopover();
	const { user } = useAuth();

	return (
		<React.Fragment>
			<Box
				component="button"
				onClick={popover.handleOpen}
				ref={popover.anchorRef}
				sx={{ border: "none", background: "transparent", cursor: "pointer", p: 0 }}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  color : 'grey' }}>		
					<Typography variant='button'>{ user?.staff_no ?? user?.role }</Typography>
					<Box sx={{ marginLeft: 1 }}>
						<CaretDownIcon size={15} />
					</Box>
				</Box>
		
			
			</Box>
			<UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
		</React.Fragment>
	);
}
