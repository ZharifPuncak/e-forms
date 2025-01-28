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
	const [title, setTitle] = React.useState('');
	const [subTitle, setSubTitle] = React.useState('');
	
	return (
		<Card>
			<CardHeader
				
				subheader=""
				title="Role List"
				action={
				<Button onClick={() => {
					setTitle('Create Role');
					setSubTitle('');
					dialog.handleOpen();
				}} size="small" startIcon={<PlusIcon />} variant="contained">
					ROLE	
				</Button>
				}
			/>
			<CardContent>
					<Box >
						<Grid  container={true} spacing={2}>

						
							{/* Role Form  */}
							<RoleDialog title={title} subtitle={subTitle} onClose={dialog.handleClose} open={dialog.open} />

							{/* Role List */}
							{ roles.map((item, index) => {
								  return <Grid  key={index}  size={{ xs: 6, md: 4 }} >
											<CardSummary 
												amount={item.totalUser}
												title={item.name} 
												action={
													<Button onClick={() => {
														setTitle('Permissions');
														setSubTitle(item.name);
														dialog.handleOpen();
													}} 
													 color="secondary" 
													 endIcon={<ArrowRightIcon />} 
													 size="small">
																		<Typography   variant="subtitle2" sx={{  whiteSpace: "nowrap" }} fontSize={14}>
																			 Permissions
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
