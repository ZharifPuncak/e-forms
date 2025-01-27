import { Box, Dialog } from "@mui/material";

const AppModal = ({
  children,
  open,
  handleClose,
  ...props
}) => {
  return <Dialog fullScreen open={open} onClose={handleClose}>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Dialog>;
};

export default AppModal;