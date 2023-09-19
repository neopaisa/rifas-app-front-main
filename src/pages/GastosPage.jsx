import React from "react";
import GastosTable from "../components/admin/GastosTable";
import AvatarNavbar from "../components/global/AvatarNavbar";
import Footer from "../components/global/Footer";
function GastosPage() {
  return (
    <div style={{ marginTop: "70px" }}>
      <AvatarNavbar />
      <GastosTable />
      <Footer />
    </div>
  );
}
export default GastosPage;
