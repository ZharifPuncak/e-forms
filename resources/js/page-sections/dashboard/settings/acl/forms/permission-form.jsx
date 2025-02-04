import React, {  useState } from 'react';

import { Box, Skeleton,  Autocomplete, TextField, Stack, Button, Typography} from "@mui/material";
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid2';

import { Paragraph, Small } from '@/components/typography';
import {  FlexBetween } from '@/components/flexbox';
import FlexBox from '@/components/flexbox/FlexBox';

// import useAxios  from "@/hooks/useAxios";
import { useFormik } from "formik";

import { useConfirm } from "material-ui-confirm";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import * as Yup from "yup"; // styled components
import _ from 'lodash';

const PermissionForm = (props) => { 

  const theme = useTheme();
  const confirm = useConfirm();

  //const {  axiosGet, axiosMutate  } = useAxios();
  const downSm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const methods = ['view','create','update','delete'];


    const [initialValues,setInitialValues] = useState({
        role_id : props?.id,
        user : [],
        role : [],
        permission : []
    }); 


    
    const validationSchema = Yup.object().shape({
      user: Yup.array(),
      role: Yup.array(),
      permission: Yup.array()
    });

   
    const {
    values,
    errors,
    handleSubmit,
    touched,
    setFieldValue,
    resetForm
    } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => { 
       
      confirm({ 
        title : '',
        dialogProps : { maxWidth : 'sm'},
        description: (
          <Typography variant="caption" sx={{ fontSize: '14px' }}>
            Are you sure to proceed?
          </Typography>
        ), 
        confirmationText : 'Proceed', 
        confirmationButtonProps: { variant: 'text' ,sx: { textTransform: 'none', color : '#6950e8' } },
        cancellationButtonProps: {  variant: 'text',  sx: { textTransform: 'none', color : '#6950e8' } },
        cancellationText : 'Cancel',
        titleProps : { mx: 'auto' }, 
        })
        .then( async () => {
               mutate();
        })
      } 
    });



 
//     const { data : teams } =  axiosGet({ id : 'team-members', url :  import.meta.env.VITE_API_BASE_URL + '/team-members'});
//     const { mutate, isLoading , isSuccess   } =  axiosMutate({ id: 'team-members-assign'+ props?.id, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/work-orders/assign', payload : values });
    
    

//   React.useEffect(() => {
//     if(isSuccess){  
//         props.update();
//         appContext.setModal({ isOpen : false, component : null }); 
//     }
//   },[isSuccess]);

 

 return <>  


      <form onSubmit={handleSubmit}>
      { true ?  
        <Grid container={true} spacing={2}  >
          <Grid sx={{ p : 2 }} size={{xs : 2, sm : 2, md : 6}}>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{  '& .MuiInputBase-root': { height: 45 } }} 
                  multiple
                  freeSolo
                  id="user"
                  value={values.user || []}
                  name="user"
                  onChange={(e, v) => {
                    setFieldValue("user", v || []);
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ""}
                  options={methods}
                  renderInput={(params) => (
                    <TextField
                    helperText={touched.user && errors.user}      error={Boolean(touched.user && errors.user)}  {...params} label="User" 
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: Boolean(errors.user) ? 'red' : 'inherit',
                        },
                      }}
                    />
                  )}
                />

           
           
              </Stack>         
          </Grid>
          <Grid sx={{ p : 2 }} size={{xs : 2, sm : 2, md : 6}}>
              <Stack spacing={1}>
                  <Autocomplete
                  sx={{  '& .MuiInputBase-root': { height: 45 } }} 
                  multiple
                  freeSolo
                  id="role"
                  value={values.role || []}
                  name="role"
                  onChange={(e, v) => {
                    setFieldValue("role", v || []);
                  }}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue;
                  }}
                  getOptionLabel={(option) => option || ""}
                  options={methods}
                  renderInput={(params) => (
                    <TextField
                    helperText={touched.role && errors.role}      error={Boolean(touched.role && errors.role)}  {...params} label="Role" 
                      sx={{
                        '& .MuiAutocomplete-input.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.primary,
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: Boolean(errors.role) ? 'red' : 'inherit',
                        },
                   
                      }}
                    />
                  )}
                />
              </Stack>         
          </Grid>
          <Grid sx={{ p : 2 }} size={{ xs : 12 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button size='small' variant='outlined'>UPDATE</Button>
            </Box>
          </Grid>
          </Grid>
        :    <Box sx={{ pt: 0.5  }} padding={5} marginTop={10}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton />
        </Box> }
      </form>
 
    </>
}

export default PermissionForm;