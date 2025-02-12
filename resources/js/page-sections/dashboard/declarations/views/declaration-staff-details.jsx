"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";

import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { DeclarationFormTable } from "./declaration-form-table";


export function DeclarationStaffDetails() {


	return  <Grid container spacing={4}>
	
					<Grid 	size={{ md: 12, xs: 12 }} >
                    <Card sx={{ borderRadius: 1 }} variant="outlined">
											<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
												{[
													{ key: "Name", value: <Typography sx={{ ml : 1 }} variant="subtitle2">Ahmad Naqib</Typography> },
                                                    { key: "Staff ID", value: <Typography sx={{ ml : 1 }} variant="subtitle2">PNMS001</Typography> },
                                                    { key: "Staff IC", value: <Typography sx={{ ml : 1 }} variant="subtitle2">910111X0012</Typography> },
                                                    { key: "Company", value: <Typography sx={{ ml : 1 }} variant="subtitle2">PNMS</Typography> },
                                                    { key: "Department", value: <Typography sx={{ ml : 1 }} variant="subtitle2">ICTD</Typography> },
                                                    { key: "Position", value: <Typography sx={{ ml : 1 }} variant="subtitle2">Programmer</Typography> },
                                                    { key: "Category", value: <Typography sx={{ ml : 1 }} variant="subtitle2">Executive</Typography> },
													{
														key: "Status",
														value: (
                                                            <>
                                                                <Chip
                                                                    icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
                                                                    label="Active"
                                                                    size="small"
                                                                    variant="outlined"
                                                                />
                                                            </>
														),
													},
												
												].map((item) => (
													<PropertyItem key={item.key} name={item.key} value={item.value} />
												))}
											</PropertyList>
										</Card>
					</Grid>
                    <Grid size={{ md: 12, xs: 12 }} >
                           <DeclarationFormTable />
                    </Grid>
				</Grid>				
					
}
