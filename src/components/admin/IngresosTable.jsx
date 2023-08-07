import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const IngresosTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rifa.cybriguard.com/contabilidad/ingresos?rifa_id=1&page=1&page_size=50');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Rifa Ingresos</h1>
      <ul>
        {data.map((ingreso, index) => (
          <li key={index}>
            <strong>Número:</strong> {ingreso.numero}<br />
            <strong>Fecha:</strong> {ingreso.fecha}<br />
            <strong>Fecha Abono:</strong> {ingreso.fecha_abono}<br />
            <strong>Username:</strong> {ingreso.username}<br />
            <strong>Teléfono:</strong> {ingreso.telefono}<br />
            <strong>Dirección:</strong> {ingreso.direccion}<br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngresosTable;
