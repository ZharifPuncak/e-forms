import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useAppContext } from "@/contexts/app-context";

import StaffForm from "./forms/staff-form";


export function CreateStaff() {

	const appContext = useAppContext();
	return (<>
	  <Card>
			<CardHeader
				subheader=""
				title={          
					<Typography variant="h6">
						Staff Details
					</Typography>
                }
				action={''}
			/>
			<CardContent>
					<Box sx={{ overflowX: "auto" }}>
						<StaffForm />
					</Box>
			</CardContent>
		</Card>
	
		</>
	);
}
