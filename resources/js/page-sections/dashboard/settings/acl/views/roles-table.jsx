"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';

import { DataTable } from "@/components/core/data-table";



import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { PencilSimple as PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr/PencilSimple";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";

const IconLink = ({ title = '' , icon = ''}) => {
	return <Tooltip title={title}>
					<Link color="inherit" underline="none" sx={{ color: '#0061C2', cursor : 'pointer' }}>
					{icon}
					</Link>
				</Tooltip>
}

const columns = [
	{ field: "name", name: "Name", width: "150px" },
	{ field: "totalUser", name: "Total User", width: "150px", align : 'center' },
	
	{
		formatter: () => (
			<Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>

				<IconLink title='View' icon={<EyeIcon fontSize={20} />}/>
				<IconLink title='Edit' icon={<PencilSimpleIcon fontSize={20} />} />
				<IconLink title='Delete' icon={<TrashIcon fontSize={20} />} />
		
			</Box>
		

		),
		name: "Actions",
		hideName : true,
		width: "100px",
		align: "end",
	},
];

export function RolesTable({ rows }) {
	return <DataTable columns={columns} rows={rows} />;
}
