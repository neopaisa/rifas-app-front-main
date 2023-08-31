import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { API_URL } from "../../api/api";
import { formatCurrency } from "../../utilities/strings";

function TotalComponent() {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [totales, setTotales] = useState({});
  const url = `${API_URL}contabilidad/totales`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setTotales(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-gray-300 p-3">
      <h1>Resumen de Contabilidad</h1>
      {totales ? (
        <div className="bg-white p-2 w-1/2 rounded shadow">
        <p><strong className="mr-2">Comisiones Totales:</strong>{formatCurrency(totales.comision_totales)}</p>
        <p><strong className="mr-2">Total ingreso bruto:</strong>{formatCurrency(totales.total_ingreso_bruto)}</p>
        <p><strong className="mr-2">Utilidad:</strong>{formatCurrency(totales.utilidad)}</p>
        <p><strong className="mr-2">Total de gastos:</strong>{formatCurrency(totales.totales_gastos)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );  
}

export default TotalComponent;
