import * as React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atom/userAtom.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

const defaultTheme = createTheme();

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const setUser = useSetRecoilState(userAtom)

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      const datas = await res.json()
      if (datas.error) {
          return toast.error(datas.error);
      }
      localStorage.setItem("user", JSON.stringify(datas))
      setUser(datas)
      toast.success("Registered successful!");
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("name", { required: true })}
                  required
                  fullWidth
                  label="Name"
                  autoComplete="name"
                  error={!!errors.name}
                  helperText={errors.name ? "Name is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("phone", { 
                    required: true,
                    pattern: /^[0-9]{10}$/i,
                  })}
                  required
                  fullWidth
                  label="Phone Number"
                  autoComplete="tel"
                  error={!!errors.phone}
                  helperText={errors.phone ? "Phone number must be 10 digits" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", { 
                    required: true, 
                    validate: {
                      validEmail: value => isValidEmail(value) || "Invalid email format"
                    }
                  })}
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", { 
                    required: true,
                    validate: {
                      validPassword: value => isValidPassword(value) || "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character"
                    }
                  })}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
