import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import HotelLayout from "layouts/hotel";
// import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import SignIn from "pages/Login";
// import DataTables from "./views/admin/dataTables";
// import DataTablesPage from "pages/DataTablesPage";
import AdminDashboard from "./pages/admin/Dashboard";
import HotelDashboard from "./pages/hotel/Dashboard";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            {/* <Route exact path="/admin-dashboard">
              <AdminDashboard />
            </Route>
            <Route exact path="/hotel-dashboard">
              <HotelDashboard />
            </Route> */}

            {/* <Route path={`/auth`} component={AuthLayout} /> */}
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/hotel`} component={HotelLayout} />
            {/* <Route path={`/rtl`} component={RtlLayout} />
            <Redirect from="/" to="/admin" /> */}
          </Switch>
        </Router>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
