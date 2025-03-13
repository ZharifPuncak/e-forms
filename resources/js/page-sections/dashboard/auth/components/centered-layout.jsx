import * as React from "react";
import Box from "@mui/material/Box";
import Background from "@/assets/images/background/background-login.jpg";

export function CenteredLayout({ children }) {
	return (
		<Box sx={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				minHeight: "100%",
				p: { xs: 2, md: 3 },
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Box sx={{ maxWidth: "560px", width: "100%" }}>{children}</Box>
		</Box>
	);
}
