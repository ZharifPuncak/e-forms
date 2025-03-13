import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import { RouterLink } from "@/components/core/link";
 
import { CenteredLayout } from "./components/centered-layout";
import { DynamicLogo } from "@/components/core/logo";

import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import useAxios  from "@/hooks/use-axios";
import * as Yup from 'yup';

import { useFormik } from 'formik';
import { toast } from 'sonner';
import { paths } from "@/paths";


export function ResetPassword() {

    const [isSent,setIsSent] = React.useState(false);
    const [isButtonEnabled,setIsButtonEnabled] = React.useState(true);

    const [isError,setIsError] = React.useState(false);
    const [errMessage,setErrMessage] = React.useState('');
    const navigate = useNavigate();
    const { axiosMutate } = useAxios();

    const [initialValues,setInitialValues] = React.useState({
        staffIcNo :  '',
    }); 

    const validationSchema = Yup.object().shape({
        staffIcNo: Yup.string().matches(/^\d+$/, "Staff IC must be a valid number").length(12, "Staff IC must be exactly 12 digits").required('Staff IC is required'),
    });


      const {
            errors,
            values,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
      } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
          try {
              await resetForm();
          } catch (error) {

            toast(error?.message,{
                style: {
                  background: 'red',
                  color: 'white'
                },
              });
          }
        }
      });
    
      const { mutate : resetForm, isLoading : resetLoading, isSuccess : resetSuccess  } =  axiosMutate({ id: 'reset-password', method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/password/reset', payload : { staff_ic_no : values.staffIcNo } });
      
      React.useEffect(() => {
        if(resetSuccess){
            setIsButtonEnabled(false);
            setIsSent(true);
            setTimeout(() => {
                setIsButtonEnabled(true);
            },10000)
        }
      },[resetSuccess])

    return (
        <React.Fragment>
            <CenteredLayout>
             <Box>
                <form onSubmit={handleSubmit}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb : 2}}> 
                    <Box onClick={() => {
						        navigate('/');
					    }}  sx={{ display: "inline-block", fontSize: 0 }}>
                        <DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
                    </Box>
                    
                    <Stack sx={{ mt  : 1, mb : 4  }} spacing={1}>
                        <Typography variant="h5">Reset Password</Typography>
                        <Typography sx={{ mt : -1, fontSize : '18px' }} color="text.secondary" variant="caption">
                            e-FORMS MANAGEMENT SYSTEM
                        </Typography>
                    </Stack>
                </Stack>
                
        
                    <Stack sx={{ p : 2}} spacing={4}>

                        
                        {isSent ? <Box>
                            If an email exists associated with staff IC  <strong>{values?.staffIcNo}</strong>, you will receive a recovery email.
                        </Box> :

                        <Box>
                            Submit your Staff IC below and we will email you a password reset link associated with your Staff IC.
                        </Box> }
               
                        <Stack spacing={2}>
                       {!isSent &&  <FormControl>
                                    <InputLabel sx={{ mb : 0.5 }}>Staff IC</InputLabel>
                                    <TextField 
                                        autoComplete='off'
                                        fullWidth  
                                        placeholder='' 
                                        inputProps={{ maxLength: 12 }}
                                        type="text" 
                                        name="staffIcNo"
                                        
                                        onBlur={handleBlur} 
                                        onChange={handleChange} 
                                        value={values.staffIcNo}  
                                        helperText={touched.staffIcNo && errors.staffIcNo} 
                                    
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
                                
                                        }} />


                            </FormControl>}
                      
                            {isError && <Alert severity="error">{ errMessage }</Alert>}
                            <div >
                          
                            <LoadingButton disabled={isSent && !isButtonEnabled} sx={{ letterSpacing : '1px' }} onClick={handleSubmit} fullWidth  loading={resetLoading} type="submit" variant="contained" >
                               { !isSent ? 'Email Password Reset Link' : 'Resend' } 
                            </LoadingButton>

                            
                            {!isButtonEnabled && <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Typography sx={{ mt : 1 }} variant='caption'>
                                    Wait a few seconds, before you can try to resend again.
                                </Typography>
                            </Box>}
                       

                            </div>
                     
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography variant="caption">© ICTD Puncak Niaga Management Services Sdn. Bhd. </Typography>
                            </Box>
                        </Stack>
                    
                    </Stack>
                
                </form>
                </Box>
            </CenteredLayout>
        </React.Fragment>
    );
}
