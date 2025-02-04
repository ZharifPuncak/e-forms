import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";


import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useAppContext } from "@/contexts/app-context";
import UserForm from "./forms/user-form";


import { UsersTable } from "./views/users-table";

export function Users({ users }) {

	const appContext = useAppContext();
	return (
		<Card>
			<CardHeader
				
				subheader=""
				title="User Details"
				action={
					<Button onClick={() => appContext.setDialog({ isOpen : true , component : <UserForm /> , title : 'Create User', subtitle : ''})} 
					 size="small"  startIcon={<PlusIcon />} variant="outlined">
						USER
					</Button>
					}
			/>
			<CardContent>
				<Card>
					<Box sx={{ overflowX: "auto" }}>
						<UsersTable rows={users} />
					</Box>
				</Card>
			</CardContent>
		</Card>
	);
}
