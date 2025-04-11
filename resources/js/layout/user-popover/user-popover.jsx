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
import useAuth from "@/hooks/use-auth";

import { useAppContext } from '@/contexts/app-context';
import { PasswordForm } from "@/page-sections/dashboard/settings/profile/forms/password-form";



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
					<Typography sx={{ ml : -1 }}  variant="body2">Sign out</Typography>	
		</MenuItem>
	);
}

export function UserPopover({ anchorEl, onClose, open }) {

	const { user } = useAuth();
	const appContext = useAppContext();

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			onClose={onClose}
			open={Boolean(open)}
			slotProps={{ paper: { sx: { width: "280px" } } }}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
		>
			<Box sx={{ px: 2, py : 1 }}>
				<Typography variant="body2" sx={{ mb : -1}} >{user.name}</Typography>
				<Typography color="text.secondary" variant="caption">
					{user?.staff_ic_no ? <span> { user?.staff_ic_no } </span>  : user?.email}
				</Typography>
			</Box>
			<Divider />
			<List sx={{ p: 0.5 }}>
				<MenuItem  onClick={() => {
				
					appContext.setDialog({ fullWidth:false, isOpen : true, title : 'Profile', subtitle : user?.name, component : <PasswordForm /> }); 
					onClose();
				}}>
					<ListItemIcon >
						<UserIcon />
					</ListItemIcon>
					<Typography sx={{ ml : -1 }} variant="body2">Profile</Typography>
				</MenuItem>
			</List>
			<Divider />
			<List sx={{ p: 0.5 }}>
				<SignOutButton />
			</List>
		</Popover>
	);
}
