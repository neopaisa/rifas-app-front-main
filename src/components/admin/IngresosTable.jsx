import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import './index.scss'

const IngresosTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rifa.cybriguard.com/contabilidad/ingresos?rifa_id=1&page=1&page_size=50"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const ingresoList = data.map((ingreso, index) => (
    <tr
      className="hover:bg-gray-200 hover:cursor-pointer ra-fade-animation"
      key={index}
    >
      <td
        className="px-6 py-4 ra-number-container bg-gray-100"
        data-label="Número"
      >
        {ingreso.numero}
      </td>
      <td className="px-6 py-4 font-bold" data-label="Fecha">
        {ingreso.fecha}
      </td>
      <td className="px-6 py-4" data-label="Usuario">
        {ingreso.username}
      </td>
      <td className="px-6 py-4 bg-gray-100" data-label="Teléfono">
        {ingreso.telefono}
      </td>
      <td className="px-6 py-4" data-label="Dirección">
        {ingreso.direccion}
      </td>
    </tr>
  ));

  return (
    <div className="ra-div-table">
      <table className="ra-main-table shadow">
        <thead>
          <tr className="text-left">
            <th className="font-semibold text-sm uppercase px-6 py-4">
              Número
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4">Fecha</th>
            <th className="font-semibold text-sm uppercase px-6 py-4">
              Usuario
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4">
              Teléfono
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4">
              Dirección
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 xl:w-9/12 sm:w-8/12">
          {ingresoList}
        </tbody>
      </table>
    </div>
  );
};

export default IngresosTable;
