import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import { formatCurrency } from "../../utilities/strings";
import { API_URL } from "../../api/api";
import { useSelector } from "react-redux/es/hooks/useSelector";
const IngresosTable = () => {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    `${API_URL}contabilidad/ingresos?rifa_id=1&page=1&page_size=50`
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setData(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    setUrl(
      `${API_URL}contabilidad/ingresos?rifa_id=1&page=${page}&page_size=50`
    );
  }, [page]);

  function changePage(value) {
    setPage(value);
  }

  const ingresoList = data.map((ingreso, index) => (
    <tr
      className="hover:bg-gray-200 hover:cursor-pointer ra-fade-animation"
      key={index}
    >
      <td
        className="px-6 py-1 ra-number-container bg-gray-100"
        data-label="Número"
      >
        {ingreso.numero.toString().padStart(4, "0")}
      </td>
      <td className="px-6 py-1  bg-gray-100" data-label="Monto">
        {formatCurrency(ingreso.monto)}
      </td>
      <td className="px-6 py-1 font-bold" data-label="Fecha">
        {ingreso.fecha}
      </td>
      {/*       <td className="px-6 py-1 bg-gray-100" data-label="Teléfono">
        {ingreso.telefono}
      </td>
      <td className="px-6 py-1" data-label="Dirección">
        {ingreso.direccion}
      </td> */}
    </tr>
  ));

  return (
    <div className="flex justify-center flex-col">
      <input
        type="number"
        placeholder="Página"
        min="1"
        max="999"
        onChange={(e) => changePage(e.target.value)}
        className="p-3 m-auto "
        value={page}
      />
      <div className="ra-div-table my-3">
        <table className="ra-main-table shadow">
          <thead>
            <tr className="text-left">
              <th className="font-semibold text-sm uppercase px-6 py-2">
                Número
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-2">
                Monto
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-2">
                Fecha
              </th>
              {/* <th className="font-semibold text-sm uppercase px-6 py-2">
                Teléfono
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-2">
                Dirección
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 xl:w-9/12 sm:w-8/12">
            {ingresoList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngresosTable;
