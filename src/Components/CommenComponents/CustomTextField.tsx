import { TextField, type TextFieldProps } from '@mui/material';
import { type FormikProps } from 'formik';
import { type ReactNode } from 'react';

export interface FormValues {
  ClientName: string;
  EffectiveDate: string;
  AgentName: string;
  ReferralFee: string;
}

interface CustomTextFieldProps
  extends Omit<
    TextFieldProps,
    'name' | 'value' | 'onChange' | 'error' | 'helperText'
  > {
  name: keyof FormValues;
  label: string;
  formik: FormikProps<FormValues>;
  renderValue?: (value: string) => ReactNode;
  children?: ReactNode;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  formik,
  renderValue,
  children,
  ...props
}) => {
  // Determine error and helper text safely
  const error = Boolean(formik.touched[name] && formik.errors[name]);
  const helperText =
    formik.touched[name] && formik.errors[name]
      ? String(formik.errors[name])
      : undefined;

  return (
    <TextField
      name={name}
      label={label}
      variant="outlined"
      fullWidth
      value={formik.values[name] || ''}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={error}
      helperText={helperText}
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
