import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLayout from "layouts/admin";
import HotelLayout from "layouts/hotel";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import SignIn from "pages/Login";

import { AuthProvider } from "AuthContext";
import PrivateRoute from "PrivateRoute";

ReactDOM.render(
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <SignIn />
              </Route>

              <PrivateRoute path={`/admin`} component={AdminLayout} />
              <PrivateRoute path={`/hotel`} component={HotelLayout} />
            </Switch>
          </Router>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  </AuthProvider>,
  document.getElementById("root")
);
