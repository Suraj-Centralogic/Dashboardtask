import { TextField, type TextFieldProps, InputAdornment } from '@mui/material';
import { type FormikProps } from 'formik';
import { type ReactNode } from 'react';

interface CustomTextFieldProps<T>
  extends Omit<
    TextFieldProps,
    'name' | 'value' | 'onChange' | 'error' | 'helperText'
  > {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
  renderValue?: (value: string) => ReactNode;
  children?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

const CustomTextField = <T extends Record<string, any>>({
  name,
  label,
  formik,
  children,
  startAdornment,
  endAdornment,
  ...props
}: CustomTextFieldProps<T>) => {
  const error = Boolean(formik.touched[name] && formik.errors[name]);
  const helperText =
    formik.touched[name] && formik.errors[name]
      ? (formik.errors[name] as string)
      : undefined;

  return (
    <TextField
      name={String(name)}
      label={label}
      variant="outlined"
      fullWidth
      value={formik.values[name] || ''}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
      sx={{
        ...(props.multiline && {
          '& .MuiInputBase-root': {
            alignItems: 'flex-start',
          },
        }),
      }}
      {...props}
    >
      {children}
    </TextField>
  );
};

export default CustomTextField;
