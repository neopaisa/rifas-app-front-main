/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import Footer from "../components/global/Footer";
import Hero from "../components/home/Hero";
import { ToastContainer } from "react-toastify";

function Home() {
  useEffect(() => {
    document.title = "Rifas App";
  }, []);
  return (
    <>
      <ToastContainer />
      <Hero />
      <Footer />
    </>
  );
}

export default Home;
