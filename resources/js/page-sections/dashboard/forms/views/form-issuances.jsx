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


export function FormIssuances() {

	const { code } = useParams();
    const appContext = useAppContext();
	const { axiosGet } = useAxios();
	const { isLoading, data : fetchedIssuance, refetch : getIssuance }  = axiosGet({  id : 'form-issuances' + code , url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/' + code  });


    const [colDefs, setColDefs] = React.useState([
		
		{ field: "companies", cellRenderer : (params) => {
			const rowData = params.data;
			console.log(params.data)
				return <>
				{ rowData?.companies?.map((item) => {
					return <Chip sx={{ ml : 0.5 }} label={item.code} />;
				})}
		
		
			</>
		} },
		{ field: "issued_at", headerName : 'Issued Date'},
		{ field: "deadlined_at", headerName : 'Deadline Date'},
		{ field: "action", cellRenderer : (params) => {
			const rowData = params.data;
			return <>
				<Link 

			    sx={{ cursor : 'pointer', mr : 2 }}
			    onClick={() => {
					appContext.setDialog({ 	isOpen : true, title : 'Edit issuance', subtitle :   ' ('+ code + ')', component : <IssuanceForm update={getIssuance} code={code} end={fetchedIssuance?.data?.form_end} item={rowData} /> })
				}}>Edit
				</Link>

				<Link 

			    sx={{ cursor : 'pointer', mr : 2 }}
			    onClick={() => {
					// appContext.setDialog({ 	isOpen : true, title : 'Update user', subtitle : rowData.email, component : <UserForm data={rowData} /> })
				}}>Delete
				</Link>
		
			</>
		} }
    ]);

	return <>

		{ !isLoading  && <Box style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button variant="outlined" onClick={() => {
					appContext.setDialog({ title : 'Add issuance', subtitle : fetchedIssuance?.data?.form_name + ' ('+ code + ')', component : <IssuanceForm update={getIssuance} code={code} end={fetchedIssuance?.data?.form_end} />, isOpen: true})
				}}>+ Add issuance </Button>
			</Box>}

			<TableAG row={fetchedIssuance?.data?.issuances} column={colDefs} loading={isLoading} title='' search={false}/>
	
	</>;
}
