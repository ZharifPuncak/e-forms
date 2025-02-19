import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TextEditor } from "@/components/core/text-editor/text-editor";

import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Typography } from '@mui/material';

import dayjs from "dayjs";
import useAxios  from "@/hooks/use-axios";
import { useNavigate } from 'react-router-dom';

import { paths } from "@/paths";

const InfoForm = ({ item })  => {

  const { axiosGet, axiosMutate } = useAxios();
  const navigate = useNavigate();
  const theme = useTheme();
  const [initialValues,setInitialValues] = useState({
    name:  item?.name || '',
    alias: item?.alias || '',
    category: item?.category || '',
    descriptions: item?.descriptions || '',
    effective_from: item?.effective_from ? dayjs(effective_from) : null || null,
    effective_to: item?.effective_to ? dayjs(effective_from) : null || null,
  }); 

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(100).required("Name is required").label('Name'),
    alias: Yup.string().min(3).max(100).required("Alias is required").label('Alias'),
    category: Yup.object().required("Category is required").label('Category'),
    descriptions: Yup.string().max(3000).required("Description is required").label('Description'),
    effective_from : Yup.string().required("Effective from required").label('Effective from date'),
    effective_to :Yup.string().required("Effective to required").label('Effective to date'),
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
          await  mutate();  
        } 
    });

    const { isLoading, data : fetchedCategories, refetch   }  = axiosGet({  id : 'forms-categories', url : import.meta.env.VITE_API_BASE_URL + '/forms/categories', cacheTime : 3 * 60 * 1000, staleTime :  3 * 60 * 1000 });
    const { mutate, isLoading : updateLoading, isSuccess  } =  axiosMutate({ id: 'forms-store', method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/store', payload : {...values} });
  
    useEffect(() => {
      if(isSuccess){
        setTimeout(() =>{
          navigate(paths.dashboard.forms.list);
        },250)
      }
    },[isSuccess])

  return (
  <form onSubmit={handleSubmit}>

        <Grid container={true} sx={{ p : 1 }} spacing={4}  >
            <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
              <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Name </Typography>
              <TextField
                        fullWidth
                        name="name"
                        placeholder="Enter form name"
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.name}  
                        helperText={touched.name && errors.name} 
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
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Alias </Typography>
              <TextField
                        fullWidth
                        name="alias"
                        placeholder="Enter form alias"
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.alias}  
                        helperText={touched.alias && errors.alias} 
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
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Category </Typography>
              <Stack spacing={1}>
                 <Autocomplete

                  id="category"
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, 
                  }}
                  value={values.category}
                  name="category"
                  onChange={(e, v) => {
                    setFieldValue("category", v || '');
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue.id;
                  }}
                  getOptionLabel={(option) => option.name || ''}
                  options={fetchedCategories?.data?.categories ?? []}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Select form category"
                      helperText={touched.category && errors.category}   
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
          <Grid size={{xs : 12, sm: 6, md : 3 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Effective From </Typography>
            <DatePicker
                  sx={{ height : 45}}
                  minDate={dayjs()}
                  name="effective_from"  
                  format="DD/MM/YYYY"
                  onChange={(value) => {

                        setFieldValue("effective_from", value);
                        
                        if(values.effective_to && dayjs(value).format("DD/MM/YYYY") > dayjs(values.effective_to).format("DD/MM/YYYY")){
                          setFieldValue("effective_to", null);
                        }
                      
                    }}
                    slotProps={{ textField: { 
                      sx: {
                        height: "45px", // Adjust height
                        "& .MuiInputBase-root": { height: "100%" }, // Ensure full height
                        "& .MuiInputBase-input": { padding: "10px" }, // Adjust padding
                      },
                      placeholder: "Select date", fullWidth: true, variant : "outlined",
                      helperText: touched.effective_from && errors.effective_from, 
                      FormHelperTextProps: {
                        sx: {
                          color: touched.effective_from && errors.effective_from ? "#f05344" : "inherit", // ✅ Dynamic error color
                        },
                      },
                     
                    } }}
                    onBlur={handleBlur} 
                    value={values.effective_from}  
                 />
            </Grid>

            <Grid size={{xs : 12, sm: 6, md : 3 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Effective To </Typography>
            <DatePicker 
                    fullWidth
                    minDate={dayjs()}
                    format="DD/MM/YYYY"
                    name="effective_to"  
                    onChange={(value) => {
                          setFieldValue("effective_to", value);

                          if(values.effective_from && dayjs(value).format("DD/MM/YYYY") < dayjs(values.effective_from).format("DD/MM/YYYY")){
                            setFieldValue("effective_from", null);
                          }
                    }}
                    // minDate={moment().toDate()}  
                    slotProps={{ textField: { 
                      sx: {
                        height: "45px", // Adjust height
                        "& .MuiInputBase-root": { height: "100%" }, // Ensure full height
                        "& .MuiInputBase-input": { padding: "10px" }, // Adjust padding
                      },
                      placeholder: "Select date" ,  
                      fullWidth: true, variant : "outlined",
                      helperText: touched.effective_to && errors.effective_to, 
                      FormHelperTextProps: {
                        sx: {
                          color: touched.effective_to && errors.effective_to ? "#f05344" : "inherit", // ✅ Dynamic error color
                        },
                      },
                
                    } }}
                    onBlur={handleBlur} 
                    value={values.effective_to}  
                 />
            </Grid>


            
          	<Grid size={{xs : 12, sm: 12, md : 12 }}> 
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Description </Typography>
                  <TextEditor
                          rows={5}
                          content={""}
                          onUpdate={({ editor }) => {
                              setFieldValue('descriptions',editor.getText());
                          }}
                          placeholder="Description here..."
                  />
                    {errors.descriptions && <Typography variant="caption"  sx={{ ml: 0.5, mt: 0.5, display: "block", color : '#F05344' }}>
                      {errors.descriptions}
                    </Typography>}
					  </Grid>

            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" size='medium'  variant="contained">SUBMIT</Button>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default InfoForm;


