import { useState  } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import * as Yup from "yup";
import { useFormik } from "formik";
import { useMediaQuery } from "@/hooks/use-media-query";

const RoleForm = ({ props })  => {

  const mdDown = useMediaQuery("down", "md");
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
        <Grid container={true} spacing={2}>
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
                <Box  sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        fullWidth
                        name="role"
                        label="Role"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.role}  
                        helperText={errors.role} 
                        error={Boolean(errors.role)} 
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
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size='small' variant="outlined">SUBMIT</Button>
              </Box>
            </Grid>
          </Grid>
       
    </form>
  );
}

export default RoleForm;


