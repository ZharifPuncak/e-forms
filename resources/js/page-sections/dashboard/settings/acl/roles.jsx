import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import { CardSummary } from "@/components/widgets/card/card-summary";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { UserCircleGear as UserCircleGearIcon } from "@phosphor-icons/react/dist/ssr/UserCircleGear";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

export function Roles({ roles }) {
	return (
		<Card>
			<CardHeader
				
				subheader=""
				title="Role List"
				action={
				<Button size="medium" startIcon={<PlusIcon />} variant="contained">
							ROLE
				</Button>
				}
			/>
			<CardContent>
				
					<Box >
						<Grid  container={true} spacing={2}>
							{ roles.map((item, index) => {
								  return <Grid  key={index}  size={{ xs: 6, md: 4 }} >
											<CardSummary 
												amount={item.totalUser}
												title={item.name} 
												action={
													<Button  color="secondary" endIcon={<ArrowRightIcon />} size="small">
														View Permissions
													</Button>
												}
											 />
								        </Grid>
							      })
							}
						</Grid>
					</Box>
			
			</CardContent>
		</Card>
	);
}
