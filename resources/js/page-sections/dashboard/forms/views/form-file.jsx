"use client";

import * as React from "react";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableAG from "@/components/core/table/TableAG";
import { useAppContext } from "@/contexts/app-context";
import { useParams } from "react-router-dom";
import _ from 'lodash';

import UploadFile from "../forms/upload-file";
import useAxios  from "@/hooks/use-axios";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useConfirm } from "material-ui-confirm";

export function FormFile({ status, update }) {

    const appContext = useAppContext();
	const { code } = useParams();

	const { axiosGet, axiosMutate } = useAxios();
	const { isLoading, data : fetchedFile, refetch : getFile }  = axiosGet({  id : 'form-file' + code , url : import.meta.env.VITE_API_BASE_URL + '/forms/files/' + code  });
    const { mutate : deleteFile, isLoading : deleteFileLoading } =  axiosMutate({ id: 'forms-file-delete' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/files/delete', payload : { code } });
     const confirm = useConfirm();
	const mdDown = useMediaQuery("down", "md");


    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = React.useState([]);
    React.useEffect(() => {
		setColDefs([

			{ field: "title", label : "Title"},
			{ field: "name", label : "Name" , hide : mdDown ? true : false},
			{ field: 'size' ,label: "Size", hide : mdDown ? true : false ,cellRenderer : ( params ) => {

				const rowData = params.data;
				return rowData?.size + ' MB';
			}},
			{ field: "extension", label : "Extension" , hide : mdDown ? true : false},
			{ field: "action", cellRenderer : (params) => {
				
				const rowData = params.data;
				return <>

					<Button onClick={() => { window.open(rowData?.file, "_blank") }}>
					   View
					</Button>

					{ status == 'pending' && <Button 
						onClick={() => {
						appContext.setDialog({ title : 'Upload file', subtitle : code, component : <UploadFile data={rowData} update={getFile} code={code} />, isOpen: true})}}
					>  Edit
					</Button> }

					{ status == 'pending' && <Button 
				
					onClick={async () => {

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
								await deleteFile();
								getFile();
								update();
							})
							.catch(() => {
						
							});
					
					}}>
						 Delete
					</Button> }
				 
			
				</>
			} }
		])
	},[status,mdDown])

	return <>
			{_.isEmpty(fetchedFile?.data?.files) && !isLoading  && <Box style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button sx={{ mb : 1 }} variant="outlined" onClick={() => {
					appContext.setDialog({ title : 'Upload file', subtitle : code, component : <UploadFile update={() => {
						getFile();
						update();
					}} code={code} />, isOpen: true})
				}}>+ Upload</Button>
			</Box>}

			<TableAG row={fetchedFile?.data?.files} column={colDefs} loading={isLoading || deleteFileLoading} title='' search={false}/>
	
	</>;
}
