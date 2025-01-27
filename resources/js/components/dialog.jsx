import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppContext } from '@/contexts/app-context';

export default function CustomDialog(){

  const appContext = useAppContext();

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={appContext.state.dialog.maxWidth}
        open={appContext.state.dialog.isOpen}
      >
        <DialogTitle>{appContext.state.dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
                {appContext.state.dialog.description}
          </DialogContentText>
                 {appContext.state.dialog.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { appContext.setDialog({ isOpen : false }) }}>Cancel</Button>
          <Button disabled={appContext.state.dialog.isDisabled} onClick={appContext.state.dialog.action} type="submit"> {appContext.state.dialog.confirmText}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
