import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";

const UserForm = ({ props })  => {

   const theme = useTheme();
  const [initialValues,setInitialValues] = useState({
    name: props?.name || '',
    email: props?.email || '',
    role: props?.role || [],
    department: props?.department || [],
  }); 

  const validationSchema = Yup.object().shape({
    role: Yup.string().min(3).max(255).required("Role is required"),
  });

  const methods = ['view','edit'];
  

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
        <Box sx={{  justifyContent:"center", alignItems:"center" }}  >
        <Grid container={true} spacing={2}  >
            <Grid  size={{xs : 12, sm: 12, md : 12}}>
              <TextField
                        fullWidth
                        name="role"
                        label="Name"
                        placeholder="Please key in name"
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.role}  
                        helperText={touched.role && errors.role} 
                        error={Boolean(touched.role && errors.role)} 
                        type={'text'}
                        InputProps={{
                            sx: {
                                '& input::placeholder': {
                                    fontSize: '0.8rem',  // Adjust size here
                                    opacity: 0.8, // Optional: Adjust transparency if needed
                                },
                            },
                        }}
                    />
            </Grid>
            <Grid  size={{xs : 12, sm: 12, md : 5 }}>
               
               <TextField
                   fullWidth
                   name="role"
                   label="Email"
                   placeholder="Please key in email"
                   autoComplete="off"
                   onBlur={handleBlur} 
                   onChange={handleChange} 
                   value={values.role}  
                   helperText={touched.role && errors.role} 
                   error={Boolean(touched.role && errors.role)} 
                   type={'text'}
                   InputProps={{
                       sx: {
                           '& input::placeholder': {
                               fontSize: '0.8rem',  // Adjust size here
                               opacity: 0.8, // Optional: Adjust transparency if needed
                           },
                       },
                   }}
               />
           
       </Grid>
       <Grid  size={{xs : 12, sm: 12, md : 5 }}>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{  '& .MuiInputBase-root': { height: 45 } }} 
                  multiple
                  freeSolo
                  id="user"
                  value={values.user || []}
                  name="user"
                  onChange={(e, v) => {
                    setFieldValue("user", v || []);
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ""}
                  options={methods}
                  renderInput={(params) => (
                    <TextField
                    helperText={touched.user && errors.user}      error={Boolean(touched.user && errors.user)}  {...params} label="User" 
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: Boolean(errors.user) ? 'red' : 'inherit',
                        },
                      }}
                    />
                  )}
                />

           
           
              </Stack>         
          </Grid>
        </Grid>
        </Box>
    </form>
  );
}

export default UserForm;


