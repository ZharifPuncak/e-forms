import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import  LoadingButton  from '@mui/lab/LoadingButton';


import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Typography } from '@mui/material';

import useAxios  from "@/hooks/use-axios";

const StaffForm = () => {

  const { axiosGet, axiosMutate } = useAxios();

  const theme = useTheme();
  const [initialValues,setInitialValues] = useState({
    name:  '',
    email: '',
    staffID: '',
    staffIC: '',
    company :  '',
    department : '',
    position : '',
    category : '',
  }); 

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(100).required("Name is required").label('Name'),
    email: Yup.string().email('Invalid email').required("Email is required").label('Email'),
    staffID: Yup.string().min(5).max(15).required("Staff ID is required").label('Staff ID'),
    staffIC: Yup.string().min(12).max(12).required("Staff IC is required").label('Staff IC'),
    company: Yup.object().required("Company is required").label('Company'),
    department : Yup.object().required("Department is required").label('Department'),
    position : Yup.object().required("Position is required").label('Position'),
    category : Yup.object().required("Category is required").label('Category'),
  });

  const categories = ['Managerial','Executive','Non-Executive','General Worker'];
  const companies = ['TRIFMS','PNMS','PNC'];
  const departments = ['HUMAN RESOURCE ADMINISTRATION','FINANCE & ACCOUNTS','PNC'];
  const positions = ['CIVIL TECHNICIAN','SENIOR TECHNICIAN','ELECTRICAL TECHNICIAN'];

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
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.name}  
                        helperText={touched.name && errors.name} 
                        type={'text'}
                        FormHelperTextProps={{
                          sx: { color: "#f05344" }, // ✅ Change helper text color
                        }}
                        InputProps={{
                     
                            sx: {
                                '& input::placeholder': {
                                    fontSize: '14px',  // Adjust size here
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
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Staff ID </Typography>
              <TextField
                        fullWidth
                        name="staffID"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.staffID}  
                        helperText={touched.staffID && errors.staffID} 
                        FormHelperTextProps={{
                          sx: { color: "#f05344" }, // ✅ Change helper text color
                        }}
                        type={'text'}
                        InputProps={{
                     
                            sx: {
                                '& input::placeholder': {
                                    fontSize: '14px',  // Adjust size here
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
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Staff IC </Typography>
              <TextField
                        fullWidth
                        name="staffIC"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.staffIC}  
                        helperText={touched.staffIC && errors.staffIC} 
                        FormHelperTextProps={{
                          sx: { color: "#f05344" }, // ✅ Change helper text color
                        }}
                        type={'text'}
                        InputProps={{
                     
                            sx: {
                                '& input::placeholder': {
                                    fontSize: '14px',  // Adjust size here
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
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Email </Typography>
              <TextField
                        fullWidth
                        name="email"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.email}  
                        helperText={touched.email && errors.email} 
                        FormHelperTextProps={{
                          sx: { color: "#f05344" }, // ✅ Change helper text color
                        }}
                        type={'text'}
                        InputProps={{
                     
                            sx: {
                                '& input::placeholder': {
                                    fontSize: '14px',  // Adjust size here
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
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Company </Typography>
              <Stack spacing={1}>
                 <Autocomplete
          
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                    // "& .MuiInputLabel-root": { fontWeight: "bold" }, // Make label bold
                  }}
                  id="company"
                  value={values.company}
                  name="company"
                  onChange={(e, v) => {
                    setFieldValue("company", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ''}
                  options={companies}
                  renderInput={(params) => (
                    <TextField
                      placeholder=""
                      helperText={touched.company && errors.company}    
                      FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}  
                      {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                        
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
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
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Department </Typography>
              <Stack spacing={1}>
                 <Autocomplete
          
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                    // "& .MuiInputLabel-root": { fontWeight: "bold" }, // Make label bold
                  }}
                  id="department"
                  value={values.department}
                  name="department"
                  onChange={(e, v) => {
                    setFieldValue("department", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ''}
                  options={departments}
                  renderInput={(params) => (
                    <TextField
                      placeholder=""
                      FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}
                      helperText={touched.department && errors.department}  {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
              
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
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
                      placeholder=""
                      FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}
                      helperText={touched.category && errors.category}   {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                  
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
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
          <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Position </Typography>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                  }}
                  id="position"
                  value={values.position}
                  name="position"
                  onChange={(e, v) => {
                    setFieldValue("position", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ""}
                  options={positions}
                  renderInput={(params) => (
                    <TextField
                       placeholder=""
                       FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}
                    helperText={touched.position && errors.position}   {...params}  
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                 
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
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

            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton type="submit" variant="contained">SUBMIT</LoadingButton>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default StaffForm;


