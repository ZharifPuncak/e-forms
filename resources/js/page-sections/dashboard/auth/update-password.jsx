import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
 
import { CenteredLayout } from "./components/centered-layout";
import { DynamicLogo } from "@/components/core/logo";

import { useNavigate,useSearchParams } from "react-router-dom";
import useAxios  from "@/hooks/use-axios";
import * as Yup from 'yup';

import { useFormik } from 'formik';
import { toast } from 'sonner';
import { paths } from "@/paths";

export function UpdatePassword() {
  
    const navigate = useNavigate();
    const { axiosMutate } = useAxios();

    // Extract token & email from URL
    const [searchParams] = useSearchParams();

    // Extract token & email from URL
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    React.useEffect(() => {

        if(!token && !email){
            navigate(paths.auth.resetPassword)
        }
        

    },[token, email]);
    const [initialValues,setInitialValues] = React.useState({
        password : '',
        password_confirmation :'',
    }); 

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6).required("Password is required").label('Password'),
        password_confirmation: Yup.string().oneOf([Yup.ref("password"), null], "Does not match new password").min(6).required("Confirm password is required").label('Confirm Password'),
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
       
              await updatePassword();
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
    
      const { mutate : updatePassword, isLoading : updatePasswordLoading, isSuccess : updatePasswordSuccess  } =  axiosMutate({ id: 'update-reset-password' + token, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/password/reset/update', payload : { ...values, token , email  } });
      
      React.useEffect(() => {
        if(updatePasswordSuccess){
            setTimeout(() => {
                navigate(paths.auth.signIn);
            },350)
        }
      },[updatePasswordSuccess])

    return (
        <React.Fragment>
            <CenteredLayout>
             <Box>
                <form onSubmit={handleSubmit}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb : 2}}> 
                    <Box onClick={() => {
                          navigate('/');
                        }}   sx={{ display: "inline-block", fontSize: 0 }}>
                        <DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
                    </Box>
                    
                    <Stack sx={{ mt  : 1, mb : 4  }} spacing={1}>
                        <Typography variant="h5">Update Password</Typography>
                        <Typography sx={{ mt : -1, fontSize : '18px' }} color="text.secondary" variant="caption">
                            e-FORMS MANAGEMENT SYSTEM
                        </Typography>
                    </Stack>
                </Stack>
                
        
                    <Stack sx={{ p : 2}} spacing={4}>

                  
               
                        <Stack spacing={2}>
                             <FormControl>
                                <InputLabel sx={{ mb : 0.5 }}>Password</InputLabel>
							    <TextField
									fullWidth
									name="password"
									placeholder=""
									autoComplete="off"
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.password}  
									helperText={touched.password && errors.password} 
									FormHelperTextProps={{
										sx: { color: "#f05344" }, // ✅ Change helper text color
									  }}
									type={'password'}
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
                            </FormControl>
                            <FormControl>
                                <InputLabel sx={{ mb : 0.5 }}>Confirm Password</InputLabel>
                             
							    <TextField
									fullWidth
									name="password_confirmation"
									placeholder=""
									autoComplete="off"
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.password_confirmation}  
									helperText={touched.password_confirmation && errors.password_confirmation} 
									FormHelperTextProps={{
										sx: { color: "#f05344" }, // ✅ Change helper text color
									  }}
									type={'password'}
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
                            </FormControl>
                            <div>
                                <LoadingButton  sx={{ letterSpacing : '1px' }} onClick={handleSubmit} fullWidth  loading={updatePasswordLoading} type="submit" variant="contained" >
                                    Update Password
                                </LoadingButton>
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
