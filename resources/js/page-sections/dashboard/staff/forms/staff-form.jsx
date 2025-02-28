import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import  LoadingButton  from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Typography } from '@mui/material';

import useAxios  from "@/hooks/use-axios";

const StaffForm = ({ item }) => {

  const { axiosGet, axiosMutate } = useAxios();

  const theme = useTheme();
  const [initialValues,setInitialValues] = useState({
      id         : item?.id   || '',
      name       : item?.name || '',
      gender     : item?.gender ||'',
      email      : item?.email ||'',
      staffID    : item?.staffId ||'',
      staffIC    : item?.staffIcNo ||'',
      company    : item?.company ||'',
      department : item?.department ||'',
      position   : item?.position ||'',
      category   : item?.category ||'',
      grade      : item?.grade ||'',
      dateJoined : item?.dateJoined ? dayjs(item?.dateJoined) : null || null,
  }); 

  

  const validationSchema = Yup.object().shape({
      name: Yup.string().min(3).max(100).required("Name is required").label('Name'),
      gender: Yup.string().required("Gender is required").label('Gender'),
      email: Yup.string().email('Invalid email').required("Email is required").label('Email'),
      staffID: Yup.string().min(5).max(15).required("Staff ID is required").label('Staff ID'),
      staffIC: Yup.string().matches(/^\d{12}$/, "Staff IC must be exactly 12 digits").required("Staff IC is required").label('Staff IC'),
      company: Yup.object().required("Company is required").label('Company'),
      department : Yup.object().required("Department is required").label('Department'),
      position : Yup.object().required("Position is required").label('Position'),
      category : Yup.object().required("Category is required").label('Category'),
      grade : Yup.object().required("Grade is required").label('Grade'),
      dateJoined : Yup.string().required("Date joined required").label('Date joined'),
     
  });

  const {  data : fetchedCategories   }  = axiosGet({  id : 'shared-categories', url : import.meta.env.VITE_API_BASE_URL + '/shared/categories' });
  const {  data : fetchedCompanies   }  = axiosGet({  id : 'shared-companies', url : import.meta.env.VITE_API_BASE_URL + '/shared/companies' });
  const {  data : fetchedDepartments   }  = axiosGet({  id : 'shared-departments', url : import.meta.env.VITE_API_BASE_URL + '/shared/departments' });
  const {  data : fetchedPositions   }  = axiosGet({  id : 'shared-position', url : import.meta.env.VITE_API_BASE_URL + '/shared/positions' });
  const {  data : fetchedGrades   }  = axiosGet({  id : 'shared-grade', url : import.meta.env.VITE_API_BASE_URL + '/shared/grades' });
 

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

          if(item?.id){
            await updateStaff()
          }else{
            await createStaff();
          }
          
        } 
    });

  const { mutate : createStaff , isLoading : createLoading, isSuccess  } =  axiosMutate({ id: 'staffs-store', method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/staffs/store', payload : {...values, staffId : values.staffID, dateJoined : dayjs(values.dateJoined).format('YYYY-MM-DD')}});
  const { mutate : updateStaff , isLoading : updateLoading  } =  axiosMutate({ id: 'staffs-update', method : 'put', url : import.meta.env.VITE_API_BASE_URL + '/staffs/update', payload : {...values, staffId : values.staffID, dateJoined : dayjs(values.dateJoined).format('YYYY-MM-DD')}});

  useEffect(() => {
    if(isSuccess){
      resetForm()
    }
  },[isSuccess])

  return (
  <form onSubmit={handleSubmit}>

        <Grid container={true} spacing={2} sx={{ px : 1}}  >
        <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Name </Typography>
              <TextField
                        fullWidth
                        name="name"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.name}  
                        helperText={touched.name && errors.name} 
                        type={'text'}
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
                        }}
                    />
            </Grid>
            <Grid  size={{xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Gender </Typography>
              <Stack spacing={1}>
                 <Autocomplete

                  id="gender"
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, 
                  }}
                  value={values.gender}
                  name="gender"
                  onChange={(e, v) => {
                    setFieldValue("gender", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option === newValue;
                  }}
                  getOptionLabel={(option) => option || ''}
                  options={['M','F']}
                  renderInput={(params) => (
                    <TextField
                      placeholder=""
                      helperText={touched.gender && errors.gender}   
                         FormHelperTextProps={{
                          sx: { color: "#f05344" }, // ✅ Change helper text color
                        }}
                        {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                    
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                   
                      }}
                    />
                  )}
                />
              </Stack>         
          </Grid>
            <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Staff ID </Typography>
              <TextField
                        fullWidth
                        name="staffID"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.staffID}  
                        helperText={touched.staffID && errors.staffID} 
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
            </Grid>
            <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Staff IC </Typography>
              <TextField
                        fullWidth
                        name="staffIC"
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.staffIC}  
                        helperText={touched.staffIC && errors.staffIC} 
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
            </Grid>
          
            <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Email </Typography>
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
            </Grid>

          <Grid  size={{xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Company </Typography>
              <Stack spacing={1}>
                 <Autocomplete
          
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                    // "& .MuiInputLabel-root": { fontWeight: "bold" }, // Make label bold
                  }}
                  id="company"
                  value={values.company}
                  name="company"
                  onChange={(e, v) => {
                    setFieldValue("company", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option.code || ''}
                  options={fetchedCompanies?.data?.companies ?? []}
                  renderInput={(params) => (
                    <TextField
                      placeholder=""
                      helperText={touched.company && errors.company}    
                      FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}  
                      {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                        
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                   
                      }}
                    />
                  )}
                />
              </Stack>         
          </Grid>

          


          <Grid  size={{xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Department </Typography>
              <Stack spacing={1}>
                 <Autocomplete
          
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                    // "& .MuiInputLabel-root": { fontWeight: "bold" }, // Make label bold
                  }}
                  id="department"
                  value={values.department}
                  name="department"
                  onChange={(e, v) => {
                    setFieldValue("department", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option.name || ''}
                  options={fetchedDepartments?.data?.departments ?? []}
                  renderInput={(params) => (
                    <TextField
                      placeholder=""
                      FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}
                      helperText={touched.department && errors.department}  {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
              
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                   
                      }}
                    />
                  )}
                />
              </Stack>         
          </Grid>

          <Grid  size={{xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Category </Typography>
              <Stack spacing={1}>
                 <Autocomplete
          
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                    // "& .MuiInputLabel-root": { fontWeight: "bold" }, // Make label bold
                  }}
                  id="category"
                  value={values.category}
                  name="category"
                  onChange={(e, v) => {
                    setFieldValue("category", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option.name || ''}
                  options={fetchedCategories?.data?.categories}
                  renderInput={(params) => (
                    <TextField
                      placeholder=""
                      FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}
                      helperText={touched.category && errors.category}   {...params}     
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                  
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                   
                      }}
                    />
                  )}
                />
              </Stack>         
          </Grid>

          <Grid  size={{xs : 12, sm: 12, md : 6 }}>
          <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Position </Typography>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                  }}
                  id="position"
                  value={values.position}
                  name="position"
                  onChange={(e, v) => {
                    setFieldValue("position", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  options={fetchedPositions?.data?.positions ?? []}
                  renderInput={(params) => (
                    <TextField
                       placeholder=""
                       FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}
                    helperText={touched.position && errors.position}   {...params}  
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                 
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                   
                      }}
                    />
                  )}
                />
              </Stack>         
            </Grid>

         <Grid  size={{xs : 12, sm: 12, md : 6 }}>
          <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Grade </Typography>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, // Adjust input height
                  }}
                  id="grade"
                  value={values.grade}
                  name="grade"
                  onChange={(e, v) => {
                    setFieldValue("grade", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  options={fetchedGrades?.data?.grades ?? []}
                  renderInput={(params) => (
                    <TextField
                       placeholder=""
                       FormHelperTextProps={{
                        sx: { color: "#f05344" }, // ✅ Change helper text color
                      }}
                    helperText={touched.grade && errors.grade}   {...params}  
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                 
                        "& .MuiInputBase-input::placeholder": {
                          color: "grey", // Change placeholder color
                          fontSize: "14px", // Custom font size
                          opacity : 0.9
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,

                      }}
                    />
                  )}
                />
              </Stack>         
            </Grid>


            <Grid size={{xs : 12, sm: 6, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Date Joined </Typography>
            <DatePicker
                  sx={{ height : 45}}
          
                  name="dateJoined"  
                  format="DD/MM/YYYY"
                  onChange={(value) => {

                        setFieldValue("dateJoined", value);
                        
                 
                      
                    }}
                    slotProps={{ textField: { 
                      sx: {
                        height: "45px", // Adjust height
                        "& .MuiInputBase-root": { height: "100%" }, // Ensure full height
                        "& .MuiInputBase-input": { padding: "10px" }, // Adjust padding
                      },
                      placeholder: "", fullWidth: true, variant : "outlined",
                      helperText: touched.dateJoined && errors.dateJoined, 
                      FormHelperTextProps: {
                        sx: {
                          color: touched.dateJoined && errors.dateJoined ? "#f05344" : "inherit", // ✅ Dynamic error color
                        },
                      },
                     
                    } }}
                    onBlur={handleBlur} 
                    value={values.dateJoined}  
                 />
            </Grid>

            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton loading={createLoading || updateLoading} type="submit" variant="contained">SUBMIT</LoadingButton>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default StaffForm;


