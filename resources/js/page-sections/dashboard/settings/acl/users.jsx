import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";


import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDialog } from "@/hooks/use-dialog";


import { UsersTable } from "./views/users-table";
import { UserDialog } from "./forms/user-dialog";
export function Users({ users }) {

	const dialog = useDialog();

	return (
		<Card>
			<CardHeader
				
				subheader=""
				title="User Details"
				action={
					<Button onClick={dialog.handleOpen} 
					 size="small" startIcon={<PlusIcon />} variant="contained">
						USER
					</Button>
					}
			/>
			<CardContent>
				<Card>
					<Box sx={{ overflowX: "auto" }}>
						<UserDialog onClose={dialog.handleClose} open={dialog.open} title='Create User' />
						<UsersTable rows={users} />
					</Box>
				</Card>
			</CardContent>
		</Card>
	);
}
