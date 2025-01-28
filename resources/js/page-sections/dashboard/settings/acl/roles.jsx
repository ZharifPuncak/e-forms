import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Typography } from "@mui/material";

import { CardSummary } from "@/components/widgets/card/card-summary";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { useDialog } from "@/hooks/use-dialog";

import { RoleDialog } from "./forms/role-dialog";

export function Roles({ roles }) {

	const dialog = useDialog();

	return (
		<Card>
			<CardHeader
				
				subheader=""
				title="Role List"
				action={
				<Button onClick={dialog.handleOpen}  size="medium" startIcon={<PlusIcon />} variant="contained">
							ROLE
				
				</Button>
				}
			/>
			<CardContent>
					<Box >
						<Grid  container={true} spacing={2}>

						
							{/* Role Form  */}
							<RoleDialog onClose={dialog.handleClose} open={dialog.open} />

							{/* Role List */}
							{ roles.map((item, index) => {
								  return <Grid  key={index}  size={{ xs: 6, md: 4 }} >
											<CardSummary 
												amount={item.totalUser}
												title={item.name} 
												action={
													<Button  color="secondary" endIcon={<ArrowRightIcon />} size="small">
																		<Typography variant="subtitle2" sx={{  whiteSpace: "nowrap" }} fontSize={14}>
																			View Permission
																		</Typography>
																
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
