import { Button, Grid, styled } from "@mui/material";
import AppModal from "../components/app-modal";
import Scrollbar from "../components/scrollbar/scrollbar";

import { useAppContext } from '@/contexts/app-context';


// styled components
const StyledAppModal = styled(AppModal)(({
  theme
}) => ({
  maxWidth: 450,
  minWidth: 200,
  [theme.breakpoints.down(325)]: {
    maxWidth: "100%"
  }
}));

const Modal = (props) => {

  const appContext = useAppContext();
 
  return <StyledAppModal open={appContext.state.modal.isOpen} handleClose={() => { appContext.setModal({isOpen : false})}}>
      <Scrollbar   style={{
        overflowY: 'hidden',
      }}
      data-simplebar="auto-hide"
      // autoHeight 
     >
          <Grid container spacing={1}>
             {appContext.state.modal.component}
          </Grid>
      </Scrollbar>
    </StyledAppModal>;
};

export default Modal;