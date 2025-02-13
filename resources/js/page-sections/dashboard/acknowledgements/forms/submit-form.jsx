import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonBase from '@mui/material/ButtonBase';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import SignatureCanvas from 'react-signature-canvas'
import { Paragraph } from '@/components/typography';

import { useTheme } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";

import integrityPDF from "@/assets/docs/Integrity Pledge.pdf";

import { useMediaQuery } from "@/hooks/use-media-query";
import { PencilSlash  as PencilSlashIcon } from "@phosphor-icons/react/dist/ssr/PencilSlash";

const steps = [
  { label: 'Document' },
  { label: 'Acknowledgement & Signature' },
];


const SubmitAcknowledgementForm = ()  => {

  const theme = useTheme();
  const mdDown = useMediaQuery("down", "md");

  //Stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  //Checked 
  const signatureRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const handleCheckChange = (event) => {
      setChecked(event.target.checked);
  };

  const clearSignature = () => {
    if (signatureRef.current) {
        signatureRef.current.clear();
    }
};



  const [initialValues,setInitialValues] = useState({
    name:  '',
    alias: '',
    type:  '',
    category: '',
    descriptions: '',
    instructions: '',
  }); 

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(100).required("Name is required").label('Name'),
    alias: Yup.string().min(3).max(100).required("Alias is required").label('Alias'),
    category: Yup.object().required("Category is required").label('Category'),
    type: Yup.object().required("Type is required").label('Type'),
    descriptions: Yup.string().required("Description is required").label('Description'),
    instructions: Yup.string().required("Instruction is required").label('Instruction'),
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
  <form onSubmit={handleSubmit}>

        <Grid container={true} spacing={4}  >
            <Grid 	size={{ md: 12, xs: 12 }} >
						{/* <Card sx={{ borderRadius: 1 }} variant="outlined">
												<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
													{[
														 { key: "Doc", value: <Box>
                              {!mdDown ? 
                              <embed  src={integrityPDF + '#zoom=100&toolbar=0'} type="application/pdf" width="100%" height={"600px"}  /> :
                              <embed  src={integrityPDF + '#zoom=50&toolbar=0'} type="application/pdf" width="100%" height={"600px"}  />}
                              </Box>},
                          	{ key: "Action", value:  	<Card>
															 <SignatureCanvas penColor='green'
                                canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
													</Card> },
                            { key: "Signature", value: null },
													].map((item) => (
														<PropertyItem key={item.key} name={item.key} value={item.value} />
													))}
												</PropertyList>
						</Card> */}

          <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        optional={
                            index === steps.length - 1 ? (
                            <Typography variant="caption">Last step</Typography>
                            ) : null
                        }
                        >
                        {step.label}
                        </StepLabel>
                        <StepContent>

                            
                        {/* <Typography>{step.description}</Typography> */}
                        {index == 0 &&  <Box sx={{ mt : 2, mb : 2 }}>
                        {!mdDown ? 
                              <embed  src={integrityPDF + '#zoom=100&toolbar=0'} type="application/pdf" width="100%" height={"600px"}  /> :
                              <embed  src={integrityPDF + '#zoom=50&toolbar=0'} type="application/pdf" width="100%" height={"600px"}  />}
                          
                        </Box>}
                        {index == 1 &&  <Grid container={true} sx={{ mt : 2, mb : 2 }}>
                                          <Grid size={{ xs : 12, sm : 12 }}>
                                              <Card sx={{ padding : 2 }}>
                                                <Box sx={{ mb : 2 }}>
                                                    <Paragraph lineHeight={1} fontWeight={500}>
                                                          Acknowledgement
                                                    </Paragraph>
                                                    <Paragraph mt={-1.5}  fontSize={12} color="text.secondary">
                                                          Check the box
                                                    </Paragraph>
                                                </Box>
                                                        
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                      <FormControlLabel
                                                          control={
                                                              <Checkbox
                                                                  checked={checked}
                                                                  onChange={handleCheckChange}
                                                                  color="primary"
                                                              />
                                                          }
                                                          label={
                                                              <Typography variant="subtitle2">
                                                                  I hereby acknowledge that I have reviewed all the contents of all the report and acted accordingly.
                                                              </Typography>
                                                                  }
                                                              />
                                                        </Box>
                                                </Card>
                                              </Grid>


                                          <Grid size={{xs : 12, sm : 12 }}>
                                                <Card sx={{ padding : 2, mt : 2 }}>
                                                  <Box sx={{ mb : 2 }}>
                                                      <Paragraph lineHeight={1} fontWeight={500}>
                                                            Digital Signature
                                                      </Paragraph>
                                                      <Paragraph mt={-1.5} fontSize={12} color="text.secondary">
                                                            Sign in the below
                                                      </Paragraph>
                                                      <ButtonBase onClick={() => { clearSignature() }} sx={{ color : '#6950E8'}} mt={0.5} fontSize={12} color="text.secondary">
                                                              <PencilSlashIcon />
                                                             <span style={{ marginLeft: '4px' }}>Clear</span>
                                                      </ButtonBase>
                                                  </Box>
                                                        
                                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <SignatureCanvas 
                                                        ref={signatureRef}
                                                        penColor='black'
                                                        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} 
                                                      />
                                                  </Box>
                                              
                                                </Card>
                                          </Grid>
                          
                                    </Grid>}


                        <Box sx={{ mb: 2 }}>
                            <Button
                            size="small"
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            >
                            {index === steps.length - 1 ? 'Submit' : 'Continue'}
                            </Button>
                            {index !== 0 &&  <Button
                              size="small"
                               variant="outlined"
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                            >
                            Back
                            </Button>}
                        </Box>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
					</Grid>
        </Grid>
       
    </form>
  );
}

export default SubmitAcknowledgementForm;


