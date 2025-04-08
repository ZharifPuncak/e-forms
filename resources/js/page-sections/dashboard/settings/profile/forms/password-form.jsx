import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import  LoadingButton  from "@mui/lab/LoadingButton";


import * as Yup from "yup";
import { useFormik } from "formik";
import useAxios  from "@/hooks/use-axios";
import { Grid } from "@mui/system";



export function PasswordForm() {

	const {  axiosMutate } = useAxios();
	const [initialValues,setInitialValues] = React.useState({
			password:  '',
			new_password : '',
			confirm_new_password: '',
	  }); 
	
	  const validationSchema = Yup.object().shape({
			password: Yup.string().min(6).required("Password is required").label('Password'),
			new_password: Yup.string().min(6).required("New password is required").label('New Password'),
			confirm_new_password: Yup.string().oneOf([Yup.ref("new_password"), null], "Does not match new password").min(6).required("Confirm Password is required").label('Confirm Password'),
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
		mutate();
     } 
    });

	const { mutate, isLoading : updateLoading, isSuccess  } =  axiosMutate({ id: 'profile-update', method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/password/update', payload : {...values} });


	React.useEffect(() => {
		if(isSuccess){
			resetForm();
		}
	},[isSuccess])

	return (
		<Card>
			<CardHeader
				title={'Change Password'}
			/>
			<CardContent>
		        	<form onSubmit={handleSubmit}>
						<Grid container={true} spacing={2}  >
        		  		  <Grid   size={{ xs : 12, sm: 12, md : 6 }}>
						
							<Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Old Password </Typography>
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
				    	  </Grid>
						  <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
						  <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >New Password </Typography>
							<TextField
								fullWidth
								name="new_password"
								placeholder=""
								autoComplete="off"
								onBlur={handleBlur} 
								onChange={handleChange} 
								value={values.new_password}  
								helperText={touched.new_password && errors.new_password} 
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
					     </Grid>
						 <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
						 <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Confirm Password </Typography>
								<TextField
								fullWidth
								name="confirm_new_password"
								placeholder=""
								autoComplete="off"
								onBlur={handleBlur} 
								onChange={handleChange} 
								value={values.confirm_new_password}  
								helperText={touched.confirm_new_password && errors.confirm_new_password} 
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
				      </Grid>
					   <Grid  size={{ xs : 12, sm: 12, md : 12 }}>
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
								<LoadingButton loading={updateLoading} type="submit" variant="outlined">UPDATE</LoadingButton>
							</Box>
					  </Grid>
					</Grid>
					</form>
			</CardContent>
		</Card>
	);
}
