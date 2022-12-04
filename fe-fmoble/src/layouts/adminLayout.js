import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../component/adminNav/adminNavbar";

const AdminLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="layout-admin col-md-2 p-0">
          <AdminNav />
        </div>
        <div className="col mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
