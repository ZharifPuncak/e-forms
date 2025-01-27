import { Box } from "@mui/material";
import NProgress from "nprogress";
import React, { useEffect } from "react";

const LoadingBar = () => {
  NProgress.configure({
    showSpinner: false
  });
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return <Box />;
};

export default LoadingBar;