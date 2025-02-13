"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";

import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";


import Accordion1 from "@/components/widgets/accordions/accordion-1";

export function FormDetails() {


	return  <Grid container spacing={4}>
	
					<Grid 	size={{ md: 12, xs: 12 }} >
						<Card sx={{ borderRadius: 1 }} variant="outlined">
												<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
													{[
														{ key: "Name", value: <Typography sx={{ ml : 1 }} variant="subtitle2">Personal Data Protection Act</Typography> },
														{ key: "Alias", value: <Typography sx={{ ml : 1 }} variant="subtitle2">PDPA</Typography> },
														{ key: "Code", value: <Typography sx={{ ml : 1 }} variant="subtitle2">ACK01</Typography> },
														{ key: "Category", value: <Typography sx={{ ml : 1 }} variant="subtitle2">HR Compliance</Typography> },
														{ key: "Effective", value: <Typography sx={{ ml : 1 }} variant="subtitle2">09 Jan, 2025 - 31 Dec, 2025</Typography> },
														{ key: "Details", value: <Accordion1 details={
															<>
																<p>
																	The <strong>PDPA</strong> is a law designed to protect personal data and regulate how organizations collect, use, and disclose it. 
																	It ensures that individuals have control over their personal information while allowing businesses to operate responsibly.
																</p>

																<h3>Key Principles of PDPA:</h3>
																<ul>
																	<li><strong>Consent</strong> – Organizations must get permission before collecting personal data.</li>
																	<li><strong>Purpose Limitation</strong> – Data should only be used for the stated purpose.</li>
																	<li><strong>Notification</strong> – Individuals must be informed about why and how their data is collected.</li>
																	<li><strong>Access & Correction</strong> – People have the right to access and correct their data.</li>
																	<li><strong>Security</strong> – Organizations must protect data from unauthorized access and breaches.</li>
																	<li><strong>Retention Limitation</strong> – Data should not be kept longer than necessary.</li>
																	<li><strong>Accountability</strong> – Companies must follow PDPA rules and be responsible for compliance.</li>
																</ul>
															</>
														} title={<Typography sx={{ color : '#4DADDE' }} variant="subtitle2">Details</Typography>} />},
														{ key: "Instructions", value:  <Accordion1 title={<Typography  sx={{ color : '#4DADDE' }} variant="subtitle2">Instructions</Typography>} /> },
														{
															key: "Status",
															value: (
																<>
																	<Chip
																		icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
																		label="Completed"
																		size="small"
																		variant="outlined"
																	/>
																</>
															),
														},
														{ key: "Action", value:  	<Grid container spacing={1}>
															<Button size="small" >Edit </Button>
															<Button size="small"  >Delete </Button>
															<Button size="small" >Proceed </Button>
															<Button size="small" >Report </Button>
													</Grid> },
													].map((item) => (
														<PropertyItem key={item.key} name={item.key} value={item.value} />
													))}
												</PropertyList>
						</Card>
					</Grid>
				</Grid>				
					
}
