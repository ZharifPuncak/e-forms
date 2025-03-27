import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl  from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppContext } from "@/contexts/app-context";


import * as Yup from "yup";
import { useFormik } from "formik";
import { Typography } from '@mui/material';


import useAxios  from "@/hooks/use-axios";


const CloseForm = ({ code, update })  => {

  const appContext = useAppContext(); 
  const { axiosMutate } = useAxios();
  const [initialValues,setInitialValues] = useState({
    code : code ,
    remarks: '',
    reason: ''  
  }); 

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required").label('Reason'),
    remarks: Yup.string().min(3).max(100).when("reason", (reason, schema) => {
      if(reason == 'cancelled')
        return schema.required("Remarks required")
      return schema
    }).label('Remarks'),
   
  });

  const {
        values,
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        touched,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => { 

           closeForm();
        } 
    });

  const { mutate : closeForm , isLoading : submitLoading, isSuccess  } =  axiosMutate({ id: 'forms-close', method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/close', payload : {...values } });


  useEffect(() => {
    if(isSuccess){
      update();
      appContext.setDialog({ title : '', subtitle : '', isOpen : false, component : null});
   
    }
  },[isSuccess]);

  return (
  <form onSubmit={handleSubmit}>

        <Grid container={true} sx={{ p : 1 }} spacing={2}  >
 
           
          <Grid  size={{xs : 12, sm: 12, md : 12 }}>
          <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Reason  </Typography>
           <FormControl component="fieldset" error={touched.reason && !!errors.reason} >
              <RadioGroup
                aria-labelledby="reason"
                name="reason" 
                value={values.reason} 
                onChange={handleChange}
              >
                <FormControlLabel sx={{ mb : 2 }} value="incompleted" control={<Radio size='small' />} label={<Typography variant='body2'>End form  <br></br><small>Acknowledgement status will be incompleted.</small></Typography>} />
                <FormControlLabel value="cancelled" control={<Radio size='small' />} label={<Typography variant='body2'>Cancel form  <br></br><small>Acknowledgement status will be cancelled.</small></Typography>} />
              </RadioGroup>
            </FormControl>
            <FormHelperText sx={{ color : '#f26558'}}>
              { errors.reason }
            </FormHelperText>
          </Grid>
          {values.reason == 'cancelled' && <Grid  size={{ xs : 12, sm: 12, md : 12 }}>
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Remarks </Typography>
              <TextField
                        fullWidth
                        name="remarks"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.remarks}  
                        helperText={touched.remarks && errors.remarks} 
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
            </Grid>}
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton loading={submitLoading} type="submit" size='medium'  variant="outlined">SUBMIT</LoadingButton>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default CloseForm;


