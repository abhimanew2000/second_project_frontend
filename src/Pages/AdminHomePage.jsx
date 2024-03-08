import React from "react";
import { UserDetails } from "../components/admin/UserDetails";
import { AdminSidebar } from "../components/admin/AdminSidebar";
export const AdminHomePage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {" "}
        <AdminSidebar />
        {/* <UserDetails /> */}
        <div>
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
};
