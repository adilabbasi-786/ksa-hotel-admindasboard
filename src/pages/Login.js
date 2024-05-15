import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "AuthContext";
const defaultTheme = createTheme();

const SignIn = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // user ? history.push("/admin/dashboard") : history.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: formData.email,
        password: formData.password,
      });

      if (res.data.error) {
        alert("Invalid email or password");
      } else {
        auth.setToken(res.data.jwt);
        localStorage.setItem("token", res.data.jwt);
        history.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("please type correct email and password");
      setError("An error occurred. Please try again.");
    }
  };
  const handleSubmitManager = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: formData.email,
        password: formData.password,
      });

      if (res.data.error) {
        alert("Invalid email or password");
      } else {
        auth.setToken(res.data.jwt);
        localStorage.setItem("token", res.data.jwt);
        history.push("/hotel/dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("please type correct email and password");
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="signInAdmin"
            >
              Sign In Admin
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            id="signInAdmin"
            onClick={handleSubmitManager}
          >
            Sign In Hotel Manager
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
