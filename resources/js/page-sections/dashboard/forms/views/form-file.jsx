"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TableAG from "@/components/core/table/TableAG";
import { useAppContext } from "@/contexts/app-context";
import { useParams } from "react-router-dom";
import _ from 'lodash';

import UploadFile from "../forms/upload-file";
import useAxios  from "@/hooks/use-axios";


export function FormFile({ status, update }) {

    const appContext = useAppContext();
	const { code } = useParams();

	const { axiosGet, axiosMutate } = useAxios();
	const { isLoading, data : fetchedFile, refetch : getFile }  = axiosGet({  id : 'form-file' + code , url : import.meta.env.VITE_API_BASE_URL + '/forms/files/' + code  });
    const { mutate : deleteFile, isLoading : deleteFileLoading } =  axiosMutate({ id: 'forms-file-delete' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/files/delete', payload : { code } });
  

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([]);
    React.useEffect(() => {
		setColDefs([

			{ field: "title", label : "Title"},
			{ field: "name", label : "Name"},
			{ field: 'size' ,label: "Size", cellRenderer : ( params ) => {

				const rowData = params.data;
				return rowData?.size + ' MB';
			}},
			{ field: "extension", label : "Extension"},
			{ field: "action", cellRenderer : (params) => {
				
				const rowData = params.data;
				return <>
				   {status == 'pending' && <Box>

						<Link  sx={{ cursor : 'pointer', mr : 2 }} > 
						     	View
						</Link>
						<Link 
	
						  sx={{ cursor : 'pointer', mr : 2 }}
						  onClick={() => {
							appContext.setDialog({ title : 'Upload file', subtitle : code, component : <UploadFile data={rowData} update={getFile} code={code} />, isOpen: true})}}
						>Edit
						</Link>
						<Link 
	
						sx={{ cursor : 'pointer', mr : 2 }}
						onClick={async () => {
							await deleteFile();
							getFile();
							update();
						}}> Delete
						</Link>
					</Box>}
			
				</>
			} }
		])
	},[status])

	return <>
			{_.isEmpty(fetchedFile?.data?.files) && !isLoading  && <Box style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button variant="outlined" onClick={() => {
					appContext.setDialog({ title : 'Upload file', subtitle : code, component : <UploadFile update={() => {
						getFile();
						update();
					}} code={code} />, isOpen: true})
				}}>+ Upload</Button>
			</Box>}

			<TableAG row={fetchedFile?.data?.files} column={colDefs} loading={isLoading || deleteFileLoading} title='' search={false}/>
	
	</>;
}
