import React from "react";
import BoletasTable from "./BoletasTable";
import "./index.scss";

function AdminDashboard() {
  return (
    <div className="ra-admindashboard-container">
      <BoletasTable />
    </div>
  );
}

export default AdminDashboard;
