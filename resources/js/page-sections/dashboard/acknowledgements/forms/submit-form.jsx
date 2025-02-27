import React, { useState, useRef, useEffect } from 'react';
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
import _ from 'lodash';

import { useTheme } from '@mui/material/styles';
import { toast } from 'sonner';
import { useMediaQuery } from "@/hooks/use-media-query";
import { PencilSlash  as PencilSlashIcon } from "@phosphor-icons/react/dist/ssr/PencilSlash";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import useAxios  from "@/hooks/use-axios";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/app-context';
import  LoadingButton  from '@mui/lab/LoadingButton';
import { paths } from "@/paths";

const SubmitAcknowledgementForm = ({ code, file, title, submitted, status, update, signature})  => {
   
  const appContext = useAppContext();
  const navigate = useNavigate();

  const { axiosMutate } = useAxios();

  const steps = [
    { label: 'Document' },
    { label: 'Acknowledgement & Signature' },
  ];

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
  const [checked, setChecked] = useState(false);
  const handleCheckChange = (event) => {
      setChecked(event.target.checked);
  };

  // Function to get the signature when user finishes signing
  const handleEnd = () => {
 
    const dataURL = signatureRef.current.toDataURL("image/png"); // Get Base64 image
    setSign(dataURL);
 
  };

  
  const [sign, setSign] = useState(null);
  const signatureRef = useRef(null);

  const clearSignature = () => {
      if (signatureRef.current) {
          setSign(null);
          signatureRef.current.clear();
      }
  };

 

  const { mutate : signForm, isLoading : signLoading, isSuccess : signSuccess  } =  axiosMutate({ id: 'acknowledgement-signature' + code, method : 'put', url : import.meta.env.VITE_API_BASE_URL + '/acknowledgements/sign', payload : { code , signature : sign } });
    
  const submit = () => {

      if(!checked){
          toast.error('Please check acknowledgement',{
            style: {
              background: 'red',
              color: 'white'
            },
          });

          return;
      }

      if(_.isEmpty(signatureRef?.current?.toData())){

        setSign(null);
        toast.error('Please sign acknowledgement',{
          style: {
            background: 'red',
            color: 'white'
          },
        });

        return;
      }
      
      signForm();
    
  }


  useEffect(() => {

    if(signSuccess){

        setTimeout(() => {
          appContext.setDialog({ isOpen : false, title : '', subtitle : '', component : '' });
          navigate(paths?.dashboard?.acknowledgements?.form?.details(code))
          update();
        },250)
    }

  },[signSuccess])
  

  return (
 

        <Grid container={true} spacing={4}  >
            <Grid 	size={{ md: 12, xs: 12 }} >
				

          <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        optional={
                            index === steps.length - 1 ? (
                            <Typography variant="caption">Last step</Typography>
                            ) : <Typography variant="caption">{ title }</Typography>
                        }
                        >
                        {step.label}
                        </StepLabel>
                        <StepContent>

                            
                        {/* <Typography>{step.description}</Typography> */}
                        {index == 0 &&  <Box sx={{ mt : 2, mb : 2 }}>
                        {!mdDown ? 
                              <embed  src={file + '#zoom=100&toolbar=0'} type="application/pdf" width="100%" height={"600px"}  /> :
                              <embed  src={file + '#zoom=50&toolbar=0'} type="application/pdf" width="100%" height={"600px"}  />}
                          
                        </Box>}
                        {index == 1 &&  status == 'pending' && <Grid container={true} sx={{ mt : 2, mb : 2 }}>
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
                                                    <Typography variant="body2">
                                                        <p>I hereby acknowledge that I have carefully read and fully understand the contents of the document(s) provided to me. I confirm that I have reviewed all relevant information and accept the responsibilities, terms, and conditions outlined therein.</p> 
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
                                              onEnd={handleEnd} 
                                            />
                                        </Box>
                                    
                                      </Card>
                                     
                                </Grid>
                
                          </Grid>}

                          {index == 1 &&  status == 'completed' && <Grid container={true} sx={{ mt : 2, mb : 2 }}>
                                <Grid size={{ xs : 12, sm : 12 }}>
                                    <Card sx={{ padding : 2 }}>
                                      <Box sx={{ mb : 2 }}>
                                          <Paragraph lineHeight={1} fontWeight={500}>
                                                Acknowledgement
                                          </Paragraph>
                                          <Paragraph mt={-1.5}  fontSize={12} color="text.secondary">
                                               You have submitted!
                                          </Paragraph>
                                      </Box>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                             <Typography variant="body2">
                                                        <p> <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />  I hereby acknowledge that I have carefully read and fully understand the contents of the document(s) provided to me. I confirm that I have reviewed all relevant information and accept the responsibilities, terms, and conditions outlined therein.</p> 
                                              </Typography>
                                      </Box>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="caption">
                                                 <img src={signature} />
                                             </Typography>
                                     </Box>
                                              
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Typography variant="caption">
                                                      <p>  Date submitted : { submitted }</p> 
                                              </Typography>
                                        </Box>
                                      </Card>
                                </Grid>


                  
                          </Grid>}

                        <Box sx={{ mb: 2 }}>

                        <LoadingButton
                            loading={signLoading}
                            disabled={index === steps.length - 1 && !checked  }
                            variant="contained"
                            onClick={() => {
                              index === steps.length - 1 ?  submit() : handleNext()
                            }}
                            sx={{ mt: 1, mr: 1 }}
                            >
                            {index === steps.length - 1 ? 'Submit' : 'Continue'}
                         </LoadingButton>



                            {index !== 0 &&  <Button
                              
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
       
  
  );
}

export default SubmitAcknowledgementForm;


