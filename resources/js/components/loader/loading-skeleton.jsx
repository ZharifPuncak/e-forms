import { Box } from "@mui/material";
import React from "react";
import {Skeleton} from "@mui/material";

const Skeleton1 = () => {
  return  <>
    <Skeleton width={'65%'} height={25} />
    <Skeleton width={'50%'} height={50} />
    <Skeleton width={'30%'} height={25} />
</>;
};

const ShortSkeleton = () => {
  return  <Skeleton width={'20%'} />
};

const MedSkeleton = () => {
  return  <Skeleton width={'50%'} />
};

const LongSkeleton = () => {
  return  <Skeleton width={'80%'} />
};

export  { Skeleton1, ShortSkeleton, MedSkeleton, LongSkeleton };