import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useAppContext } from "@/contexts/app-context";

import InfoForm from "./forms/info-form";


export function CreateForm({ users }) {

	const appContext = useAppContext();
	return (<>
	  <Card>
			<CardHeader
				subheader=""
				title={          
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						Basic Information
					</Typography>
                }
				action={''}
			/>
			<CardContent>
					<Box sx={{ overflowX: "auto" }}>
						<InfoForm />
					</Box>
			</CardContent>
		</Card>
	
		</>
	);
}
