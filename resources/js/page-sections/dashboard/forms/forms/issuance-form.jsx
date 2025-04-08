import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';

import Stack  from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';


import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import dayjs from "dayjs";
import useAxios  from "@/hooks/use-axios";
import _ from 'lodash';
import { useAppContext } from "@/contexts/app-context";


const IssuanceForm = ({ item, update, code, end, loadedCompanies })  => {



  const { axiosMutate } = useAxios();
  const appContext = useAppContext(); 
  const theme = useTheme();
  const [formattedCompanies,setFormattedCompanies] = useState([]);

  const [initialValues,setInitialValues] = useState({
    id : item?.id || '',
    companies: item?.companies || [],
    issued_at: item?.issued_at ? dayjs(item?.issued_at) : null || null,
    deadlined_at: item?.deadlined_at ? dayjs(item?.deadlined_at) : null || null,
  }); 

  const validationSchema = Yup.object().shape({

    companies: Yup.array().min(1, 'At least one company required').required("Company is required").label('Company'),
    issued_at : Yup.string().required("Issue date required").test("is-before-one-days", "Issued date must be at least 1 day before form effective end date", (value, context) => {
  
      return dayjs(value).isBefore(dayjs(end).subtract(1, "day"), "day");

   }).label('Issued at date'),
    deadlined_at :Yup.string().required("Deadline date required").test("is-after-one-days", "Deadline date must be at least 1 day after Issued date", (value, context) => {
    
      const issuedAt = dayjs(context.parent.issued_at);
       return dayjs(value).isAfter(issuedAt, "day");

    }).test("is-before-one-day", "Deadline must be at least 1 day before form effective end date", (value, context) => {
  
       return dayjs(value).isBefore(dayjs(end), "day");
    }).label('Deadlined at date'),
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
            await  createIssuance();  
          }else{
            await updateIssuance();
          }
        
        } 
    });

    const { mutate : createIssuance , isLoading : submitLoading, isSuccess  } =  axiosMutate({ id: 'issuance-store' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/store', payload : {...values, code ,issued_at : dayjs(values.issued_at).format('YYYY-MM-DD'),deadlined_at : dayjs(values.deadlined_at).format('YYYY-MM-DD')} });
    const { mutate : updateIssuance, isLoading : updateLoading, isSuccess : updateSuccess  } =  axiosMutate({ id: 'forms-update' + item?.id, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/issuances/update', payload : {...values,  code,  issued_at : dayjs(values.issued_at).format('YYYY-MM-DD'),deadlined_at : dayjs(values.deadlined_at).format('YYYY-MM-DD')} });
   
   useEffect(() => {
      if(isSuccess){
         resetForm();
         update();
         appContext.setDialog({ title : '', subtitle : '', component : '', isOpen : false});
      }
   },[isSuccess])


   useEffect(() => {
      if(updateSuccess || updateSuccess){
          update();
      }
   },[updateSuccess, updateSuccess])


   useEffect(() => {

        if(item?.id){
          setFormattedCompanies([...item?.companies,...loadedCompanies]);
        }else{
          setFormattedCompanies([...loadedCompanies]);
        }
       
      
   },[item?.companies,loadedCompanies])

  return (
  <form onSubmit={handleSubmit}>

        <Grid container={true} sx={{ p : 1 }} spacing={4}  >
         <Grid  size={{xs : 12, sm: 12, md : 12 }}>

            <Card sx={{ borderRadius : '0px'}}>
              <Box sx={{ px : 1, pt : 1}}>
                   <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Info </Typography>
              </Box>
              <ol>
                 <li style={{ marginBottom : '20px'}}><Chip size='small' color='soft' label="Issue Date" /><Box sx={{ mt : 0.5 , ml: 1.5 }}><Typography variant='body2'> The form  will be issued at selected date with annoucement notification.</Typography></Box> </li>
                 <li><Chip  size='small' color='soft' label="Deadline Date" /><Box sx={{ mt : 0.5, ml : 1.5 }}><Typography variant='body2'>  The reminder notification will be sent to employee on deadline date.</Typography> </Box></li>
              </ol>
            </Card>
                      
          </Grid> 
            <Grid  size={{xs : 12, sm: 12, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Company </Typography>
              <Stack spacing={1}>
                 <Autocomplete
                  multiple
                  freeSolo
                  id="companies"
                  sx={{
                    "& .MuiInputBase-root": { height: 45 }, 
                  }}
                  value={values.companies}
                  name="companies"
                  onChange={(e, v) => {
                    setFieldValue("companies", v || []);
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue.id;
                  }}
                  getOptionLabel={(option) => option.code || ''}
                  options={formattedCompanies ?? []}
                  renderInput={(params) => (
                    <TextField
                      placeholder={_.isEmpty(values?.companies) ? "" : ''}
                      helperText={touched.companies && errors.companies}   
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
                        style: { height: 'auto',minHeight : '45px' },
                      }}
                    />
                  )}
                />
              </Stack>         
          </Grid>
          <Grid size={{xs : 12, sm: 6, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Issue Date </Typography>
            <DatePicker
                  sx={{ height : 45}}
                  minDate={item?.id ? dayjs(item?.issued_at)  : dayjs()}
                  name="issued_at"  
                  format="DD/MM/YYYY"
                  onChange={(value) => {

                        setFieldValue("issued_at", value);
                        
                        if(values.deadlined_at && dayjs(value) > dayjs(values.deadlined_at)){
                          setFieldValue("deadlined_at", null);
                        }
                      
                    }}
                    slotProps={{ textField: { 
                      sx: {
                        height: "45px", // Adjust height
                        "& .MuiInputBase-root": { height: "100%" }, // Ensure full height
                        "& .MuiInputBase-input": { padding: "10px" }, // Adjust padding
                      },
                      placeholder: "", fullWidth: true, variant : "outlined",
                      helperText: touched.issued_at && errors.issued_at, 
                      FormHelperTextProps: {
                        sx: {
                          color: touched.issued_at && errors.issued_at ? "#f05344" : "inherit", // ✅ Dynamic error color
                        },
                      },
                     
                    } }}
                    onBlur={handleBlur} 
                    value={values.issued_at}  
                 />
            </Grid>

            <Grid size={{xs : 12, sm: 6, md : 6 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Deadline Date </Typography>
            <DatePicker 
                    fullWidth
                    minDate={values?.issued_at ? dayjs(values?.issued_at).add(1,'day')  : dayjs()}
                    format="DD/MM/YYYY"
                    name="deadlined_at"  
                    onChange={(value) => {
                          setFieldValue("deadlined_at",value);

                          if(values.issued_at && dayjs(value) < dayjs(values.issued_at)){
                             setFieldValue("issued_at", null);
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
                      helperText: touched.deadlined_at && errors.deadlined_at, 
                      FormHelperTextProps: {
                        sx: {
                          color: touched.deadlined_at && errors.deadlined_at ? "#f05344" : "inherit", // ✅ Dynamic error color
                        },
                      },
                
                    } }}
                    onBlur={handleBlur} 
                    value={values.deadlined_at}  
                 />
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

export default IssuanceForm;


