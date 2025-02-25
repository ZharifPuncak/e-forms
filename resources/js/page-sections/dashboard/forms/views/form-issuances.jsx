"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import TableAG from "@/components/core/table/TableAG";

import _ from 'lodash';
import { useAppContext } from "@/contexts/app-context";
import { useParams } from "react-router-dom";

import IssuanceForm from "../forms/issuance-form";
import useAxios  from "@/hooks/use-axios";

import { HourglassHigh as HourglassHighIcon } from "@phosphor-icons/react/dist/ssr/HourglassHigh";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";


export function FormIssuances() {
     
	const [selectedId,setSelectedId] = React.useState(null);
	const { code } = useParams();
    const appContext = useAppContext();
	const { axiosGet, axiosMutate } = useAxios();
	const { isLoading, data : fetchedIssuance, refetch : getIssuance }  = axiosGet({  id : 'form-issuances' + code , url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/' + code  });
	const { mutate : deleteIssuance, isLoading : deleteIssuanceLoading } =  axiosMutate({ id: 'forms-issuance-delete' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/delete', payload : { id : selectedId } });
	const { mutate : dispatchIssuance, isLoading : dispatchIssuanceLoading  } =  axiosMutate({ id: 'forms-issuance-dispatch' + code, method : 'put', url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/dispatch', payload : { id : selectedId } });


    const [colDefs, setColDefs] = React.useState([]);
    React.useEffect(() => {

		console.log(fetchedIssuance?.data);
		setColDefs([

		
			{ field: "companies", cellRenderer : (params) => {
				const rowData = params.data;
			
					return <>
					{ rowData?.companies?.map((item) => {
						return <Chip sx={{ ml : 0.5 }} label={item.code} />;
					})}
			
			
				</>
			} },
			{ field: "issued_at", headerName : 'Issued Date'},
			{ field: "deadlined_at", headerName : 'Deadline Date'},
			{ field: "status", 	cellRenderer : (params) => {
	
				const rowData = params.data;
				const mapping = {
					dispatched: {
						label: "Dispatched",
						icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
					},
					pending: { label: "Pending", icon: <HourglassHighIcon color="var(--mui-palette-error-main)" /> },
				};
				const { label, icon } = mapping[rowData.status] ?? { label: "Unknown", icon: null };
	
				return <Chip icon={icon} label={label} size="small" variant="outlined" />;
			}},
			{ field: "action", cellRenderer : (params) => {
				const rowData = params.data;
			
				return <>
						<Button 
							disabled={rowData?.status == 'dispatched'} 	
							onClick={() => {
								appContext.setDialog({ 	isOpen : true, title : 'Edit issuance', subtitle :   ' ('+ code + ')', component : <IssuanceForm loadedCompanies={fetchedIssuance?.data?.loadedCompanies} update={getIssuance} code={code} end={fetchedIssuance?.data?.form_end} item={rowData} /> })
							}}  
							size="small">
							Edit 
						</Button>
	
						<Button 
							disabled={rowData?.status == 'dispatched'} 	
							onClick={async () => {
								await setSelectedId(rowData?.id);
								setTimeout(async () => {
									await deleteIssuance();
									await getIssuance();
								},200)						}}  
							size="small">
							Delete 
						</Button>
	
						{rowData?.status == 'pending' && <Button 
						 
							onClick={async () => {
								await setSelectedId(rowData?.id);
								setTimeout(async () => {
									await dispatchIssuance();
									await getIssuance();
								},200)						}}  
							size="small">
							Dispatch 
						</Button>}
		
				</>
			} }
		])

	},[fetchedIssuance?.data])

	return <>

		{ !isLoading  && <Box style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button variant="outlined" onClick={() => {
					appContext.setDialog({ title : 'Add issuance', subtitle : fetchedIssuance?.data?.form_name + ' ('+ code + ')', component : <IssuanceForm loadedCompanies={fetchedIssuance?.data?.loadedCompanies} update={getIssuance} code={code} end={fetchedIssuance?.data?.form_end} />, isOpen: true})
				}}>+ Add issuance </Button>
			</Box> }

			<TableAG row={fetchedIssuance?.data?.issuances} column={colDefs} loading={isLoading || deleteIssuanceLoading || dispatchIssuanceLoading} title='' search={false}/>
	
	</>;
}
