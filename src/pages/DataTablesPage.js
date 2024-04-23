import React from "react";
import DataTables from "../views/admin/dataTables";
import Sidebar from "components/sidebar/Sidebar";
import Profile from "../views/admin/profile";
import routes from "routes";
const DataTablesPage = () => {
  return (
    <>
      <Sidebar routes={routes}>
        <DataTables />
        <Profile />
      </Sidebar>
    </>
  );
};

export default DataTablesPage;
