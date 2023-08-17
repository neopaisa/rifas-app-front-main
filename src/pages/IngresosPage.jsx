import React from "react";
import AvatarNavbar from "../components/global/AvatarNavbar";
import IngresosTable from "../components/admin/IngresosTable";

function IngresosPage() {
  return (
    <div>
      <AvatarNavbar />
      <div className="bg-gray-300 py-3">
        <IngresosTable />
      </div>
    </div>
  );
}

export default IngresosPage;
