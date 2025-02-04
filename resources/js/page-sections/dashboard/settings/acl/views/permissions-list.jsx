import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import PermissionForm from '../forms/permission-form';

export function PermissionsList() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid container={true}  justifyContent="center" alignItems="center">
      <Grid   size={{ xs: 12, md: 8}} >
      <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='subtitle1' component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Access Control List
          </Typography>
          <Typography variant='subtitle2' component="span" sx={{ color: 'text.secondary' }}>
             Manage user, role and permissions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <Card sx={{ overflowX: "auto" }} variant="outlined">
               <PermissionForm />
            </Card>
          </Stack>
         
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography variant='subtitle1'  component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Profile
          </Typography>
          <Typography variant='subtitle2'  component="span" sx={{ color: 'text.secondary' }}>
            Update password, Logout Browser Sessions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack spacing={3}>
            <Card sx={{ overflowX: "auto" }} variant="outlined">
               <PermissionForm />
            </Card>
          </Stack>
        </AccordionDetails>
      </Accordion>
      </div>
      </Grid>
    </Grid>
  );
}