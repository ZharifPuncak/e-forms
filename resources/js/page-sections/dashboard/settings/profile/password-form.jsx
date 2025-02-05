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
				<Stack spacing={3}>
					<Stack spacing={3}>
						<FormControl>
							    <TextField
								    label='Old Password'
									fullWidth
									name="name"
									placeholder=""
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
										},
									}}
								/>
						</FormControl>
						<FormControl>
							<TextField
							    label='New Password'
								fullWidth
								name="name"
								placeholder=""
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
									},
								}}
							/>
						</FormControl>
						<FormControl>
								<TextField
								 label='Confirm Password'
								fullWidth
								name="name"
								placeholder=""
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
									},
								}}
							/>
						</FormControl>
					</Stack>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<Button size='small' variant="outlined">UPDATE</Button>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}
