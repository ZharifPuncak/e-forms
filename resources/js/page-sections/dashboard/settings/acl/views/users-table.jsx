"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DataTable } from "@/components/core/data-table";
import { RouterLink } from "@/components/core/link";


import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { Minus as MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";

import { UserDialog } from "../forms/user-dialog";
import { useDialog } from "@/hooks/use-dialog";



export function UsersTable({ rows }) {

	const dialog = useDialog();
	const [title, setTitle] = React.useState('');
	const [subTitle, setSubTitle] = React.useState('');


	
const columns = [
	{
		formatter: (row) => (
			<Box>
				<Link 
					sx={{ cursor : 'pointer'}}
			        onClick={() => {
						setTitle('Edit User');
						setSubTitle(row.name);
						dialog.handleOpen();
					}}
					
				>
					<Typography variant="subtitle2" sx={{ mb : -1, whiteSpace: "nowrap", color : '#007FAB'}} fontSize={14}>{row.name}</Typography>
				</Link>
				<Typography color="text.secondary" variant="caption">
					{row.email}
				</Typography>
			</Box>
		),
		name: "Name",
		
	},
	{
		formatter: (row) => {
	
			return <Chip  label={row.department} size="small" variant="soft"  />;
		},
		name: "Department",
		width: "200px",
	},
	{
		formatter: (row) => {
	
			return <Chip  label={row.role} size="small" variant="soft" />;
		},
		name: "Role",
		width: "200px",
	},
	{
		formatter: (row) => {
			const mapping = {
				active: { label: "Active", icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
				inactive: { label: "Inactive", icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
			};
			const { label, icon } = mapping[row.status] ?? { label: "Unknown", icon: null };

			return <Chip icon={icon} label={label} size="small" variant="outlined" />;
		},
		name: "Status",
		width: "150px",
	}
];


	return <>
		<UserDialog title={title} subtitle={subTitle} onClose={dialog.handleClose} open={dialog.open} />
		<DataTable columns={columns} rows={rows} />
	</>;
}
