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
import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";


import SubmitAcknowledgementForm from "../forms/submit-form";
import { useAppContext } from '@/contexts/app-context';

import useAxios  from "@/hooks/use-axios";
import { useParams } from "react-router-dom";

import _ from 'lodash';

const HTMLParse = ({ htmlContent })  => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}


export function AcknowledgementFormDetails({ updateName }) {


    const appContext = useAppContext();
    const { axiosGet } = useAxios();
    const { code } = useParams();
    
    const {  data : fetchedAcknowledgementsDetails, refetch   }  = axiosGet({  id : 'acknowledgements-form-details' , url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/details/' + code });
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
											
                                                    { key: "Code", value: <Typography sx={{ ml : 1 }} variant="body2">{ details?.code }</Typography> },
                                                    { key: "Issued", value: <Typography sx={{ ml : 1 }} variant="body2">{ details?.issued }</Typography> },
                                                    { key: "Deadline", value: <Typography sx={{ ml : 1 }} variant="body2">{ details?.deadline }</Typography> },
                                                    { key: "Submitted", value: <Typography sx={{ ml : 1 }} variant="body2">{ details?.submitted }</Typography> },
                                                    // { key: "Submitted", value: <Typography sx={{ ml : 1 }} variant="body2">ACK001</Typography> },
													{
														key: "Status",
														value: (
                                                            <Chip
                                                                icon={
                                                                    details?.status == 'pending' ? <HourglassHighIcon color="var(--mui-palette-warning-main)" /> : 
                                                                    details?.status == 'completed' ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> :
                                                                ''}
                                                                label={_.capitalize(details?.status)}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                    ),
													},
                                                    { key: "Details", value: <>
                                                               	<HTMLParse htmlContent={details?.descriptions} />
                                                    </> },
                                                     { key: "Action", value:  	<Grid container spacing={1}>
                                                     <Button size="small" onClick={() => {
                                                         appContext.setDialog({ isOpen : true , title : 'Integrity Pledge', subtitle:'ACK001', component : <SubmitAcknowledgementForm 
                                                            code={details?.code}
                                                            title={details?.title}
                                                            file={details?.file} 
                                                            status={details?.status}
                                                            submitted={details?.submitted}
                                                            signature={details?.sign}
                                                            update={refetch}
                                                    />})
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
