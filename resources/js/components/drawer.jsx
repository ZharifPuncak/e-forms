import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';


import { useAppContext } from '@/contexts/app-context';

export default function DrawerSlider(props) {

  const appContext = useAppContext();


  const toggleDrawer =
    (open) =>
    (event) => {
    //   if (
    //     event.type === 'keydown' &&
    //     ((event).key === 'Tab' ||
    //       (event).key === 'Shift')
    //   ) {
    //     return;
    //   }
      appContext.setDrawer({ isOpen : open});
    };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
         {appContext.state.drawer.data}
    </Box>
  );





  return (
   
        <React.Fragment key={appContext.state.drawer.position}>  
        
          <Drawer
            anchor={appContext.state.drawer.position}
            open={appContext.state.drawer.isOpen}
            onClose={toggleDrawer(false)}
          >
            {list(appContext.state.drawer.position)}
          </Drawer>
        </React.Fragment>
    
  );
}
