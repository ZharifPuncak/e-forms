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

import SubmitAcknowledgementForm from "../forms/submit-form";
import { useAppContext } from '@/contexts/app-context';

export function AcknowledgementFormDetails() {

    const appContext = useAppContext();

	return  <Grid container spacing={4}>
	
					<Grid 	size={{ md: 12, xs: 12 }} >
                    <Card sx={{ borderRadius: 1 }} variant="outlined">
											<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
												{[
											
                                                    { key: "Code", value: <Typography sx={{ ml : 1 }} variant="subtitle2">ACK001</Typography> },
                                                    { key: "Issued", value: <Typography sx={{ ml : 1 }} variant="subtitle2">9 Jan, 2025</Typography> },
                                                    { key: "Deadline", value: <Typography sx={{ ml : 1 }} variant="subtitle2">11 Jan, 2025</Typography> },
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
                                                               <div class="container">
                                                                    <strong>Integrity Pledge</strong>
                                                                    <p>An integrity pledge is a commitment to uphold honesty, ethical behavior, and accountability in all actions. 
                                                                    It signifies a dedication to fairness, respect, and responsibility, ensuring that one acts with integrity in personal, 
                                                                    academic, or professional settings. By taking this pledge, individuals commit to truthfulness, transparency, and 
                                                                    upholding moral principles, fostering a culture of trust and ethical conduct.</p>

                                                                    <ul>
                                                                        <li><strong>Honesty:</strong> Always being truthful in my words and actions.</li>
                                                                        <li><strong>Accountability:</strong> Taking responsibility for my decisions and their consequences.</li>
                                                                        <li><strong>Fairness:</strong> Treating others with respect and ensuring fairness in all dealings.</li>
                                                                        <li><strong>Respect for Others:</strong> Valuing diversity, opinions, and rights of others.</li>
                                                                        <li><strong>Transparency:</strong> Being open and clear in communication and decision-making.</li>
                                                                        <li><strong>Academic Integrity:</strong> Avoiding plagiarism, cheating, and dishonest practices in education.</li>
                                                                        <li><strong>Professional Ethics:</strong> Upholding ethical standards in my workplace and professional life.</li>
                                                                        <li><strong>Social Responsibility:</strong> Contributing positively to my community and society.</li>
                                                                    </ul>
                                                                </div>
                                                    </> },
                                                     { key: "Action", value:  	<Grid container spacing={1}>
                                                     <Button size="small" onClick={() => {
                                                         appContext.setDialog({ isOpen : true , title : 'Integrity Pledge', subtitle:'ACK001', component : <SubmitAcknowledgementForm />})
                                                     }}>Click here </Button>
                                             </Grid> }
												
												].map((item) => (
													<PropertyItem key={item.key} name={item.key} value={item.value} />
												))}
											</PropertyList>
										</Card>
					 </Grid>
 
				</Grid>				
					
}
