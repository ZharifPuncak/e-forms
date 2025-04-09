"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText  from  "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { useMediaQuery } from "@/hooks/use-media-query";


import { useAppContext } from '@/contexts/app-context';

export default function CustomDialog(){

  const appContext = useAppContext();
  const mdDown = useMediaQuery("down", "md");

  return (
    <React.Fragment>
      <Dialog
        fullScreen={appContext.state.dialog.fullWidth}
        maxWidth="md"
        open={appContext.state.dialog.isOpen}
      >
        <Stack direction="row" spacing={3} sx={{ alignItems: "center", justifyContent: "space-between", px: 2, py: 1 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="subtitle">{ appContext.state.dialog.title }</Typography>
			 		  {appContext.state.dialog.subtitle && <Typography color="text.secondary" variant="caption">
						{appContext.state.dialog.subtitle}
					</Typography> }
				</Box>
				<IconButton onClick={() => { appContext.setDialog({ isOpen : false, fullWidth : false  }) }}>
					<XIcon />
				</IconButton>
			</Stack>
			<Divider />
        <DialogContent sx={{ mt : 5, px : {  xs : 0 } }}>
          <DialogContentText>
                {appContext.state.dialog.description}
          </DialogContentText>
            <Box sx={{ paddingX : mdDown ? 2 : 10 }}>
                {appContext.state.dialog.component}
            </Box>
         
          
               
        </DialogContent>
        {/* <Divider />
        <DialogActions>
          <Box sx={{ p : 1 }}>
            <Button size="small" sx={{ mr : 1}} variant='outlined' onClick={() => { appContext.setDialog({ isOpen : false }) }}>CLOSE</Button>
             {appContext.state.dialog.isAction &&  <Button size="small" variant='outlined' disabled={appContext.state.dialog.isDisabled} onClick={appContext.state.dialog.action} type="submit"> {appContext.state.dialog.confirmText}</Button>}
          </Box>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
