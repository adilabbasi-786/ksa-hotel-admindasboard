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
import { URL } from "Utils";
const defaultTheme = createTheme();

const SignIn = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdminSignIn = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login with user credentials
      const loginRes = await axios.post(`${URL}/api/auth/local`, {
        identifier: formData.email,
        password: formData.password,
      });

      if (loginRes.data.error) {
        alert("Invalid email or password");
      } else {
        const jwt = loginRes.data.jwt; // Extract JWT token
        localStorage.setItem("token", jwt);
        auth.setToken(jwt);

        // Step 2: Fetch user's role
        const roleRes = await axios.get(`${URL}/api/users/me?populate=role`, {
          headers: {
            Authorization: `Bearer ${jwt}`, // Include JWT token in the request headers
          },
        });

        const userRole = roleRes.data.role;

        // Step 3: Redirect based on user's role
        if (userRole && userRole.name === "admin") {
          history.push("/admin/dashboard");
        } else {
          alert("You don't have permission to access the admin dashboard.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Please type correct email and password");
      setError("An error occurred. Please try again.");
    }
  };

  const handleManagerSignIn = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login with user credentials
      const loginRes = await axios.post(`${URL}/api/auth/local`, {
        identifier: formData.email,
        password: formData.password,
      });

      if (loginRes.data.error) {
        alert("Invalid email or password");
      } else {
        const jwt = loginRes.data.jwt; // Extract JWT token
        localStorage.setItem("token", jwt);
        auth.setToken(jwt);

        // Step 2: Fetch user's role
        const roleRes = await axios.get(`${URL}/api/users/me?populate=role`, {
          headers: {
            Authorization: `Bearer ${jwt}`, // Include JWT token in the request headers
          },
        });

        const userRole = roleRes.data.role;

        // Step 3: Redirect based on user's role
        if (userRole && userRole.name === "manager") {
          history.push("/hotel/dashboard");
        } else {
          alert(
            "You don't have permission to access the hotel manager dashboard."
          );
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Please type correct email and password");
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
            onSubmit={handleAdminSignIn}
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
            onClick={handleManagerSignIn}
          >
            Sign In Hotel Manager
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
