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
            <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Name </Typography>
              <TextField
                        fullWidth
                        name="name"
                        placeholder="Enter form name"
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.name}  
                        helperText={touched.name && errors.name} 
                        error={Boolean(touched.name && errors.name)} 
                        type={'text'}
                        InputProps={{
                     
                            sx: {
                                '& input::placeholder': {
                                    fontSize: '12px',  // Adjust size here
                                    opacity: 0.9, // Optional: Adjust transparency if needed
                                },
                                "& .MuiOutlinedInput-root": {
                                  height: "50px", // Set the height of the whole input
                                  display: "flex",
                                  alignItems: "center", // Ensure text is centered
                                },
                            
                                "& .MuiOutlinedInput-input": {
                                  paddingY : '10px'
                                },
                            },
                        }}
                    />
            </Grid>
            <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Alias </Typography>
              <TextField
                        fullWidth
                        name="alias"
                        placeholder="Enter form alias"
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.alias}  
                        helperText={touched.alias && errors.alias} 
                        error={Boolean(touched.alias && errors.alias)} 
                        type={'text'}
                        InputProps={{
                     
                            sx: {
                                '& input::placeholder': {
                                    fontSize: '12px',  // Adjust size here
                                    opacity: 0.9, // Optional: Adjust transparency if needed
                                },
                                "& .MuiOutlinedInput-root": {
                                  height: "50px", // Set the height of the whole input
                                  display: "flex",
                                  alignItems: "center", // Ensure text is centered
                                },
                            
                                "& .MuiOutlinedInput-input": {
                                  paddingY : '10px'
                                },
                            },
                        }}
                    />
            </Grid>
            <Grid  size={{xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Category </Typography>
              <Stack spacing={1}>
                 <Autocomplete
          
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                    // "& .MuiInputLabel-root": { fontWeight: "bold" }, // Make label bold
                  }}
                  id="category"
                  value={values.category}
                  name="category"
                  onChange={(e, v) => {
                    setFieldValue("category", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ''}
                  options={categories}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Select form category"
                      helperText={touched.category && errors.category}      error={Boolean(touched.category && errors.category)}  {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: Boolean(errors.category) ? 'red' : 'inherit',
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "12px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                   
                      }}
                    />
                  )}
                />
              </Stack>         
          </Grid>

          <Grid  size={{xs : 12, sm: 12, md : 6 }}>
          <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Type </Typography>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                  }}
                  id="type"
                  value={values.type}
                  name="type"
                  onChange={(e, v) => {
                    setFieldValue("type", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ""}
                  options={types}
                  renderInput={(params) => (
                    <TextField
                       placeholder="Select form type"
                    helperText={touched.type && errors.type}      error={Boolean(touched.type && errors.type)}  {...params}  
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: Boolean(errors.type) ? 'red' : 'inherit',
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "12px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                   
                      }}
                    />
                  )}
                />
              </Stack>         
            </Grid>

            
          	<Grid size={{xs : 12, sm: 12, md : 12 }}> 
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Description </Typography>
                  <TextEditor
                          content={""}
                          onUpdate={({ editor }) => {
                            // editor.getText()
                          }}
                          placeholder="Description here..."
                  />
					  </Grid>

            
          	<Grid size={{xs : 12, sm: 12, md : 12 }}> 

                  <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Instructions </Typography>
                  <TextEditor
                          content={""}
                          onUpdate={({ editor }) => {
                            // editor.getText()
                          }}
                          placeholder="Instructions here..."
                          sx={{
                            "& .placeholder-class": { 
                              fontSize: "18px", 
                              color: "gray",
                              fontStyle: "italic"
                            },
                          }}
                    />
					  </Grid>


            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size='small'  variant="contained">SUBMIT</Button>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default SubmitDeclarationForm;


