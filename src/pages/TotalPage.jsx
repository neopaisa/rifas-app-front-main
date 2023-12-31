import React from "react";
import AvatarNavbar from "../components/global/AvatarNavbar";
import Footer from "../components/global/Footer";
import TotalComponent from "../components/admin/TotalComponent";

function TotalPage() {
  return (
    <div>
      <AvatarNavbar />
      <div style={{ marginTop: "70px" }}>
        <TotalComponent />
      </div>
      <Footer />
    </div>
  );
}

export default TotalPage;
