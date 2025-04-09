"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";

import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";

import SubmitAcknowledgementForm from "../forms/submit-form";
import { useAppContext } from '@/contexts/app-context';

import useAxios  from "@/hooks/use-axios";
import { useParams } from "react-router-dom";

import { useMediaQuery } from "@/hooks/use-media-query";
import _ from 'lodash';
import Accordion1 from "@/components/widgets/accordions/accordion-1";

import { ShortSkeleton, MedSkeleton, LongSkeleton } from "@/components/loader/loading-skeleton";

const HTMLParse = ({ htmlContent })  => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}


export function AcknowledgementFormDetails({ updateName }) {

    const smDown = useMediaQuery("down", "sm");
    const appContext = useAppContext();
    const { axiosGet } = useAxios();
    const { code } = useParams();
    
    const {  data : fetchedAcknowledgementsDetails, refetch , isLoading  }  = axiosGet({  id : 'acknowledgements-form-details' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/details/' + code });
    const details = fetchedAcknowledgementsDetails?.data?.details;

    React.useEffect(() => {
        if(details?.name){
            updateName(details?.name);
        }
    },[details?.name])

    
	return  <Grid container spacing={4}>
					<Grid 	size={{ md: 12, xs: 12 }} >
                    <Card sx={{ borderRadius: 1 }} variant="outlined">
											<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
												{[
											
                                                    { key: "Code",      value: !isLoading ? <Typography sx={{ ml : 1 }} variant="body2">{ details?.code }</Typography> : <ShortSkeleton /> },
                                                    { key: "Issued",    value: !isLoading ? <Typography sx={{ ml : 1 }} variant="body2">{ details?.issued }</Typography> : <MedSkeleton /> },
                                                    { key: "Deadline",  value: !isLoading ? <Typography sx={{ ml : 1 }} variant="body2">{ details?.deadline }</Typography> : <ShortSkeleton /> },
                                                    { key: "Submitted", value: !isLoading ? <Typography sx={{ ml : 1 }} variant="body2">{ details?.submitted }</Typography> : <LongSkeleton /> },
                                                    // { key: "Submitted", value: <Typography sx={{ ml : 1 }} variant="body2">ACK001</Typography> },
													{
														key: "Status",
														value: (
                                                            !isLoading ?  <Chip
                                                                icon={
                                                                    details?.status == 'pending' ? <HourglassHighIcon color="var(--mui-palette-warning-main)" /> : 
                                                                    details?.status == 'completed' ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> :
                                                                    details?.status == 'incompleted' ? <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> :
                                                                    details?.status == 'cancelled' ? <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> :
                                                                ''}
                                                                label={_.capitalize(details?.status)}
                                                                size="small"
                                                                variant="outlined"
                                                            /> : <ShortSkeleton />
                                                    ),
													},
                                                    { key: "Remarks", value: !isLoading ? <Typography sx={{ ml : 1 }} variant="body2">{ details?.remarks }</Typography> : <ShortSkeleton /> },
                                                    { key: "Details", value: 
                                                        !isLoading ?  <Accordion1 details={
                                                        <HTMLParse htmlContent={details?.descriptions} />
                                                                                                            } title={
                                                                                                                <>
                                                                                                                    {     <Button size="small" variant="text">View details</Button> }			
                                                                                                                </>
                                                                                                                } />: <ShortSkeleton />
                                                    
                                                    
                                                   },
                                                     { key: "Action", value:  !isLoading ?	<Grid container spacing={1}>
                                                  { details?.status != 'cancelled' &&  <Button size="small" onClick={() => {
                                                         appContext.setDialog({ fullWidth : true, isOpen : true , title : 'Integrity Pledge', subtitle:'ACK001', component : <SubmitAcknowledgementForm 
                                                            code={details?.code}
                                                            title={details?.title}
                                                            file={details?.file} 
                                                            status={details?.status}
                                                            submitted={details?.submitted}
                                                            signature={details?.sign}
                                                            update={refetch}
                                                    />})
                                                     }}>Click here </Button>}
                                             </Grid> : <ShortSkeleton /> }
												
												].map((item) => (
													<PropertyItem key={item.key} name={item.key} value={item.value} />
												))}
											</PropertyList>
										</Card>
					 </Grid>
 
				</Grid>				
					
}
