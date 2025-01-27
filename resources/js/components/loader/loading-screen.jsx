import { Box } from "@mui/material";
import React, { useEffect } from "react";
import {Skeleton} from "@mui/material";

const LoadingScreen = () => {
  return  <Box sx={{ mt: 5, p:2 }}>
  <Skeleton />
  <Skeleton width="60%" />
  <Skeleton />
</Box>;
};

export default LoadingScreen;