import React from "react";
import AvatarNavbar from "../components/global/AvatarNavbar";
import IngresosTable from "../components/admin/IngresosTable";
import Footer from "../components/global/Footer";

function IngresosPage() {
  return (
    <div>
      <AvatarNavbar />
      <div className="bg-gray-300 py-3" style={{ marginTop: "70px" }}>
        <IngresosTable />
      </div>
      <Footer />
    </div>
  );
}

export default IngresosPage;
