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
import LoadingButton from '@mui/lab/LoadingButton';

import dayjs from "dayjs";
import useAxios  from "@/hooks/use-axios";
import { useAppContext } from "@/contexts/app-context";


const InfoForm = ({ item, update })  => {

  const { axiosGet, axiosMutate } = useAxios();
  const appContext = useAppContext(); 
  const theme = useTheme();
  const [indexUI,setIndexUI] = useState(0);
  const [initialValues,setInitialValues] = useState({
    id : item?.id || '',
    name:  item?.name || '',
    alias: item?.alias || '',
    category: item?.category || '',
    descriptions: item?.descriptions || '',
    effective_from: item?.effective_from ? dayjs(item?.effective_from) : null || null,
    effective_to: item?.effective_to ? dayjs(item?.effective_to) : null || null,
  }); 

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(100).required("Name is required").label('Name'),
    alias: Yup.string().min(3).max(100).required("Alias is required").label('Alias'),
    category: Yup.object().required("Category is required").label('Category'),
    descriptions: Yup.string().max(3000).required("Description is required").label('Description'),
    effective_from : Yup.string().required("Effective from required").label('Effective from date'),
    effective_to :Yup.string().required("Effective to required").test("is-after-two-days", "Effective to must be at least 1 gap days after effective from", (value, context) => {
          
          const effectiveFrom = dayjs(context.parent.effective_from);
          return dayjs(value).isAfter(effectiveFrom.add(1, "day"), "day");

      }).label('Effective to date'),
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

       
          if(!item?.id){
            await  createForm();  
          }else{
            await updateForm();
          }
        
        } 
    });

    const { isLoading, data : fetchedCategories, refetch   }  = axiosGet({  id : 'forms-categories', url : import.meta.env.VITE_API_BASE_URL + '/forms/categories', cacheTime : 1 * 60 * 1000, staleTime :  1 * 60 * 1000 });
    const { mutate : createForm , isLoading : submitLoading, isSuccess  } =  axiosMutate({ id: 'forms-store', method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/store', payload : {...values,  effective_from : dayjs(values.effective_from).format('YYYY-MM-DD'),effective_to : dayjs(values.effective_to).format('YYYY-MM-DD')} });
    const { mutate : updateForm, isLoading : updateLoading, isSuccess : updateSuccess  } =  axiosMutate({ id: 'forms-update' + item?.id, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/update', payload : {...values, effective_from : dayjs(values.effective_from).format('YYYY-MM-DD'),effective_to : dayjs(values.effective_to).format('YYYY-MM-DD')} });
  
   useEffect(() => {
      if(isSuccess){
         resetForm();
         setIndexUI(Date.now());
      }
   },[isSuccess])


   useEffect(() => {
      if(updateSuccess){
        update();
        appContext.setDialog({ title : '', subtitle : '', isOpen : false, component : null});
      }
   },[updateSuccess])

  return (
  <form onSubmit={handleSubmit}>

        <Grid container={true} sx={{ p : 1 }} spacing={2}  >
 
            <Grid  size={{ xs : 12, sm: 12, md : 6 }}>
              <Typography variant='body2' sx={{ fontWeight : 500, mb : 0.5, ml : 0.5 }} >Name </Typography>
              <TextField
                        fullWidth
                        name="name"
                        placeholder=""
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
            <Typography variant='body2' sx={{ fontWeight : 500, mb : 0.5, ml : 0.5 }} >Alias </Typography>
              <TextField
                        fullWidth
                        name="alias"
                        placeholder=""
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
            <Typography variant='body2' sx={{ fontWeight : 500, mb : 0.5, ml : 0.5 }} >Category </Typography>
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
                      placeholder=""
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
            <Typography variant='body2' sx={{ fontWeight : 500, mb : 0.5, ml : 0.5 }} >Effective From </Typography>
            <DatePicker
                  sx={{ height : 45}}
                  minDate={item?.id ? dayjs(item?.effective_from)  : dayjs()}
                  name="effective_from"  
                  format="DD/MM/YYYY"
                  onChange={(value) => {

                        setFieldValue("effective_from", value);
                        
                        if(values.effective_to && dayjs(value) > dayjs(values.effective_to)){
                          setFieldValue("effective_to", null);
                        }
                      
                    }}
                    slotProps={{ textField: { 
                      sx: {
                        height: "45px", // Adjust height
                        "& .MuiInputBase-root": { height: "100%" }, // Ensure full height
                        "& .MuiInputBase-input": { padding: "10px" }, // Adjust padding
                      },
                      placeholder: "", fullWidth: true, variant : "outlined",
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
            <Typography variant='body2' sx={{ fontWeight : 500, mb : 0.5, ml : 0.5 }} >Effective To </Typography>
            <DatePicker 
                    fullWidth
                    minDate={item?.id ? dayjs(item?.effective_from)  : dayjs()}
                    format="DD/MM/YYYY"
                    name="effective_to"  
                    onChange={(value) => {
                          setFieldValue("effective_to",value);

                          if(values.effective_from && dayjs(value) < dayjs(values.effective_from)){
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
                      placeholder: "" ,  
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
            <Typography variant='body2' sx={{ fontWeight : 500, mb : 0.5, ml : 0.5 }} >Description </Typography>
                  <TextEditor
                          key={indexUI}
                          rows={5}
                          content={values.descriptions}
                          onUpdate={({ editor }) => {
                              setFieldValue('descriptions',editor.getHTML());
                          }}
                          placeholder=""
                  />
                    {errors.descriptions && touched.descriptions && <Typography variant="caption"  sx={{ ml: 0.5, mt: 0.5, display: "block", color : '#F05344' }}>
                      {errors.descriptions}
                    </Typography>}
					  </Grid>

            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton loading={submitLoading || updateLoading} type="submit" size='medium'  variant="outlined">SUBMIT</LoadingButton>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default InfoForm;


