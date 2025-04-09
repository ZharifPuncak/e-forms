"use client";

import * as React from "react";

import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import { useColorScheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";

import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

import { paths } from "@/paths";
import { isNavItemActive } from "@/lib/is-nav-item-active";

import { usePopover } from "@/hooks/use-popover";
import { Dropdown } from "@/components/core/dropdown/dropdown";
import { DropdownPopover } from "@/components/core/dropdown/dropdown-popover";
import { DropdownTrigger } from "@/components/core/dropdown/dropdown-trigger";
import { RouterLink } from "@/components/core/link";
import { Logo } from "@/components/core/logo";


import { UserPopover } from "../user-popover/user-popover";
import { navColorStyles } from "./styles";

import { useMediaQuery } from "@/hooks/use-media-query";
import useAuth from "@/hooks/use-auth";

const logoColors = {
	dark: { blend_in: "light", discrete: "light", evident: "light" },
	light: { blend_in: "dark", discrete: "dark", evident: "light" },
};

export function MainNav({ color = "evident", items = [] }) {

	const { colorScheme = "light" } = useColorScheme();
	const styles = navColorStyles[colorScheme][color];
	const logoColor = logoColors[colorScheme][color];
	 const mdDown = useMediaQuery("down", "md");

	return (
		<React.Fragment>
			<Box
				component="header"
				sx={{
					...styles,
					bgcolor: "var(--MainNav-background)",
					border: "var(--MainNav-border)",
					color: "var(--MainNav-color)",
					left: 0,
					position: "sticky",
					top: 0,
					zIndex: "var(--MainNav-zIndex)",
					height : '65px'
				}}
			>
				<Box
					sx={{
						display: "flex",
						flex: "1 1 auto",
						minHeight: "var(--MainNav-height, 72px)",
						px: { xs: 2, sm: 3 },
						py: 1,
					}}
				>
					<Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
						<Box component={RouterLink} href={paths.home} sx={{ display: { 
							// xs: "none", 
							xs: "inline-block" 
							
							} }}>
							<Logo color={logoColor} height={50} width={50} /> 
						</Box>
						<Typography variant="body2" fontWeight="bold" textAlign="left">
							E-forms{' '}
								<Box component="span" display={mdDown ? 'block' : 'inline'}>
									Management System
								</Box>
						</Typography>
					</Stack>
					<Stack
						direction="row"
						spacing={2}
						sx={{ alignItems: "center", flex: "1 1 auto", justifyContent: "flex-end" }}
					>
					    <UserButton />
					</Stack>
				</Box>
				{/* <Box
					component="nav"
					sx={{
						borderTop: "1px solid var(--MainNav-divider)",
						display: { xs: "none", md: "block" },
						minHeight: "56px",
						overflowX: "auto",
					}}
				>
					{renderNavGroups({ items, pathname })}
				</Box> */}
			</Box>
		</React.Fragment>
	);
}

function UserButton() {

	const popover = usePopover();
	const { user, is } = useAuth();
	const mdDown = useMediaQuery("down", "md");

	return (
		<React.Fragment>
			<Box
				component="button"
				onClick={popover.handleOpen}
				ref={popover.anchorRef}
				sx={{ border: "none", background: "transparent", cursor: "pointer", p: 0 }}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  color : 'grey' }}>		
					<Typography variant='body2' sx={{ display: mdDown ? 'none' : 'inline-block' , color : is('Staff') ? 'white' : 'black', fontWeight : 'bold'}}>{ user?.staff_no ?? user?.role }</Typography>
					<Box sx={{ marginLeft: 1 }}>
						<CaretDownIcon style={{ color: is('Staff') ? 'white' : 'black' }}   size={15} />
					</Box>
				</Box>
		
			
			</Box>
			<UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
		</React.Fragment>
	);
}


function renderDropdownItems({ items = [], pathname }) {
	const children = items.reduce((acc, curr) => {
		const { key, ...item } = curr;

		acc.push(<DropdownItem key={key} pathname={pathname} {...item} />);

		return acc;
	}, []);

	return (
		<Stack component="ul" spacing={1} sx={{ listStyle: "none", m: 0, p: 0 }}>
			{children}
		</Stack>
	);
}

function DropdownItem({ disabled, external, items, href, matcher, pathname, title }) {
	const active = isNavItemActive({ disabled, external, href, matcher, pathname });
	const isBranch = Boolean(items);

	const element = (
		<Box component="li" sx={{ userSelect: "none" }}>
			<Box
				{...(isBranch
					? { role: "button" }
					: {
							...(href
								? {
										component: external ? "a" : RouterLink,
										href,
										target: external ? "_blank" : undefined,
										rel: external ? "noreferrer" : undefined,
									}
								: { role: "button" }),
						})}
				sx={{
					alignItems: "center",
					borderRadius: 1,
					color: "var(--NavItem-color)",
					cursor: "pointer",
					display: "flex",
					flex: "0 0 auto",
					p: "6px 16px",
					textDecoration: "none",
					whiteSpace: "nowrap",
					...(disabled && {
						bgcolor: "var(--mui-palette-action-disabledBackground)",
						color: "var(--mui-action-disabled)",
						cursor: "not-allowed",
					}),
					...(active && { bgcolor: "var(--mui-palette-action-selected)", color: "var(--mui-palette-action-active)" }),
					"&:hover": {
						...(!disabled &&
							!active && { bgcolor: "var(--mui-palette-action-hover)", color: "var(--mui-palette-action-color)" }),
					},
				}}
				tabIndex={0}
			>
				<Box sx={{ flex: "1 1 auto" }}>
					<Typography
						component="span"
						sx={{ color: "inherit", fontSize: "0.875rem", fontWeight: 500, lineHeight: "28px" }}
					>
						{title}
					</Typography>
				</Box>
				{isBranch ? (
					<Box sx={{ flex: "0 0 auto" }}>
						<CaretRightIcon fontSize="var(--icon-fontSize-sm)" />
					</Box>
				) : null}
			</Box>
		</Box>
	);

	if (items) {
		return (
			<Dropdown>
				<DropdownTrigger>{element}</DropdownTrigger>
				<DropdownPopover
					PaperProps={{ sx: { minWidth: "200px", p: 1 } }}
					anchorOrigin={{ horizontal: "right", vertical: "top" }}
				>
					{renderDropdownItems({ pathname, items })}
				</DropdownPopover>
			</Dropdown>
		);
	}

	return element;
}
