import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";


import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useAppContext } from "@/contexts/app-context";
import UserForm from "./forms/user-form";

import { UsersTable } from "./views/users-table";

export function Users({ users }) {

	const appContext = useAppContext();
	return (<>
	  <Card>
			<CardHeader
				subheader=""
				title={	<Typography variant="h6">
				Create User
			</Typography>}
				action={''}
			/>
			<CardContent>
					<Box sx={{ overflowX: "auto" }}>
						<UserForm />
					</Box>
			</CardContent>
		</Card>
		<Card>
			<CardHeader
				subheader=""
				title={
					<Typography variant="h6" >
					User Table
				</Typography>
				}
				action={''}
			/>
			<CardContent>
					<Box sx={{ overflowX: "auto" }}>
						<UsersTable rows={users} />
					</Box>
			</CardContent>
		</Card>
		
		
		</>
	);
}
