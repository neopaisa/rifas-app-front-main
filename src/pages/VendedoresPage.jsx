import React from "react";
import AvatarNavbar from "../components/global/AvatarNavbar";
import VendedoresTable from "../components/admin/VendedoresTable";

function VendedoresPage() {
  return (
    <div>
      <AvatarNavbar />
      <div className="bg-gray-300 py-3">
      <VendedoresTable />
      </div>
    </div>
  );
}

export default VendedoresPage;
