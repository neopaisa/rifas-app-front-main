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
        //console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-gray-300 p- flex p-5 justify-center">
      
      {totales ? (
        <div className="w-1/2 rounded">
          <h1 className="bg-blue-500 text-white text-center rounded">Resumen de Contabilidad</h1>
        <div className="flex justify-evenly bg-white rounded shadow items-center p-1 mb-2">
        <p className="border-solid border-r w-1/3 h-32 text-xl p-1  text-gray-600 flex items-center justify-center flex-col"><strong className="mr-2">Total ingreso bruto:</strong><p className="text-green-600 font-bold">{formatCurrency(totales.total_ingreso_bruto)}</p></p>
        <p className="border-solid border-r w-1/3 h-32 text-xl p-1  text-gray-600 flex items-center justify-center flex-col"><strong className="mr-2">Total de gastos:</strong><p className="text-red-600 font-bold">{formatCurrency(totales.totales_gastos)}</p></p>
        <p className="border-solid  w-1/3 h-32 text-xl p-1  text-gray-600 flex items-center justify-center flex-col"><strong className="mr-2">Utilidad:</strong><p className="text-blue-500 font-bold">{formatCurrency(totales.utilidad)}</p></p>  
        </div>   
        <p className="border rounded w-1/3 border-solid ml-3 text-sm p-2 text-gray-600 text-center bg-gray-200"><strong className="mr-2">Comisiones Totales:</strong>{formatCurrency(totales.comision_totales)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );  
}

export default TotalComponent;
