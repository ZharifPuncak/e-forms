import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from "@mui/material/Divider";

import Card from "@mui/material/Card";


import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { TextEditor } from "@/components/core/text-editor/text-editor";

import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";


import integrityPDF from "@/assets/docs/Integrity Pledge.pdf";


const SubmitAcknowledgementForm = ()  => {

  const theme = useTheme();
  const [initialValues,setInitialValues] = useState({
    name:  '',
    alias: '',
    type:  '',
    category: '',
    descriptions: '',
    instructions: '',
  }); 

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(100).required("Name is required").label('Name'),
    alias: Yup.string().min(3).max(100).required("Alias is required").label('Alias'),
    category: Yup.object().required("Category is required").label('Category'),
    type: Yup.object().required("Type is required").label('Type'),
    descriptions: Yup.string().required("Description is required").label('Description'),
    instructions: Yup.string().required("Instruction is required").label('Instruction'),
  });

  const categories = ['IT Security Compliance','HR Policy','Onboarding Policy'];
  const types = ['pledge','acknowledgement'];

  const {
        values,
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        touched,
        setFieldValue,
        resetForm
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => { 
        
        } 
    });


  return (
  <form onSubmit={handleSubmit}>

        <Grid container={true} spacing={4}  >
          
            {/* <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <embed src={integrityPDF} type="application/pdf" width="100%%" height="600px" class="pdf-container" />
            </Grid>
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
                <Box>
           
                </Box>
            </Grid> */}


            <Grid 	size={{ md: 12, xs: 12 }} >
						<Card sx={{ borderRadius: 1 }} variant="outlined">
												<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
													{[
														{ key: "Doc", value: <Box>
                                     <embed  src={integrityPDF + '#zoom=100'} type="application/pdf" width="100%" height="800px"  /> 
                              </Box>},
                          	{ key: "Action", value:  	<Grid container spacing={1}>
															{/* <Button size="small" >Edit </Button> */}
													</Grid> },
                            { key: "Signature", value: null },
									
													,
													].map((item) => (
														<PropertyItem key={item.key} name={item.key} value={item.value} />
													))}
												</PropertyList>
						</Card>
					</Grid>
        </Grid>
       
    </form>
  );
}

export default SubmitAcknowledgementForm;


