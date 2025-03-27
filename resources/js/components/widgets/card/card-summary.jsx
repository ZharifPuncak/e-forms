import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

export function CardSummary({ amount , icon: Icon , title, action, active, tooltip, bColor }) {
	return (<>
		<Card elevation={active ? 6 : 1} sx={{  border : active ? '1px solid #007FAB' : 'inherit' }}>
			<CardContent sx={{ backgroundColor : bColor ?? 'inherit'}}>
				<Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
					{/* {Icon && <Avatar
						sx={{
							"--Avatar-size": "48px",
							bgcolor: "var(--mui-palette-background-paper)",
							boxShadow: "var(--mui-shadows-8)",
							color: "var(--mui-palette-text-primary)",
						}}
					>
						
					</Avatar>} */}
					{/* {Icon && <Icon fontSize="var(--icon-fontSize-lg)" />} */}
					<div>
						<Typography sx={{ color : bColor ? 'white' :'inherit', }}  variant="body1">
							{title} {tooltip && <Tooltip title={tooltip}> <Icon fontSize="var(--icon-fontSize-sm)" /></Tooltip>}
						</Typography>
						<Typography sx={{ color : bColor ? 'white' :'inherit'}} variant="h3">{amount}</Typography>
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
