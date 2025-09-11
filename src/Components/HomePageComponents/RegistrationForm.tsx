import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Paper, Typography, Button, Checkbox, FormControlLabel, Divider, IconButton, Box, MenuItem } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import CustomTextField from '../CommenComponents/CustomTextField';

interface RegistrationFormProps {
  onSwitchToLogin: () => void;
}

interface RegistrationFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number | '';
  gender: string;
  skills: string[];
  country: string;
  dateOfBirth: string;
  terms: boolean;
}

const validationSchema = Yup.object({
  fullName: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[@$!%*?&#]/, 'At least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  age: Yup.number().required('Age is required').min(18, 'Must be at least 18').max(100, 'Must be at most 100'),
  gender: Yup.string().required('Gender is required'),
  skills: Yup.array().min(1, 'Select at least one skill'),
  country: Yup.string().required('Country is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required').max(new Date(), 'Date cannot be in the future'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

const RegistrationForm = ({ onSwitchToLogin }: RegistrationFormProps) => {
  return (
    <Paper
      elevation={12}
      sx={{
        p: 4,
        borderRadius: 1,
        position: 'relative',
        background: 'rgba(255,255,255,0.95)',
        maxWidth: 500,
        mx: 'auto',
        my: 4,
      }}
    >
      <IconButton onClick={onSwitchToLogin} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.600' }}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
        Create Account
      </Typography>

      <Formik<RegistrationFormValues>
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: '',
          gender: '',
          skills: [],
          country: '',
          dateOfBirth: '',
          terms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <CustomTextField label="Full Name" name="fullName" formik={formik} />
              <CustomTextField label="Email Address" name="email" type="email" formik={formik} />
              <CustomTextField label="Password" name="password" type="password" formik={formik} />
              <CustomTextField label="Confirm Password" name="confirmPassword" type="password" formik={formik} />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <CustomTextField label="Gender" name="gender" select formik={formik}>
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </CustomTextField>

                <CustomTextField
                  label="Skills"
                  name="skills"
                  select
                  formik={formik}
                  SelectProps={{
                    multiple: true,
                    value: formik.values.skills,
                    onChange: (e) => formik.setFieldValue('skills', e.target.value),
                  }}
                >
                  <MenuItem value="React">React</MenuItem>
                  <MenuItem value="Angular">Angular</MenuItem>
                  <MenuItem value="Vue">Vue</MenuItem>
                  <MenuItem value="Node.js">Node.js</MenuItem>
                </CustomTextField>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <CustomTextField label="Country" name="country" select formik={formik}>
                  <MenuItem value="">Select Country</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                </CustomTextField>

                <CustomTextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  formik={formik}
                />
              </Box>

              <Box>
                <FormControlLabel
                  control={<Checkbox checked={formik.values.terms} onChange={formik.handleChange} name="terms" />}
                  label="I agree to the Terms & Conditions"
                />
                {formik.touched.terms && formik.errors.terms && (
                  <Typography variant="caption" color="error">
                    {formik.errors.terms}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5, background: '#000000ff', borderRadius: 1 }}
              >
                Create Account
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
export default RegistrationForm;
