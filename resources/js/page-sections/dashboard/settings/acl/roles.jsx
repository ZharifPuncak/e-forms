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

import { useAppContext } from "@/contexts/app-context";
import { PermissionsList } from "./views/permissions-list";
import RoleForm from "./forms/role-form";

export function Roles({ roles }) {

	const appContext = useAppContext();
	
	return (
		<>  
	
		{/* <Card>
			<CardHeader
				subheader=""
				title={
						<Typography variant="h6" >
										Create Role
									</Typography>
				}
				action={''}
			/>
			<CardContent>
					<Box sx={{ overflowX: "auto" }}>
						<RoleForm />
					</Box>
			</CardContent>
		</Card> */}

		<Card>
			<CardHeader
				subheader=""
				title={	<Typography variant="h6" >
				Role List
			</Typography>}
				action={''}
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
													<>
													<Button
													disabled
													 onClick={() => {
														 appContext.setDialog({ 
															isOpen : true, 
															title : 'Permissions', 
															isAction : false, 
															subtitle : item.name,
															component : <PermissionsList /> 
														});
													}} 
													 color="secondary" 
													 endIcon={<ArrowRightIcon />} 
													 size="small">
														<Typography   variant="subtitle2" sx={{  whiteSpace: "nowrap" }} fontSize={14}>
																Permissions
														</Typography>
													</Button>
													</>
												}
											 />
								        </Grid>
							      })
							}
						</Grid>
					</Box>
			
			</CardContent>
		</Card>
		</>
	);
}
