import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
import CustomTextField from "../CommenComponents/CustomTextField";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {

  const formik = useFormik<LoginFormValues>({
  initialValues: {
    email: "",
    password: "",
    remember: false,
  },
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  }),
  onSubmit: (values) => {
    alert(JSON.stringify(values, null, 2));
  },
});

  return (
    <Paper
      elevation={12}
      sx={{
        p: 4,
        borderRadius: 1,
        background: "rgba(255,255,255,0.95)",
        textAlign: "center",
        maxWidth: 500,
        height: "80vh",
        mx: "auto",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="semibold" gutterBottom>
          Login
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <CustomTextField
          label="Email"
          name="email"
          formik={formik}
          startAdornment={<EmailIcon sx={{ color: "grey.500" }} />}
        />

        <CustomTextField
          label="Password"
          name="password"
          type="password"
          formik={formik}
          startAdornment={<LockIcon sx={{ color: "grey.500" }} />}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            mt: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
              />
            }
            label="Remember me"
          />
          <Link href="#" underline="hover" sx={{ fontSize: 14, color: "primary.main" }}>
            Forgot Password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            fontSize: 19,
            background: "#000000ff",
            borderRadius: 1,
          }}
        >
          Login
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Typography variant="body2">
          Don't have an account?{" "}
          <Link onClick={onSwitchToRegister} sx={{ cursor: "pointer", fontWeight: 500 }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}
