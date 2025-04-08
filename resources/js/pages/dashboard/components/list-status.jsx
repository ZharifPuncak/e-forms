import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";


export function ListStatus({ data, title, type }) {
	return (
		<Card>
			<CardHeader		
				title={	<Typography variant="h6" sx={{ fontWeight : 'bold' }}>{title}</Typography>}
			/>
			<CardContent sx={{ pb: "8px" }}>
				<List disablePadding>
					{data.map((item) => (
						<FormattedItem key={item.id} item={item} />
					))}
				</List>
			</CardContent>
			<Divider />
			<CardActions>
				<Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
					See all {type}
				</Button>
			</CardActions>
		</Card>
	);
}

function FormattedItem({ item }) {
	const { label, color } = {
		completed: { label: "Completed", color: "success" },
		ongoing: { label: "Ongoing", color: "warning" },
	}[item.status];

	return (
		<ListItem disableGutters>
			<ListItemAvatar>
				<Avatar
					src={item.icon}
					sx={{
						bgcolor: "var(--mui-palette-background-paper)",
						boxShadow: "var(--mui-shadows-8)",
						color: "var(--mui-palette-text-primary)",
					}}
				/>
			</ListItemAvatar>
			<ListItemText
				disableTypography
				primary={
					<Typography noWrap variant="subtitle2">
						{item.title}
					</Typography>
				}
				secondary={
					<Typography sx={{ whiteSpace: "nowrap" }} variant="body2">
						{item.code}{" "}
						<Typography color="text.secondary" component="span" variant="inherit">
							/{item.alias}
						</Typography>
					</Typography>
				}
			/>
			<Chip color={color} label={label} size="small" variant="soft" />
			{/* <IconButton>
				<DotsThreeIcon weight="bold" />
			</IconButton> */}
		</ListItem>
	);
}
