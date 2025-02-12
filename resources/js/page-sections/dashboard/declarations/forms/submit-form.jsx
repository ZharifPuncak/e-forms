import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { TextEditor } from "@/components/core/text-editor/text-editor";

import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Typography } from '@mui/material';

import integrityPDF from "@/assets/docs/Integrity Pledge.pdf";


const SubmitDeclarationForm = ()  => {

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
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <embed src={integrityPDF} type="application/pdf" width="100%%" height="600px" class="pdf-container" />
            </Grid>
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
                <Box>
                  {/* <Button size='small'  variant="contained">SUBMIT</Button> */}
                </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default SubmitDeclarationForm;


