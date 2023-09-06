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
    <div className="bg-gray-300 p-5 flex flex-wrap justify-center">
  {totales ? (
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <h1 className="bg-blue-500 text-white text-center rounded p-2">
        Resumen de contabilidad
      </h1>
      <div className="bg-white rounded p-3 flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 border-solid border-r h-32 text-xl p-1 text-gray-600 flex items-center justify-center flex-col">
          <p>
            <strong className="mr-2">Total ingreso bruto:</strong>
            <p className="text-green-600 font-bold">
              {formatCurrency(totales.total_ingreso_bruto)}
            </p>
          </p>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 border-solid border-r h-32 text-xl p-1 text-gray-600 flex items-center justify-center flex-col">
          <p>
            <strong className="mr-2">Total de gastos:</strong>
            <p className="text-red-600 font-bold">
              {formatCurrency(totales.totales_gastos)}
            </p>
          </p>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 h-32 text-xl p-1 text-gray-600 flex items-center justify-center flex-col">
          <p>
            <strong className="mr-2">Utilidad:</strong>
            <p className="text-blue-500 font-bold">
              {formatCurrency(totales.utilidad)}
            </p>
          </p>
        </div>
      </div>
      <p className="border rounded border-solid ml-0 md:ml-3 text-sm p-2 text-gray-600 text-center bg-gray-200 mt-4">
        <strong className="mr-2">Comisiones Totales:</strong>
        {formatCurrency(totales.comision_totales)}
      </p>
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

  );
}

export default TotalComponent;
