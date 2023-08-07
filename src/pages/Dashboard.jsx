/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import Footer from "../components/global/Footer";
import AdminDashboard from "../components/admin/AdminDashboard";
import AvatarNavbar from "../components/global/AvatarNavbar";

function Dashboard() {
  useEffect(() => {
    document.title = "Rifas App - Admin Dashboard";
  }, []);
  return (
    <>
      <AvatarNavbar />
      <AdminDashboard />
      <Footer />
    </>
  );
}

export default Dashboard;
