"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";

import _ from 'lodash';
import StaffForm from "../forms/staff-form";

import useAxios  from "@/hooks/use-axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@/contexts/app-context";
import { useConfirm } from "material-ui-confirm";

import {  ShortSkeleton, MedSkeleton, LongSkeleton } from "@/components/loader/loading-skeleton";

export function StaffDetails({  updateName  }) {


	const { axiosGet, axiosMutate } = useAxios();
	const { code } = useParams();
	const appContext = useAppContext();
	const confirm = useConfirm();
	const navigate = useNavigate();

	const {  data : fetchedDetails, refetch : getDetail }  = axiosGet({  id : 'staff-list' + code , url : import.meta.env.VITE_API_BASE_URL + '/staffs/details/' + code  });
    const details = fetchedDetails?.data?.details;
	
	const { mutate : confirmStaff , isLoading : confirmLoading  } =  axiosMutate({ id: 'staffs-confirm' + details?.id, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/staffs/confirm', payload : { staffId : details?.staffId }});
	const { mutate : deleteStaff, isLoading : deleteStaffLoading, isSuccess : deleteStaffSuccess  } =  axiosMutate({ id: 'staffs-delete' + details?.id, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/staffs/delete', payload : { staffId : details?.staffId } });


	React.useEffect(() => {
			if(details?.name){
				updateName(details?.name);
			}
	},[details?.name])

	React.useEffect(() => {
			if(deleteStaffSuccess){
				setTimeout(() => {
					window.location.href = window.location.origin + '/e-forms/dashboard/staff';
				},250)
			}
		},[deleteStaffSuccess])
  

	return  <Grid container spacing={4}>
	
					<Grid 	size={{ md: 12, xs: 12 }} >
                    <Card sx={{ borderRadius: 1 }} variant="outlined">
											<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
												{[
													{ key: "Name", value: details?.name ? <Typography sx={{ ml : 1 }} variant="body2">{details?.name}</Typography> : <MedSkeleton  />},
                                                    { key: "Staff ID", value: details?.staffId ? <Typography sx={{ ml : 1 }} variant="body2">{details?.staffId}</Typography> : <ShortSkeleton  />  },
													{ key: "Staff IC", value: details?.staffIcNo ?  <Typography sx={{ ml : 1 }} variant="body2">{details?.staffIcNo}</Typography> : <ShortSkeleton  />},
                                                    { key: "Company", value: details?.department?.name?  <Typography sx={{ ml : 1 }} variant="body2">{details?.company?.code}</Typography> : <MedSkeleton  />},
                                                    { key: "Department", value:  details?.company?.code ?  <Typography sx={{ ml : 1 }} variant="body2">{details?.department?.name}</Typography> : <MedSkeleton  /> },
                                                    { key: "Position", value: details?.position?.name ?  <Typography sx={{ ml : 1 }} variant="body2">{details?.position?.name}</Typography> : <MedSkeleton  /> },
                                                    { key: "Category", value: details?.category?.name ?  <Typography sx={{ ml : 1 }} variant="body2">{details?.category?.name}</Typography> : <LongSkeleton  /> },
													{ key: "Grade", value: details?.grade?.name?   <Typography sx={{ ml : 1 }} variant="body2">{details?.grade?.name}</Typography> : <LongSkeleton  /> },
													{
														key: "Status",
														value: details?.status ? (
															<Chip
																icon={
																	details?.status == 'pending' ? <HourglassHighIcon color="var(--mui-palette-warning-main)" /> : 
																	details?.status == 'active' ? <HourglassHighIcon color="var(--mui-palette-success-main)" /> : 
																	 details?.status == 'inactive' ? <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> :
														
																''}
																label={_.capitalize(details?.status)}
																size="small"
																variant="outlined"
															/>
													) : <ShortSkeleton  />,
													},
													// { key: "Remarks", value: <Typography sx={{ ml : 1 }} variant="body2"></Typography> },
													{ key: "Action", value:  	<Grid container spacing={1}>
														{details?.status == 'pending' && <Button size="small" onClick={() => {  appContext.setDialog({ isOpen : true, title : `${details?.name}`, subtitle : `${details?.staffId}`,component : <StaffForm update={getDetail} item={details}  /> })}} >Edit </Button>}
														{details?.status == 'pending' && <Button size="small" onClick={async () => {
														
															confirm({
																title: <Typography variant="body1">Are you sure ?</Typography>,
																description: <Box>
																				<Alert severity="error">This action cannot be undone.</Alert>
																			</Box>,
																confirmationText: 'Yes, delete it',
																cancellationText: 'Cancel',
																confirmationButtonProps: {
																	sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' }
																},
																cancellationButtonProps: {
																	sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' },
																},
															  })
																.then(async () => {
																	await deleteStaff();
																})
																.catch(() => {
															
																});
														}} >Delete </Button>}
														{details?.status == 'pending' && <Button size="small" onClick={async () => {
														

															confirm({
																title: <Typography variant="body1">Are you sure ?</Typography>,
																description: <Box>
																				<Alert severity="warning">This action cannot be undone.</Alert>
																			</Box>,
																confirmationText: 'Yes, confirm it',
																cancellationText: 'Cancel',
																confirmationButtonProps: {
																	sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' }
																},
																cancellationButtonProps: {
																	sx: {  border: "none", fontSize : '14px',textTransform: "capitalize", fontWeight : '400' },
																},
															  })
																.then(async () => {
																	await confirmStaff();
																	getDetail();
																})
																.catch(() => {
															
																});
														}} >Confirm </Button>}
                                                        {/* <Button size="small"  >Activate </Button>
                                                        <Button size="small"  >Deactivate </Button> */}
												</Grid> },
												].map((item) => (
													<PropertyItem key={item.key} name={item.key} value={item.value} />
												))}
											</PropertyList>
										</Card>
					</Grid>
				</Grid>				
					
}
