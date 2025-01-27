import React from 'react';
import { PatternFormat, NumericFormat } from 'react-number-format';


export const PatternIdNo = React.forwardRef(function PatternIdNo(props, ref) {
  const { onChange, ...other } = props;

  return (
    <PatternFormat
    {...other}
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({
        target: {
          name: props.name,
          value: values.value,
        },
      });
    }}
    valueIsNumericString
    mask="_"
    format="######-##-####" 
  />
  )
});

export const PatternIdNoText = React.forwardRef(function PatternIdNoText(props, ref) {
  const { onChange, ...other } = props;

  return (
    <PatternFormat
    {...other}
    getInputRef={ref}
    valueIsNumericString
    mask="_"
    format="######-##-####" 
    displayType={'text'}
  />
  )
});


export const PatternContactNo = React.forwardRef(function PatternContactNo(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
    {...other}
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({
        target: {
          name: props.name,
          value: values.value,
        },
      });
    }}
    valueIsNumericString
  />
  )
});

