import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toUpperCaseString } from "../../utilities/strings";
import { formatCurrency } from "../../utilities/strings";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmFSb290IiwiZXhwIjozMjY1MDkzODkxfQ.nERn4p8tZp0Es6asf-jJpySxz2-LZuRA8-m8p0kUY5k";

function GastosTable() {
  const [url, setUrl] = useState(
    `https://rifa.cybriguard.com/gastos/?rifa_id=1`
  );
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const json = response.data;
        console.log(json);
        setLoading(false);
        setGastos(json); // Actualizar el estado aquí, dentro del bloque try
        console.log("gastos", gastos); // Esto mostrará el valor actualizado de gastos
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.detail);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("gastos actualizado:", gastos);
    console.log(itemList);
  }, [gastos]);

  const itemList = gastos.map((item) => {
    if (!loading) {
      return (
        <tr
          className="hover:bg-gray-200 hover:cursor-pointer ra-fade-animation"
          key={item.id}
        >
          <td
            className="px-6 py-4 ra-number-container bg-gray-100"
            data-label="titulo"
          >
            {item.titulo}
          </td>
          <td className="px-6 py-4 font-bold" data-label="descripcion">
            {toUpperCaseString(item.descripcion)}
          </td>
          <td className="px-6 py-4" data-label="Monto">
            {formatCurrency(item.monto)}
          </td>
          <td className="px-6 py-4 bg-gray-100" data-label="Fecha">
            {item.fecha_gasto}
          </td>
          <td className="px-6 py-4" data-label="Usuario">
            {item.usuario_id}
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="text-white" key={item.numero}>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
        </tr>
      );
    }
  });
  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-center my-3 rounded-lg">
        <button onClick={() => console.log('hhh')} className="bg-green-500 py-2 px-2 hover:bg-green-600 text-white font-bold mx-auto rounded-lg flex items-center justify-center ">Agregar Gasto <AiOutlinePlusCircle className="mx-1"/></button>
      </div>
      <div className="ra-div-table">
        <table className="ra-main-table shadow">
          <thead className="">
            <tr className="text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Titulo
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Descripcion
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                monto
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Fecha
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Usuario
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 xl:w-9/12 sm:w-8/12">
            {itemList}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GastosTable;
