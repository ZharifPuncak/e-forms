import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ButtonBase from '@mui/material/ButtonBase';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';


import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { CenteredLayout } from "./components/centered-layout";
import { DynamicLogo } from "@/components/core/logo";


import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';

import { useFormik } from 'formik';
import useAuth from "@/hooks/use-auth";
import { toast } from 'sonner';
import { useLongPress } from 'use-long-press';

const metadata = { title: `${appConfig.name}` };

export function SignInAdmin() {

	const  { login, user } = useAuth();
	const [isError,setIsError] = React.useState(false);
	const [errMessage,setErrMessage] = React.useState('');
	const [showPassword, setShowPassword] = React.useState(false);
	const [isLoading,setIsLoading] = React.useState(false);
	const navigate = useNavigate();

	const bind = useLongPress(() => {
		navigate('/auth/sign-in');
	  },{ threshold: 1200 });

	const [initialValues,setInitialValues] = React.useState({
		email :  '',
		password    : '',		
	}); 

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required').label('Email'),
		password:  Yup.string().required('Password is required').label('Password')
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

		    
			setIsLoading(true);
			await login( values.email,values.password, 'admin');
			navigate(0);


		  } catch (error) {

		
			setIsLoading(false);
			toast(error?.message,{
				style: {
				  background: 'red',
				  color: 'white'
				},
			  });
		  }
		}
	  });
	
	

	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<CenteredLayout>
				<Box>
				<form onSubmit={handleSubmit}>
				<Stack direction="row" alignItems="center" spacing={2} sx={{ mb : 2}}> 
			    	<Box {...bind()} sx={{ display: "inline-block", fontSize: 0 }}>
						<DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
					</Box>
					
					<Stack sx={{ mt  : 1, mb : 4  }} spacing={1}>
						<Typography variant="h5">Sign in</Typography>
						<Typography sx={{ mt : -1, fontSize : '18px' }} color="text.secondary" variant="caption">
							 e-FORM MANAGEMENT SYSTEM
						</Typography>
					</Stack>
				</Stack>
				
		
					<Stack sx={{ p : 2}} spacing={4}>
			
						<Stack spacing={2}>
						<FormControl>
									<InputLabel sx={{ mb : 0.3 }}>Email</InputLabel>
									<TextField 
									    autoComplete='off'
										fullWidth 
										placeholder='' 
										type="email" 
										name="email"
										autoFocus
										onBlur={handleBlur} 
										onChange={handleChange} 
										value={values.email}  
										helperText={touched.email && errors.email} 
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


							</FormControl>
							<FormControl>
									<InputLabel sx={{ mb : 0.3 }}>Password</InputLabel>
									<TextField fullWidth  type={showPassword ? 'text' : 'password'} name="password"
									autoComplete="off"
									placeholder='' 
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.password}  
									helperText={touched.password && errors.password} 
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
									endAdornment: <ButtonBase disableRipple disableTouchRipple onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
											</ButtonBase>
									}} />


							</FormControl>
							{isError && <Alert severity="error">{ errMessage }</Alert>}
							<div >
							<LoadingButton color="secondary" sx={{ letterSpacing : '1.2px' }} onClick={handleSubmit} fullWidth  loading={isLoading} type="submit" variant="contained" >
								SIGN IN
							</LoadingButton>

							</div>
						</Stack>
					
					</Stack>
				
				</form>
				</Box>
			</CenteredLayout>
		</React.Fragment>
	);
}
