import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TrendDown as TrendDownIcon } from "@phosphor-icons/react/dist/ssr/TrendDown";
import { TrendUp as TrendUpIcon } from "@phosphor-icons/react/dist/ssr/TrendUp";

export function CardSummary({ amount , icon: Icon , title, action, active }) {
	return (<>
		<Card elevation={active ? 6 : 1} sx={{  backgroundColor : active ? '#007FAB' : 'inherit' }}>
			<CardContent>
				<Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
					{Icon && <Avatar
						sx={{
							"--Avatar-size": "48px",
							bgcolor: "var(--mui-palette-background-paper)",
							boxShadow: "var(--mui-shadows-8)",
							color: "var(--mui-palette-text-primary)",
						}}
					>
						<Icon fontSize="var(--icon-fontSize-lg)" />
					</Avatar>}
					<div>
						<Typography sx={{ color : active ? 'white' :'text.secondary'}}  variant="body1">
							{title}
						</Typography>
						<Typography sx={{ color : active ? 'white' :'text.secondary'}} variant="h3">{new Intl.NumberFormat("en-US").format(amount)}</Typography>
					</div>
				</Stack>
			</CardContent>
			<Divider />
			{action && <Box sx={{ p: "16px" }}>
				<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>	
						{ action }
				</Stack>
			</Box>}
		</Card>
		
		</>
	);
}
