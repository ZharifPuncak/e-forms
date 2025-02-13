import { useState  } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import * as Yup from "yup";
import { useFormik } from "formik";
import { useMediaQuery } from "@/hooks/use-media-query";

const RoleForm = ({ props })  => {
   
  const [isSubmit,setIsSubmit] = useState(false);
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
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Role </Typography>
                <Box  sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                 
                    <TextField
                        fullWidth
                        name="role"
                     
                        placeholder="Enter Role"
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
                              fontSize: '14px',  // Adjust size here
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
                </Box>
            </Grid>
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size='small' variant="contained" >SUBMIT</Button>
              </Box>
            </Grid>
          </Grid>
       
    </form>
  );
}

export default RoleForm;


