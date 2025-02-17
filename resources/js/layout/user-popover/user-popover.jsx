"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { SignOut as SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";


import { paths } from "@/paths";
import { RouterLink } from "@/components/core/link";
import useAuth from "@/hooks/use-auth";




function SignOutButton() {

		const { logout } = useAuth();
	
		const handleSignOut = React.useCallback(async () => {

		  try {
				
				await logout();
			
			} catch (error) {
				
			}

		}, []);

	return (
		<MenuItem onClick={handleSignOut}  >
					<ListItemIcon>
						<SignOutIcon  /> 
					</ListItemIcon>
					<Typography  fontSize={14}>Sign out</Typography>	
		</MenuItem>
	);
}

export function UserPopover({ anchorEl, onClose, open }) {

	const { user } = useAuth();

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			onClose={onClose}
			open={Boolean(open)}
			slotProps={{ paper: { sx: { width: "280px" } } }}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
		>
			<Box sx={{ p: 2 }}>
				<Typography sx={{ mb : -1}} fontSize={14}>{user.name}</Typography>
				<Typography color="text.secondary" variant="caption">
					{user?.staff_ic_no}
				</Typography>
			</Box>
			<Divider />
			<List sx={{ p: 1 }}>
				<MenuItem component={RouterLink} href={paths.dashboard.settings.profile} onClick={onClose}>
					<ListItemIcon>
						<UserIcon />
					</ListItemIcon>
					<Typography  fontSize={14}>Profile</Typography>
				</MenuItem>
			</List>
			<Divider />
			<List sx={{ p: 1 }}>
				<SignOutButton />
			</List>
		</Popover>
	);
}
