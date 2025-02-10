import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function Accordion1({ id='', title = '', details = '', actions = null }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
      
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id={id}
        >
          <Typography component="span">{ title }</Typography>
        </AccordionSummary>
        <AccordionDetails>
          { details }
        </AccordionDetails>
        <AccordionActions>
            { actions }
        </AccordionActions>
      </Accordion>
    </div>
  );
}
