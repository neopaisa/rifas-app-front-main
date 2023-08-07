import React from "react";
import GastosTable from "../components/admin/GastosTable";
import AvatarNavbar from "../components/global/AvatarNavbar";
import Footer from "../components/global/Footer";
function GastosPage() {
  return (
    <>
      <AvatarNavbar />
      <GastosTable />
      <Footer />
    </>
  );
}

export default GastosPage;
