import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';


import * as Yup from "yup";
import { useFormik } from "formik";

const RoleForm = ({ props })  => {


  const [initialValues,setInitialValues] = useState({
    role: props?.role || '',
  }); 

  const validationSchema = Yup.object().shape({
    role: Yup.string().min(3).max(255).required("Role is required"),
  });
  

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
        <Grid container={true}  justifyContent="center" alignItems="center" sx={{ mt : 10}}>
            <Grid  size={{xs : 12, sm: 12, md : 8 }}>
                <Box  sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        fullWidth
                        name="role"
                        label="Role Name"
                        placeholder="Please key in role"
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
                </Box>
            </Grid>
        </Grid>
    </form>
  );
}

export default RoleForm;


