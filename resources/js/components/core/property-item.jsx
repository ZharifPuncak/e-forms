import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useMediaQuery } from "@/hooks/use-media-query";

export function PropertyItem({ name, value }) {

	const smDown = useMediaQuery("down", "sm");
	return (
		<Box
			sx={{
				alignItems: "center",
				display: "grid",
				gridGap: "var(--PropertyItem-gap, 8px)",
			    gridTemplateColumns: !smDown ? "var(--PropertyItem-columns)" : 'inherit',
				p: "var(--PropertyItem-padding, 8px)",
			}}
		>
			<div>
				<Typography color="text.secondary" variant="body2">
					{name}
				</Typography>
			</div>
			<div>
				{typeof value === "string" ? (
					<Typography color={value ? "text.primary" : "text.secondary"} variant="subtitle2">
						{value || "None"}
					</Typography>
				) : (
					<React.Fragment>{value}</React.Fragment>
				)}
			</div>
		</Box>
	);
}
