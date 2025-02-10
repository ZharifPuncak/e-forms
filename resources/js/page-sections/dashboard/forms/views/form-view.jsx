"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";

import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { CreditCard as CreditCardIcon } from "@phosphor-icons/react/dist/ssr/CreditCard";
import { PencilSimple as PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr/PencilSimple";
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from "@phosphor-icons/react/dist/ssr/ShoppingCartSimple";
import { Timer as TimerIcon } from "@phosphor-icons/react/dist/ssr/Timer";
import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";


import { dayjs } from "@/lib/dayjs";
import { paths } from "@/paths";

import Accordion1 from "@/components/widgets/accordions/accordion-1";

export function FormView({ props }) {


	return  <Grid container spacing={4}>
	
					<Grid 	size={{ md: 12, xs: 12 }} >
                    <Card sx={{ borderRadius: 1 }} variant="outlined">
											<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
												{[
													{ key: "Name", value: <Typography sx={{ ml : 1 }} variant="subtitle2">Personal Data Protection Act</Typography> },
                                                    { key: "Alias", value: <Typography sx={{ ml : 1 }} variant="subtitle2">PDPA</Typography> },
                                                    { key: "Code", value: <Typography sx={{ ml : 1 }} variant="subtitle2">ACK01</Typography> },
                                                    { key: "Category", value: <Typography sx={{ ml : 1 }} variant="subtitle2">HR Compliance</Typography> },
                                                    { key: "Type", value: <Typography sx={{ ml : 1 }} variant="subtitle2">Acknowledgement</Typography> },
													{ key: "Effective", value: <Typography sx={{ ml : 1 }} variant="subtitle2">09 Jan, 2025 - 10 Jan, 2025</Typography> },
                                                    { key: "Details", value: <Accordion1 title={<Typography sx={{ color : '#4DADDE' }} variant="subtitle2">Details</Typography>} />},
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
												</Grid> },
												].map((item) => (
													<PropertyItem key={item.key} name={item.key} value={item.value} />
												))}
											</PropertyList>
										</Card>
					</Grid>
				</Grid>				
					
}
