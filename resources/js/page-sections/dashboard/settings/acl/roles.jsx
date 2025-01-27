import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { UserCircleGear as UserCircleGearIcon } from "@phosphor-icons/react/dist/ssr/UserCircleGear";



import { RolesTable } from "./views/roles-table";

export function Roles({ roles }) {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar>
						<UserCircleGearIcon fontSize="var(--Icon-fontSize)" />
					</Avatar>
				}
				subheader=""
				title="Role List"
			/>
			<CardContent>
				<Card>
					<Box sx={{ overflowX: "auto" }}>
						<RolesTable rows={roles} />
					</Box>
				</Card>
			</CardContent>
		</Card>
	);
}
