"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Timer as TimerIcon } from "@phosphor-icons/react/dist/ssr/Timer";
import Box  from "@mui/material/Box";
import Button  from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { dayjs } from "@/lib/dayjs";
import { DataTable } from "@/components/core/data-table";

const columns = [
	{
		formatter: (row) => {
			return (
				<div>
					<Typography variant="subtitle2">{row.type}</Typography>
					<Typography color="text.secondary" variant="inherit">
						on {dayjs(row.createdAt).format("hh:mm A MMM D, YYYY")} , <span style={{ color : '#22C668', fontWeight : 'bold'}}> This Device </span>
					</Typography>
				</div>
			);
		},
		name: "Login type",
		width: "250px",
	},
	{ field: "ip", name: "IP address", width: "150px" },
	{ field: "userAgent", name: "User agent", width: "200px" },
];

export function LoginHistory({ events }) {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar>
						<TimerIcon fontSize="var(--Icon-fontSize)" />
					</Avatar>
				}
				title="Login history"
			/>
			<CardContent>
		    	<Stack spacing={3}>
					<Card sx={{ overflowX: "auto" }} variant="outlined">
						<DataTable columns={columns} rows={events} />
					</Card>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Button style={{ background : '#007FAB', borderColor : '#007FAB'}} variant="contained">LOGOUT OF OTHER SESSIONS</Button>
				   </Box>
			   </Stack>
			</CardContent>
		</Card>
	);
}
