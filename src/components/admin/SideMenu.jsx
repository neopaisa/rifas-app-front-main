import React from "react";

function SideMenu() {
  return (
    <div className="ra-sidemenu-container">
      <ul className="ra-sidemenu-ul">
        <li className="ra-sidemenu-element">
          <a href="#">Resumen General</a>
        </li>
        <li className="ra-sidemenu-element">
          <a href="#">Tabla de Boletas</a>
        </li>
        <li className="ra-sidemenu-element">
          <a href="#">Gastos</a>
        </li>
        <li className="ra-sidemenu-element">
          <a href="#">Ingresos</a>
        </li>
        <li className="ra-sidemenu-element">
          <a href="#">Boletas Disponibles</a>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;
