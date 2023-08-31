import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import React from "react";
import LoginForm from "../components/login/LoginForm";
import ErrorPage from "../pages/ErrorPage";
import BoletasDisponiblesPage from "../pages/BoletasDisponiblesPage";
import GastosPage from "../pages/GastosPage";
import IngresosPage from "../pages/IngresosPage";
import VendedoresPage from "../pages/VendedoresPage";
import TotalPage from "../pages/TotalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/boletas-disponibles",
    element: <BoletasDisponiblesPage/>,
  },
  {
    path: "/gastos",
    element: <GastosPage/>,
  },
  {
    path: "/ingresos",
    element: <IngresosPage/>,
  },
  {
    path: "/vendedores",
    element: <VendedoresPage/>,
  },
  {
    path: "/total",
    element: <TotalPage/>,
  },
]);
