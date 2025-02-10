import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import * as Yup from "yup";
import { useFormik } from "formik";
import { Grid } from "@mui/system";




export function PasswordForm() {


	const [initialValues,setInitialValues] = React.useState({
		password:  '',
		new_password : '',
		confirm_new_password: '',
	  }); 
	
	  const validationSchema = Yup.object().shape({
		password: Yup.string().min(3).max(255).required("Password is required").label('Password'),
		new_password: Yup.string().min(3).required("New password is required").label('New Password'),
		confirm_new_password: Yup.array().required("Password is required").label('Password'),
		
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
		<Card>
			<CardHeader
				title="Change password"
			/>
			<CardContent>
						<Grid container={true} spacing={4}  >
        		  		  <Grid   size={{ xs : 12, sm: 12, md : 12 }}>
						
								<Chip sx={{ mb : 1 }} label='Old password' color='soft'/>
							    <TextField
									fullWidth
									name="name"
									placeholder="Enter old password"
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
												fontSize: '0.8rem',  // Adjust size here
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
							<Chip sx={{ mb : 1 }} label='New password' color='soft'/>
							<TextField
								fullWidth
								name="name"
								placeholder="Enter new password"
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
											fontSize: '0.8rem',  // Adjust size here
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
								<Chip sx={{ mb : 1 }} label='Confirm password'  color='soft'/>
								<TextField
								fullWidth
								name="name"
								placeholder="Enter confirm password"
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
											fontSize: '0.8rem',  // Adjust size here
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
								<Button  variant="contained">UPDATE</Button>
							</Box>
					  </Grid>
					</Grid>
			</CardContent>
		</Card>
	);
}
