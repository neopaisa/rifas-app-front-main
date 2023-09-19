import React from 'react'
import BoletasDisponiblesTable from '../components/general/BoletasDisponiblesTable'
import AvatarNavbar from '../components/global/AvatarNavbar'
import Footer from "../components/global/Footer";

function BoletasDisponiblesPage() {
  return (
    <div style={{ marginTop: "70px" }}>
      <AvatarNavbar />
      <BoletasDisponiblesTable />
      <Footer />
    </div>
  );
}
export default BoletasDisponiblesPage