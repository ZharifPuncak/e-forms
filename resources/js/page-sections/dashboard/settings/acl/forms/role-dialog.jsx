"use client";

import * as React from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";



import { PermissionsTable } from "../views/permissions-table";


export function RoleDialog({ onClose, open = false, title, subtitle }) {


	return (
		<Dialog fullWidth maxWidth='md' onClose={onClose} open={open}>
			<Stack direction="row" spacing={3} sx={{ alignItems: "center", justifyContent: "space-between", px: 2, py: 1 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="subtitle" sx={{ fontWeight : 'bold'}}>{ title }</Typography>
					{ subtitle && <Typography color="text.secondary" variant="caption">
						{subtitle}
					</Typography> }
				</Box>
			
				<IconButton onClick={onClose}>
					<XIcon />
				</IconButton>
			</Stack>
			<Divider />
			<DialogContent>
				<PermissionsTable />
			</DialogContent>
			<Divider />
			<DialogActions>
				<Stack direction="row" spacing={1} sx={{ alignItems: "center",  px: 2, py: 1 }}>
						<Button size="small" color="secondary" variant='contained' onClick={onClose}>
							Cancel
						</Button>
						<Button size="small" type="submit" variant="contained">
							Confirm
						</Button>
					</Stack>
			</DialogActions>
		</Dialog>
	);
}
