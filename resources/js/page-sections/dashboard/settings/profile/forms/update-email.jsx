import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import  LoadingButton  from "@mui/lab/LoadingButton";


import * as Yup from "yup";
import { useFormik } from "formik";
import useAxios  from "@/hooks/use-axios";
import { Grid } from "@mui/system";

import { useAppContext } from "@/contexts/app-context";
import useAuth from "@/hooks/use-auth";

export function UpdateEmail() {

	  const appContext = useAppContext();
	  const { profile, logout } = useAuth();
	  const {  axiosMutate } = useAxios();
	  const [ initialValues, setInitialValues ] = React.useState({
			email:  '',
	  }); 
	
	  const validationSchema = Yup.object().shape({
			email: Yup.string().email().required("Email is required").label('Email'),
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

	const { mutate, isLoading : updateLoading, data : fetchedData, isSuccess  } =  axiosMutate({ id: 'email-update', method : 'put', url : import.meta.env.VITE_API_BASE_URL + '/email/update', payload : {...values} });


	React.useEffect(() => {

		if(isSuccess){

			// Update user auth email
			profile(fetchedData?.user);

			// Reset form
			resetForm();

			// Close Modal
			appContext.setParentDialog({ title : '', subtitle : '', component : null, isOpen : false});
		}
	},[isSuccess])

	return (

		        <form onSubmit={handleSubmit}>
						<Grid sx={{ py : 2 }} container={true} spacing={2}  >
        		  		  <Grid   size={{ xs : 12, sm: 12, md : 12 }}>
						
							<Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Email</Typography>
							    <TextField
									fullWidth
									name="email"
									placeholder=""
									autoComplete="off"
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.email}  
									helperText={touched.email && errors.email} 
									FormHelperTextProps={{
										sx: { color: "#f05344" }, // ✅ Change helper text color
									  }}
									type={'text'}
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
										<LoadingButton sx={{ mr : 1 }} disabled={updateLoading} onClick={() => {
											logout();
										}} variant="outlined">Cancel</LoadingButton>
										<LoadingButton loading={updateLoading} type="submit" variant="outlined">Update</LoadingButton>
									</Box>
							</Grid>
					</Grid>
					</form>
		
	);
}
