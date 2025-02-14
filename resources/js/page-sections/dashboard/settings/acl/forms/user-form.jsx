import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMediaQuery } from "@/hooks/use-media-query";

const UserForm = ({ data })  => {

  const theme = useTheme();
  const [initialValues,setInitialValues] = useState({
    name: data?.name || '',
    email: data?.email || '',
    role:  data?.role ? [data?.role] : [],
  }); 

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(255).required("Name is required").label('Name'),
    email: Yup.string().email("Must be a valid email").max(255).required("Email is required").label('Email'),
    role: Yup.array().required("Role is required").label('Ro;e'),
  });

  const roles = ['Admin','Admin-HR'];
 

  const mdDown = useMediaQuery("down", "md");
  

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

        <Grid container={true} spacing={2}  >
            <Grid  size={{ xs : 12, sm: 12, md : 12 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Name </Typography>
              <TextField
                        fullWidth
                        name="name"
                        placeholder="Enter name"
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
                              fontSize: '14px',   // Adjust size here
                              opacity: 0.8, // Optional: Adjust transparency if needed
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
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Email </Typography>
               <TextField
                   fullWidth
                   name="email"
                   placeholder="Enter email"
                   autoComplete="off"
                   onBlur={handleBlur} 
                   onChange={handleChange} 
                   value={values.email}  
                   helperText={touched.email && errors.email} 
                   error={Boolean(touched.email && errors.email)} 
                   type={'email'}
                   InputProps={{
								
                    sx: {
                      '& input::placeholder': {
                        fontSize: '14px',   // Adjust size here
                        opacity: 0.8, // Optional: Adjust transparency if needed
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
       <Grid  size={{xs : 12, sm: 12, md : 12 }}>
       <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Role </Typography>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{  '& .MuiInputBase-root': { height: 45 } }} 
                  multiple
                  freeSolo
                  id="role"
                  value={values.role || []}
                  name="role"
                  onChange={(e, v) => {
                    setFieldValue("role", v || []);
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ""}
                  options={roles}
                  renderInput={(params) => (
                    <TextField
                    placeholder='Select role'
                    helperText={touched.role && errors.role}      error={Boolean(touched.role && errors.role)}  {...params}      
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                       
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: '14px',  // Custom font size
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
                <Button  variant="contained">SUBMIT</Button>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default UserForm;


