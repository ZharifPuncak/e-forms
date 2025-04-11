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
import { useMatches } from "react-router-dom";
import { RouterLink } from "@/components/core/link";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Logo } from "@/components/core/logo";

import useAuth from "@/hooks/use-auth";
import { paths } from "@/paths";




export function MainNav({ items }) {



	const [openNav, setOpenNav] = React.useState(false);
	const matches  = useMatches();
	const active = matches.findLast((match) => match?.handle?.name);

	const mdDown = useMediaQuery("down", "md");
	const smDown = useMediaQuery("down", "sm");

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
						backgroundColor : '#007FAB',
						borderBottom: "1px solid var(--MainNav-divider)",
						display: "flex",
						flex: "1 1 auto",
						minHeight: "var(--MainNav-height)",
						px: { xs: 2, lg: 3 },
						py: 1,
					}}
				>
				{mdDown && <Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
						<IconButton
							onClick={() => {
								setOpenNav(true);
							}}
						>
							<ListIcon color="white"/>
						</IconButton>
						{/* <SearchButton /> */}
					</Stack>}
		
			    {!mdDown &&	<Stack direction="column" spacing={0} >
					
						<Typography variant="h5" color="white" fontWeight="bold" textAlign="left">
							{active?.handle?.name}
						</Typography>
						<Typography variant="caption" color="white"  textAlign="left">
							{active?.handle?.description}
						</Typography>
				    </Stack>}

					{mdDown &&	<Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
						<Box component={RouterLink} href={paths.home} sx={{ display: { 
							// xs: "none", 
							xs: "inline-block" 
							
							} }}>
							<Logo height={50} width={50} /> 
						</Box>
						<Typography variant="body2"  color="white" textAlign="left">
							E-forms{' '}
								<Box component="span" display={mdDown ? 'block' : 'inline'}>
									Management System
								</Box>
						</Typography>
					</Stack>}

					
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
				{mdDown && <Box sx={{ backgroundColor : '#E2E8F0', marginTop : '-5px' , padding : 2 }}>
				<Stack direction="column" sx={{ ml : 1 }} spacing={0} >
					
					<Typography variant="h5" color="black" fontWeight="bold" textAlign="left">
						{active?.handle?.name}
					</Typography>
					<Typography variant="caption" color="grey"  textAlign="left">
						{active?.handle?.description}
					</Typography>
				</Stack>
					</Box>}
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
					<Typography variant='button' color="white">{ user?.staff_no ?? user?.role }</Typography>
					<Box sx={{ marginLeft: 1 }}>
						<CaretDownIcon color="white"  size={20} />
					</Box>
				</Box>
		
			
			</Box>
			<UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
		</React.Fragment>
	);
}
