import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Typography  from '@mui/material/Typography';
import Box from '@mui/material/Box';

import * as Yup from "yup";
import { useFormik } from "formik";
import useAxios  from "@/hooks/use-axios";

import FileUploader from '@/components/widgets/uploads/file-uploader';

import LoadingButton from '@mui/lab/LoadingButton';
import { useAppContext } from "@/contexts/app-context";

const UploadFile = ({ data, code, update })  => {

  const appContext = useAppContext();
  const {  axiosMutate } = useAxios();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [initialValues,setInitialValues] = useState({
    code: code,
    title : data?.title || '',
    file_path : null
  }); 

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").label('Title'),
    file_path: Yup.mixed().required('File is required').test("fileSize", "Exceed filesize limit of 10 MB", (file) => {
      return file && file.size <= 11 * 1024 * 1024;
    }).label('File'),
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
          await upload();
      } 
    });

    const updateFile = (value) => {
      setFieldValue('file_path',value)
    }

    const { mutate : upload, isLoading : uploadLoading, isSuccess : uploadSuccess  } =  axiosMutate({ id: 'forms-file-upload' + code, method : 'post', url : import.meta.env.VITE_API_BASE_URL + '/forms/files/upload', payload : {code ,...values}, isFileUpload : true, onProgress: setUploadProgress });
     
    useEffect(() => {
      if(uploadSuccess){
          update();
          appContext.setDialog({ title : '', subtitle : '', component : null, isOpen : false}); 
       }
    },[uploadSuccess])
    

  return (
  <form onSubmit={handleSubmit}>
        <Grid container={true} sx={{ padding : 2 }} spacing={1}  >
            <Grid  size={{ xs : 12, sm: 12, md : 12 }}>
            <Typography variant='subtitle2' sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >Title </Typography>
              <TextField
                        fullWidth
                        name="title"
                        label=''
                        placeholder=""
                        autoComplete="off"
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.title}  
                        helperText={touched.title && errors.title} 
                        // error={Boolean(touched.title && errors.title)} 
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
            <br></br>
            <Grid  size={{xs : 12, sm: 12, md : 12}} >
            <Typography variant='subtitle2'   sx={{ fontWeight : 'bold', mb : 0.5, ml : 0.5 }} >File </Typography>
                <FileUploader  progress={uploadProgress} loading={uploadLoading} update={updateFile}/>
                {errors.file_path  && <Typography variant="caption"  sx={{ ml: 0.5, mt: 0.5, display: "block", color : '#F05344' }}>
                      {errors.file_path}
                    </Typography>}
           </Grid>
            <Grid  size={{xs : 12, sm: 12, md : 12 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton loading={uploadLoading} type="submit"  variant="outlined">SUBMIT</LoadingButton>
              </Box>
            </Grid>
        </Grid>
       
    </form>
  );
}

export default UploadFile;


