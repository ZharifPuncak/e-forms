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
import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";


import { useAppContext } from '@/contexts/app-context';

export function DeclarationFormDetails() {

    const appContext = useAppContext();

	return  <Grid container spacing={4}>
	
					<Grid 	size={{ md: 12, xs: 12 }} >
                    <Card sx={{ borderRadius: 1 }} variant="outlined">
											<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
												{[
											
                                                    { key: "Code", value: <Typography sx={{ ml : 1 }} variant="subtitle2">ACK001</Typography> },
                                                    { key: "Assigned", value: <Typography sx={{ ml : 1 }} variant="subtitle2">9 Jan, 2025</Typography> },
                                                    { key: "Deadline", value: <Typography sx={{ ml : 1 }} variant="subtitle2">10 Jan, 2025</Typography> },
                                                    // { key: "Submitted", value: <Typography sx={{ ml : 1 }} variant="subtitle2">ACK001</Typography> },
													{
														key: "Status",
														value: (
                                                            <>
                                                                <Chip
                                                                    icon={<HourglassHighIcon color="var(--mui-palette-warning-main)" weight="fill" />}
                                                                    label="Pending"
                                                                    size="small"
                                                                    variant="outlined"
                                                                />
                                                            </>
														),
													},
                                                    { key: "Details", value: <>

                                                                
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
                                                    
                                                    
                                                    </> },
                                                     { key: "Action", value:  	<Grid container spacing={1}>
                                                     <Button size="small" onClick={() => {
                                                         appContext.setDialog({ isOpen : true , title : 'Personal Data Protection Act', subtitle:'ACK001'})
                                                     }}>View </Button>
                                             </Grid> }
												
												].map((item) => (
													<PropertyItem key={item.key} name={item.key} value={item.value} />
												))}
											</PropertyList>
										</Card>
					 </Grid>
 
				</Grid>				
					
}
