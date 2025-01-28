import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import { Article as ArticleIcon } from "@phosphor-icons/react/dist/ssr/Article";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import AlertTitle from '@mui/material/AlertTitle';


import { UsersTable } from "./views/users-table";

export function Users({ users }) {
	return (
		<Card>
			<CardHeader
				
				subheader=""
				title="User Details"
				action={
					<Button  size="medium" startIcon={<PlusIcon />} variant="contained">
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
